<script setup>
import { ref } from 'vue';
import { useComponentStore } from '@/store/component';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { depCopy } from '@/utils';
import AddTemplate from '@/components/AddTemplate.vue';

const { fixDocumentList, addItem } = useComponentStore();

const { documentTypeList, prefitList, creatorList } = storeToRefs(
	useComponentStore()
);

const router = useRouter();

const empty = {
	name: '',
	document_type_id: '',
	version: [],
	prefit: [0],
};

const showInput = ['name'];
const showSelect = ['document_type_id'];
const showVersion = ['version'];
const showMultiSelct = ['prefit'];
const selectItems = ref({
	document_type_id: documentTypeList.value,
	prefit: prefitList.value,
	creator: creatorList.value,
});
const inputData = ref(depCopy(empty));

const getUsefulData = async (data) => {
	await addItem(data, 'document', async () => {
		await fixDocumentList();
		inputData.value = empty;
		router.push('/documentList');
	});
};
</script>

<template>
	<div class="product-add">
		<AddTemplate
			:input-data="inputData"
			:show-input="showInput"
			:show-select="showSelect"
			:select-items="selectItems"
			:show-multi-selct="showMultiSelct"
			:show-version="showVersion"
			@data="getUsefulData"
		/>
	</div>
</template>

<style lang="scss">
@import '../../assets/scss/_color.scss';
@import '../../assets/scss/_style.scss';
.product-add {
	padding: 30px;
	position: relative;
	box-sizing: border-box;
	height: 100%;
}
</style>
