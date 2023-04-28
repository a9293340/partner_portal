<script setup>
import { onBeforeMount, ref } from 'vue';
import { useParameterStore } from '@/store/parameter';
import { useComponentStore } from '@/store/component';
import { storeToRefs } from 'pinia';
const { loginAdmin } = storeToRefs(useParameterStore());
import { encode, sessionGet } from '@/utils';
import AddTemplate from '../components/AddTemplate.vue';

const empty = {
	name: '',
	production_type_id: '',
	photo: '',
	slogan: '',
	documents_id: [],
	firmware_id: [],
	prefit: [],
};
const showInput = ['name', 'slogan'];
const showSelect = ['production_type_id'];
const showMultiSelct = ['firmware_id', 'documents_id', 'prefit'];
const showSpecial = ['photo'];
const inputData = ref(empty);

onBeforeMount(() => {});
</script>
<template>
	<div class="product-add">
		<AddTemplate :input-data="inputData" :show-input="showInput" />
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
