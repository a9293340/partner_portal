<script setup>
import { ref, onBeforeMount } from 'vue';
import { useComponentStore } from '@/store/component';
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import { encode, decode, sessionGet } from '@/utils';

const comStore = useComponentStore();
const login = useParameterStore();
const adList = ref();
const totalData = ref();
const nowPage = ref();
const { isOpenEditPop, prefitList, typeList, page_limit } =
	storeToRefs(comStore);
const { loginAdmin, adminRules } = storeToRefs(login);
const { fixOpenEditPop, makeKeys } = comStore;
const { loginAction, resetAdminList } = login;

const editTarget = ref({});
const editKeys = ref([]);
const selectOption = ['permissions', 'status'];
const notNeed = [
	'token',
	'last_login_time',
	'account',
	'action_log',
	'create_date',
];
const nowEditIndex = ref(null);

const editAdmin = (row, idx) => {
	editTarget.value = row;
	nowEditIndex.value = idx;
	editKeys.value = makeKeys(row, notNeed, selectOption, {
		permissions: prefitList.value,
		status: typeList.value,
	});
	// console.log(editKeys.value);
	fixOpenEditPop(true);
};

const getEditData = async (data) => {
	// console.log(data);
	try {
		await axios.post('/api/admin/edit', {
			data: encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				...data,
			}),
		});
		await getDataByPage(nowPage.value);
		if (data.account === loginAdmin.value.account) loginAction(data);
	} catch (error) {
		console.log(error);
	}
	fixOpenEditPop(false);
};

const pageChange = async (page) => {
	console.log(page);
	await getDataByPage(page - 1);
};

const getDataByPage = async (page) => {
	nowPage.value = page;
	// console.log(page_limit.value);
	const res = decode(
		(
			await axios.post('/api/admin/list', {
				data: encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: page_limit.value,
					page,
					filter: {},
				}),
			})
		).data.data
	);
	// console.log(res.total);
	totalData.value = res.total;
	adList.value = res.list;
};

onBeforeMount(async () => {
	// console.log(prefitList.value);
	try {
		await getDataByPage(0);
	} catch (error) {
		adList.value = [];
	}
});
</script>

<template>
	<div class="user-list">
		<el-table :data="adList" style="width: auto">
			<el-table-column prop="name" label="Name" width="150" />
			<el-table-column prop="company" label="company" width="150" />
			<el-table-column prop="email" label="Email" width="210" />
			<el-table-column prop="account" label="Account" width="150" />
			<el-table-column label="Permissions" width="170">
				<template #default="scope">
					<span>{{
						prefitList.find(
							(el) => el.val === scope.row.permissions
						).opt
					}}</span>
				</template>
			</el-table-column>
			<el-table-column label="Status" width="90">
				<template #default="scope">
					<span>{{
						typeList.find((el) => el.val === scope.row.status).opt
					}}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="last_login_time"
				label="Last Login Time"
				width="180"
			/>
			<el-table-column align="right">
				<template #default="scope">
					<el-button
						link
						type="primary"
						@click.prevent="editAdmin(scope.row, scope.$index)"
						>edit</el-button
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
			:rules="adminRules"
			:keys="editKeys"
			:foo="JSON.stringify(editTarget)"
			@data="getEditData"
		/>
	</div>
</template>

<style lang="scss">
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
.user-list {
	padding: 30px;
	position: relative;
}
.el-pagination {
	justify-content: center;
}
</style>
