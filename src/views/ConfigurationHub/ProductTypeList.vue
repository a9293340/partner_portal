<script setup>
import { useComponentStore } from '@/store/component';
import EditTable from '../../components/EditTable.vue';

const { fixProductTypeList } = useComponentStore();

const showInput = ['name'];
const showSpecial = 'photo';
const showSelect = ['status'];

const normalKey = [
	{
		key: 'name',
		width: 300,
	},
];

const hasImage = [
	{
		key: 'photo',
		width: 120,
	},
];

const getEditItem = async () => await fixProductTypeList();
</script>

<template>
	<div class="product-list">
		<EditTable
			:router-type="999"
			path="productionType"
			title="Edit Product Type"
			:show-select="showSelect"
			:has-image="hasImage"
			:normal-keys="normalKey"
			:show-input="showInput"
			:show-special="showSpecial"
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
