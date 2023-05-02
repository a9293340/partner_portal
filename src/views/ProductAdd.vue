<script setup>
import { onBeforeMount, ref } from 'vue';
import { useParameterStore } from '@/store/parameter';
import { useComponentStore } from '@/store/component';
import { storeToRefs } from 'pinia';
const { loginAdmin } = storeToRefs(useParameterStore());
import { encode, sessionGet } from '@/utils';
import AddTemplate from '../components/AddTemplate.vue';

const { fixLoading } = useComponentStore();

const { productTypeList, prefitList } = storeToRefs(useComponentStore());

const empty = {
	name: '',
	production_type_id: '',
	photo: '',
	slogan: '',
	documents_id: [],
	firmware_id: [],
	prefit: [0],
};
const showInput = ['name', 'slogan'];
const showSelect = ['production_type_id'];
const showMultiSelct = ['prefit'];
const showSpecial = 'photo';
const selectItems = ref({
	production_type_id: productTypeList.value,
	prefit: prefitList.value,
});
const inputData = ref(empty);

const getUsefulData = (data) => {
	console.log(data);
};

onBeforeMount(async () => {
	selectItems.value.production_type_id = productTypeList.value;
	selectItems.value.prefit = prefitList.value;
});
</script>
<template>
	<div class="product-add">
		<AddTemplate
			:input-data="inputData"
			:show-input="showInput"
			:show-select="showSelect"
			:select-items="selectItems"
			:show-multi-selct="showMultiSelct"
			:show-special="showSpecial"
			@data="getUsefulData"
		/>
	</div>
</template>

<style lang="scss">
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
.product-add {
	padding: 30px;
	position: relative;
	box-sizing: border-box;
	height: 100%;
}
</style>
