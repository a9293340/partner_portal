<script setup>
import { ref, onMounted } from 'vue';
import { useComponentStore } from '@/store/component';
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import { encode, sessionGet, comfirmBox, popMsg } from '@/utils';
import { postEdit, postDelete } from '@/utils/api';

const adList = ref();
const totalData = ref();
const nowPage = ref();
const {
	isOpenEditPop,
	productTypeList,
	prefitList,
	documentList,
	firmwareList,
	page_limit,
} = storeToRefs(useComponentStore());
const { loginAdmin } = storeToRefs(useParameterStore());
const { fixOpenEditPop, fixLoading, getDataByPage, getProductList } =
	useComponentStore();
const { fixError } = useParameterStore();

const editTarget = ref({});

const showInput = ['name', 'slogan'];
const showSelect = ['production_type_id'];
const showMultiSelct = ['prefit', 'documents_id', 'firmware_id'];
const showSpecial = 'photo';
const selectItems = ref({
	production_type_id: productTypeList.value,
	prefit: prefitList.value,
	documents_id: documentList.value,
	firmware_id: firmwareList.value,
});

const getEditData = async (data) => {
	fixLoading(true);
	try {
		await postEdit(
			'product',
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
	adList.value = (await getDataByPage(nowPage.value, 'product', false)).list;
	await getProductList();
};

const removeAdmin = async (row) => {
	try {
		await comfirmBox();
		fixLoading(true);
		try {
			await postDelete(
				'product',
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
		const res = await getDataByPage(0, 'product');
		nowPage.value = 0;
		totalData.value = res.total;
		adList.value = res.list;
	} catch (error) {
		adList.value = [];
	}
});
</script>

<template>
	<div class="product-list">
		<el-table :data="adList" style="width: 900px">
			<el-table-column
				align="center"
				prop="photo"
				label="photo"
				width="180"
			>
				<template #default="scope">
					<img :src="scope.row.photo" alt="" />
				</template>
			</el-table-column>
			<el-table-column prop="name" label="name" width="150" />
			<el-table-column prop="slogan" label="slogan" width="400" />
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
			:show-special="showSpecial"
			@data="getEditData"
			@abort="fixOpenEditPop(false)"
		/>
	</div>
</template>

<style lang="scss">
@import '../../assets/scss/_color.scss';
@import '../../assets/scss/_style.scss';
.product-list {
	padding: 30px;
	position: relative;
}
.el-pagination {
	justify-content: center;
}
</style>
