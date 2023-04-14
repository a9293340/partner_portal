<script setup>
import adminList from '@/assets/db/admin.json';
import { ref } from 'vue';
import { useComponentStore } from '@/store/component';
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import fs from 'vite-plugin-fs/browser';

const comStore = useComponentStore();
const login = useParameterStore();
const adList = ref(JSON.parse(JSON.stringify(adminList)));
const { isOpenEditPop, prefitList, typeList } = storeToRefs(comStore);
const { loginAdmin, adminRules } = storeToRefs(login);
const { fixOpenEditPop, makeKeys } = comStore;
const { loginAction } = login;

const editTarget = ref({});
const editKeys = ref([]);
const selectOption = ['permissions', 'status'];
const notNeed = ['token', 'last_login_time', 'account'];
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

const getEdmitData = async (data) => {
	adList.value[nowEditIndex.value] = data;
	if (data.account === loginAdmin.value.account) loginAction(data);
	await editDataBase();
};

const editDataBase = async () => {
	await fs.writeFile('./assets/db/admin.json', JSON.stringify(adList.value));
};
</script>

<template>
	<div class="user-list">
		<el-table :data="adList" style="width: auto">
			<el-table-column prop="name" label="Name" width="150" />
			<el-table-column prop="company" label="company" width="150" />
			<el-table-column prop="email" label="Email" width="180" />
			<el-table-column prop="account" label="Account" width="150" />
			<el-table-column label="Permissions" width="150">
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
				width="200"
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
		<Edit
			v-if="isOpenEditPop"
			:title="'Edit Admin'"
			:rules="adminRules"
			:keys="editKeys"
			:foo="JSON.stringify(editTarget)"
			@data="getEdmitData"
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
</style>
