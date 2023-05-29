<script setup>
import { useComponentStore } from '@/store/component';

const { fixPrefitList } = useComponentStore();

const showInput = ['name', 'prefit'];

const showSelect = ['status'];

const normalKey = [
	{
		key: 'name',
		width: 150,
	},
	{
		key: 'prefit',
		width: 100,
	},
];

const getEditItem = async () => await fixPrefitList();
</script>

<template>
	<div class="product-list">
		<EditTable
			:router-type="999"
			path="prefit"
			title="Edit Prefit"
			:show-select="showSelect"
			:normal-keys="normalKey"
			:show-input="showInput"
			@row="getEditItem"
		/>
	</div>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/_color.scss';
@import '../../assets/scss/_style.scss';
.product-list {
	padding: 30px;
	position: relative;
}
.el-pagination {
	justify-content: center;
}
</style>
