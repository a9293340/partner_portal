<script setup>
import { ref, onMounted, version } from 'vue';
import { useComponentStore } from '@/store/component';
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import { encode, sessionGet, comfirmBox, popMsg } from '@/utils';
import { postEdit, postDelete } from '@/utils/api';
import * as dayjs from 'dayjs';

const adList = ref();
const totalData = ref();
const nowPage = ref();
const { isOpenEditPop, documentTypeList, prefitList, creatorList, page_limit } =
	storeToRefs(useComponentStore());
const { loginAdmin } = storeToRefs(useParameterStore());
const { fixOpenEditPop, fixLoading, getDataByPage, fixDocumentList } =
	useComponentStore();
const { fixError } = useParameterStore();

const editTarget = ref({});

const showInput = ['name'];
const showSelect = ['document_type_id'];
const showVersion = ['version'];
const showMultiSelct = ['prefit'];
const selectItems = ref({
	document_type_id: documentTypeList.value,
	prefit: prefitList.value,
	creator: creatorList.value,
});

const getEditData = async (data) => {
	fixLoading(true);
	try {
		await postEdit(
			'document',
			encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				...data,
			})
		);
		await reloadData();
		await popMsg('Edit completed');
	} catch (error) {
		// console.log(error);
		if (error.response)
			fixError({
				title: 'Error',
				msg: error.response.data.error_code,
				isShow: true,
			});
	}
	fixLoading(false);
	fixOpenEditPop(false);
};

const editAdmin = (row) => {
	editTarget.value = row;
	fixOpenEditPop(true);
};

const reloadData = async () => {
	adList.value = (await getDataByPage(nowPage.value, 'document', false)).list;
	await fixDocumentList();
};

const removeAdmin = async (row) => {
	try {
		await comfirmBox();
		fixLoading(true);
		try {
			await postDelete(
				'document',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					_id: row._id,
				})
			);
			await reloadData();
			await popMsg('Delete completed');
		} catch (error) {
			// console.log(error);
			if (error.response)
				fixError({
					title: 'Error',
					msg: error.response.data.error_code,
					isShow: true,
				});
		}
		fixLoading(false);
	} catch (error) {}
};

const pageChange = async (page) => await getDataByPage(page - 1);

onMounted(async () => {
	try {
		const res = await getDataByPage(0, 'document');
		nowPage.value = 0;
		totalData.value = res.total;
		adList.value = res.list;
	} catch (error) {
		adList.value = [];
	}
});
</script>

<template>
	<div class="document-list">
		<el-table :data="adList" style="width: 1080px">
			<el-table-column prop="name" label="name" width="450" />
			<el-table-column
				prop="version"
				label="Version(version/creator/date)"
				width="400"
			>
				<template class="flex flex-row" #default="scope">
					<div class="flex" v-for="ver in scope.row.version">
						<span>{{ ver.version }}/</span>
						<span class="mr-3">{{
							creatorList.find((x) => x.val === ver.creator).opt
						}}</span>
						<span class="mr-3">
							({{ dayjs(ver.create_date).format('YYYY-MM-DD') }})
						</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column>
				<template #default="scope">
					<el-button
						link
						type="primary"
						@click.prevent="editAdmin(scope.row)"
						>Edit</el-button
					>
				</template>
			</el-table-column>
			<el-table-column>
				<template #default="scope">
					<el-button
						link
						type="primary"
						@click.prevent="removeAdmin(scope.row)"
						>Remove</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="totalData"
			:page-count="Math.ceil(totalData / page_limit)"
			:page-size="page_limit"
			@current-change="pageChange"
		/>
		<Edit
			v-if="isOpenEditPop"
			:title="'Edit Product'"
			:input-data="editTarget"
			:show-input="showInput"
			:show-select="showSelect"
			:select-items="selectItems"
			:show-multi-selct="showMultiSelct"
			:show-version="showVersion"
			@data="getEditData"
			@abort="fixOpenEditPop(false)"
		/>
	</div>
</template>

<style lang="scss">
@import '../../assets/scss/_color.scss';
@import '../../assets/scss/_style.scss';
.document-list {
	padding: 30px;
	position: relative;
}
.el-pagination {
	justify-content: center;
}
</style>
