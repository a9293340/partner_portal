<script setup>
import { useComponentStore } from '@/store/component';
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import EditTable from '../../components/EditTable.vue';

const { loginAdmin } = storeToRefs(useParameterStore());
const { getCreatorList } = useComponentStore();
const { loginAction } = useParameterStore();

const showInput = ['name', 'company', 'account', 'password', 'email'];
const showSelect = ['permissions', 'status'];

const normalKey = [
	{
		key: 'name',
		width: 150,
	},
	{
		key: 'company',
		width: 150,
	},
	{
		key: 'email',
		width: 210,
	},
	{
		key: 'account',
		width: 150,
	},
];

const getEditItem = async (data) => {
	await getCreatorList();
	if (data.account === loginAdmin.value.account) loginAction(data);
};
</script>

<template>
	<div class="user-list">
		<EditTable
			:router-type="0"
			path="admin"
			title="Edit Admin"
			:normal-keys="normalKey"
			:has-remove="false"
			:show-input="showInput"
			:show-select="showSelect"
			@row="getEditItem"
		/>
	</div>
</template>

<style lang="scss" scoped>
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
