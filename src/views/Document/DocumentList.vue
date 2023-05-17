<script setup>
import { ref, onMounted } from 'vue';
import { useComponentStore } from '@/store/component';
import { storeToRefs } from 'pinia';
import EditTable from '../../components/EditTable.vue';

const adList = ref();
const totalData = ref(0);
const nowPage = ref();
const { isOpenEditPop, documentTypeList, prefitList, creatorList } =
	storeToRefs(useComponentStore());
const {
	fixOpenEditPop,
	getDataByPage,
	fixDocumentList,
	getEditData,
	removeItem,
} = useComponentStore();

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

const normalKey = [
	{
		key: 'name',
		width: 450,
	},
];

const specialList = [
	{
		key: 'document_type_id',
		width: 200,
		list: documentTypeList.value,
	},
];

const getEditItem = async (data) =>
	await getEditData(data, 'document', reloadData);

const editAdmin = (row) => {
	editTarget.value = row;
	fixOpenEditPop(true);
};

const reloadData = async () => {
	adList.value = (await getDataByPage(nowPage.value, 'document', false)).list;
	await fixDocumentList();
};

const removeAdmin = async (row) =>
	await removeItem(row, 'document', reloadData);

const pageChange = async (page) =>
	(adList.value = (await getDataByPage(page - 1, 'document')).list);

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
		<EditTable
			:normal-keys="normalKey"
			:has-version="true"
			:target-list="adList"
			:total-data="totalData"
			:special-list="specialList"
			@data="removeAdmin"
			@page="pageChange"
			@row="editAdmin"
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
			@data="getEditItem"
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
