<script setup>
import { ref } from 'vue';
import { useParameterStore } from '@/store/parameter';
import { useComponentStore } from '@/store/component';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const { loginAdmin } = storeToRefs(useParameterStore());
import { encode, sessionGet, depCopy } from '@/utils';
import { postAdd } from '@/utils/api';
import AddTemplate from '@/components/AddTemplate.vue';

const { fixLoading, fixDocumentList } = useComponentStore();
const { fixError } = useParameterStore();

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
	fixLoading(true);
	try {
		await postAdd(
			'document',
			encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				...data,
			})
		);
		await fixDocumentList();
		inputData.value = empty;
		router.push('/documentList');
	} catch (error) {
		// console.log(error);
		if (error.response)
			fixError({
				title: 'Error',
				msg: error.response.data.error_code,
				isShow: true,
			});
	}
	// router.push('/userList');
	fixLoading(false);
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
</style>
