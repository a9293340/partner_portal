<script setup>
import { ref, onBeforeMount } from 'vue';
import { useComponentStore } from '@/store/component';
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import EditTable from '../../components/EditTable.vue';

const adList = ref();
const totalData = ref();
const nowPage = ref();
const { isOpenEditPop, prefitList, statusList } = storeToRefs(
	useComponentStore()
);
const { loginAdmin } = storeToRefs(useParameterStore());
const { fixOpenEditPop, getDataByPage, getCreatorList, getEditData } =
	useComponentStore();
const { loginAction } = useParameterStore();

const editTarget = ref({});

const showInput = ['name', 'company', 'account', 'password', 'email'];
const showSelect = ['permissions', 'status'];
const selectItems = ref({
	permissions: prefitList.value,
	status: statusList.value,
});

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

const specailList = [
	{
		key: 'permissions',
		width: 170,
		list: prefitList.value,
	},
	{
		key: 'status',
		width: 100,
		list: statusList.value,
	},
];

const editAdmin = (row) => {
	editTarget.value = row;
	fixOpenEditPop(true);
};

const getEditItem = async (data) => {
	await getEditData(data, 'admin', async () => {
		adList.value = (
			await getDataByPage(nowPage.value, 'admin', false)
		).list;
		await getCreatorList();
		if (data.account === loginAdmin.value.account) loginAction(data);
	});
};

const pageChange = async (page) =>
	(adList.value = (await getDataByPage(page - 1, 'admin')).list);

onBeforeMount(async () => {
	try {
		const res = await getDataByPage(0, 'admin');
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
		<EditTable
			:normal-keys="normalKey"
			:has-remove="false"
			:target-list="adList"
			:total-data="totalData"
			:special-list="specailList"
			@page="pageChange"
			@row="editAdmin"
		/>
		<Edit
			v-if="isOpenEditPop"
			:title="'Edit Admin'"
			:input-data="editTarget"
			:show-input="showInput"
			:show-select="showSelect"
			:select-items="selectItems"
			@data="getEditItem"
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
