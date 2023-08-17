<script setup>
import { useComponentStore } from '@/store/component';
import EditTable from '../../components/EditTable.vue';

const { fixDocumentList } = useComponentStore();

const showInput = ['name', 'download_path'];
const showMultiInput = ['remark'];
const showSelect = ['document_type_id', 'status'];
const showVersion = ['version'];
const showMultiSelct = ['prefit'];

const normalKey = [
	{
		key: 'name',
		width: 450,
	},
	{
		key: 'download_path',
		width: 150,
	},
];

const getEditItem = async () => await fixDocumentList();
</script>

<template>
	<div class="document-list">
		<EditTable
			:router-type="1"
			path="document"
			title="Edit Document"
			:normal-keys="normalKey"
			:has-version="true"
			:show-input="showInput"
			:show-select="showSelect"
			:show-multi-input="showMultiInput"
			:show-multi-selct="showMultiSelct"
			:show-version="showVersion"
			@row="getEditItem"
		/>
	</div>
</template>

<style lang="scss" scoped>
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
