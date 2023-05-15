<script setup>
import { ref, onBeforeMount } from 'vue';
import { useComponentStore } from '@/store/component';
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import { encode, sessionGet, popMsg } from '@/utils';
import { postEdit } from '@/utils/api';

const adList = ref();
const totalData = ref();
const nowPage = ref();
const { isOpenEditPop, prefitList, statusList, page_limit } = storeToRefs(
	useComponentStore()
);
const { loginAdmin } = storeToRefs(useParameterStore());
const { fixOpenEditPop, fixLoading, getDataByPage, getCreatorList } =
	useComponentStore();
const { loginAction, fixError } = useParameterStore();

const editTarget = ref({});

const showInput = ['name', 'company', 'account', 'password', 'email'];
const showSelect = ['permissions', 'status'];
const selectItems = ref({
	permissions: prefitList.value,
	status: statusList.value,
});

const editAdmin = (row) => {
	editTarget.value = row;
	fixOpenEditPop(true);
};

const getEditData = async (data) => {
	fixLoading(true);
	try {
		await postEdit(
			'admin',
			encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				...data,
			})
		);
		adList.value = (
			await getDataByPage(nowPage.value, 'admin', false)
		).list;
		await getCreatorList();
		if (data.account === loginAdmin.value.account) loginAction(data);
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

const pageChange = async (page) => {
	console.log(page);
	await getDataByPage(page - 1);
};

onBeforeMount(async () => {
	try {
		// await getDataByPage(0);
		const res = await getDataByPage(0, 'admin');
		// console.log(res);
		nowPage.value = 0;
		totalData.value = res.total;
		adList.value = res.list;
	} catch (error) {
		adList.value = [];
	}
});
</script>

<template>
	<div class="user-list">
		<el-table :data="adList" style="width: 1080px">
			<el-table-column prop="name" label="Name" width="150" />
			<el-table-column prop="company" label="company" width="150" />
			<el-table-column prop="email" label="Email" width="210" />
			<el-table-column prop="account" label="Account" width="150" />
			<el-table-column
				label="Permissions"
				prop="permissions"
				width="170"
				sortable
			>
				<template #default="scope">
					<span>{{
						prefitList.find(
							(el) => el.val === scope.row.permissions
						).opt
					}}</span>
				</template>
			</el-table-column>
			<el-table-column label="Status" prop="status" width="100" sortable>
				<template #default="scope">
					<span>{{
						statusList.find((el) => el.val === scope.row.status).opt
					}}</span>
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template #default="scope">
					<el-button
						link
						type="primary"
						@click.prevent="editAdmin(scope.row)"
						>Edit</el-button
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
			:title="'Edit Admin'"
			:input-data="editTarget"
			:show-input="showInput"
			:show-select="showSelect"
			:select-items="selectItems"
			@data="getEditData"
			@abort="fixOpenEditPop(false)"
		/>
	</div>
</template>

<style lang="scss">
@import '../../assets/scss/_color.scss';
@import '../../assets/scss/_style.scss';
.user-list {
	padding: 30px;
	position: relative;
}
.el-pagination {
	justify-content: center;
}
</style>
