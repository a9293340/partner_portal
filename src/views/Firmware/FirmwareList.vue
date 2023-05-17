<script setup>
import { ref, onMounted } from 'vue';
import { useComponentStore } from '@/store/component';
import { storeToRefs } from 'pinia';
import EditTable from '../../components/EditTable.vue';

const adList = ref();
const totalData = ref();
const nowPage = ref();
const { isOpenEditPop, prefitList, creatorList } = storeToRefs(
	useComponentStore()
);
const {
	fixOpenEditPop,
	getDataByPage,
	fixFirmwareList,
	getEditData,
	removeItem,
} = useComponentStore();

const editTarget = ref({});

const showInput = ['name'];
const showVersion = ['version'];
const showMultiSelct = ['prefit'];
const selectItems = ref({
	prefit: prefitList.value,
	creator: creatorList.value,
});

const normalKey = [
	{
		key: 'name',
		width: 450,
	},
];

const getEditItem = async (data) =>
	await getEditData(data, 'firmware', reloadData);

const editAdmin = (row) => {
	editTarget.value = row;
	fixOpenEditPop(true);
};

const reloadData = async () => {
	adList.value = (await getDataByPage(nowPage.value, 'firmware', false)).list;
	await fixFirmwareList();
};

const removeAdmin = async (row) =>
	await removeItem(row, 'firmware', reloadData);

const pageChange = async (page) =>
	(adList.value = (await getDataByPage(page - 1, 'document')).list);

onMounted(async () => {
	try {
		const res = await getDataByPage(0, 'firmware');
		nowPage.value = 0;
		totalData.value = res.total;
		adList.value = res.list;
	} catch (error) {
		adList.value = [];
	}
});
</script>

<template>
	<div class="firmware-list">
		<EditTable
			:normal-keys="normalKey"
			:has-version="true"
			:target-list="adList"
			:total-data="totalData"
			@data="removeAdmin"
			@page="pageChange"
			@row="editAdmin"
		/>
		<Edit
			v-if="isOpenEditPop"
			:title="'Edit Product'"
			:input-data="editTarget"
			:show-input="showInput"
			:select-items="selectItems"
			:show-multi-selct="showMultiSelct"
			:show-version="showVersion"
			@data="getEditItem"
			@abort="fixOpenEditPop(false)"
		/>
	</div>
</template>

<style lang="scss">
@import '../../assets/scss/_color.scss';
@import '../../assets/scss/_style.scss';
.firmware-list {
	padding: 30px;
	position: relative;
}
.el-pagination {
	justify-content: center;
}
</style>
