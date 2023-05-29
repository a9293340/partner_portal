<script setup>
import { useComponentStore } from '@/store/component';

const { fixDocumentTypeList } = useComponentStore();

const showInput = ['name'];
const showSelect = ['status'];

const normalKey = [
	{
		key: 'name',
		width: 450,
	},
];

const getEditItem = async () => await fixDocumentTypeList();
</script>

<template>
	<div class="document-list">
		<EditTable
			:router-type="999"
			path="documentType"
			title="Edit Document Type"
			:show-select="showSelect"
			:normal-keys="normalKey"
			:show-input="showInput"
			@row="getEditItem"
		/>
	</div>
</template>

<style lang="scss" scoped>
.document-list {
	padding: 30px;
	position: relative;
}
</style>
