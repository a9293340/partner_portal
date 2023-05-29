<script setup>
import { useComponentStore } from '@/store/component';
import EditTable from '../../components/EditTable.vue';

const { getProductList } = useComponentStore();

const showInput = ['name', 'slogan'];
const showSelect = ['production_type_id', 'status'];
const showMultiSelct = ['prefit', 'documents_id', 'firmware_id'];
const showSpecial = 'photo';

const normalKey = [
	{
		key: 'name',
		width: 150,
	},
	{
		key: 'slogan',
		width: 400,
	},
];

const hasImage = [
	{
		key: 'photo',
		width: 180,
	},
];

const getEditItem = async () => await getProductList();
</script>

<template>
	<div class="product-list">
		<EditTable
			:router-type="3"
			path="product"
			title="Edit Product"
			:normal-keys="normalKey"
			:has-image="hasImage"
			:show-input="showInput"
			:show-select="showSelect"
			:show-multi-selct="showMultiSelct"
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
