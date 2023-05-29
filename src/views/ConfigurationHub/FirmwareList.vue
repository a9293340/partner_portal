<script setup>
import { useComponentStore } from '@/store/component';
import EditTable from '@/components/EditTable.vue';

const { fixFirmwareList } = useComponentStore();

const showInput = ['name'];
const showVersion = ['version'];
const showMultiSelct = ['prefit'];
const showSelect = ['status'];

const normalKey = [
	{
		key: 'name',
		width: 450,
	},
];

const getEditItem = async () => await fixFirmwareList();
</script>

<template>
	<div class="firmware-list">
		<EditTable
			:router-type="2"
			path="firmware"
			title="Edit Firmware"
			:normal-keys="normalKey"
			:has-version="true"
			:show-select="showSelect"
			:show-input="showInput"
			:show-multi-selct="showMultiSelct"
			:show-version="showVersion"
			@row="getEditItem"
		/>
	</div>
</template>

<style lang="scss" scoped>
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
