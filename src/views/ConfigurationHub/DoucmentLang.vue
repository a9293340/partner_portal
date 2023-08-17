<script setup>
import { useComponentStore } from '@/store/component';

const { getLangList } = useComponentStore();

const showInput = ['name', 'code'];

const normalKey = [
	{
		key: 'name',
		width: 300,
	},
	{
		key: 'code',
		width: 120,
	},
];

const getEditItem = async () => await getLangList();
</script>

<template>
	<div class="document-list">
		<EditTable
			:router-type="1000"
			path="resourcesLang"
			title="Edit Document Language"
			:normal-keys="normalKey"
			:show-input="showInput"
			@row="getEditItem"
		/>
	</div>
</template>

<style lang="scss" scoped></style>
