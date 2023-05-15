<script setup>
import { onBeforeMount, ref } from 'vue';
import { useParameterStore } from '@/store/parameter';
import { useComponentStore } from '@/store/component';
import { storeToRefs } from 'pinia';
const { loginAdmin } = storeToRefs(useParameterStore());
import { useRouter } from 'vue-router';
import { encode, sessionGet, depCopy } from '@/utils';
import { postAdd } from '@/utils/api';
import AddTemplate from '@/components/AddTemplate.vue';

const { fixLoading, getProductList } = useComponentStore();
const { fixError } = useParameterStore();

const { productTypeList, prefitList, documentList, firmwareList } = storeToRefs(
	useComponentStore()
);

const router = useRouter();

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
const showMultiSelct = ['prefit', 'documents_id', 'firmware_id'];
const showSpecial = 'photo';
const selectItems = ref({
	production_type_id: productTypeList.value,
	prefit: prefitList.value,
	documents_id: documentList.value,
	firmware_id: firmwareList.value,
});
const inputData = ref(depCopy(empty));

const getUsefulData = async (data) => {
	fixLoading(true);
	// console.log(data);
	try {
		await postAdd(
			'product',
			encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				...data,
			})
		);
		await getProductList();
		inputData.value = empty;
		router.push('/productList');
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
@import '../../assets/scss/_color.scss';
@import '../../assets/scss/_style.scss';
.product-add {
	padding: 30px;
	position: relative;
	box-sizing: border-box;
	height: 100%;
}
</style>
