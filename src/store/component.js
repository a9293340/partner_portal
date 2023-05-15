import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { sessionGet, encode } from '@/utils';
import { useParameterStore } from './parameter';
import { postList } from '../utils/api';

export const useComponentStore = defineStore('component', () => {
	const { loginAdmin } = storeToRefs(useParameterStore());
	const { fixError, productAction } = useParameterStore();

	const isOpenEditPop = ref(false);
	const isShadow = ref(false);
	const isLoading = ref(false);
	const isZShadow = ref(false);

	const page_limit = ref(20);

	const prefitList = ref([
		{ val: 0, opt: 'Super admin' },
		{ val: 1, opt: 'Support' },
		{ val: 2, opt: 'Partner(CINO)' },
		{ val: 3, opt: 'Partner(SICK)' },
	]);
	const statusList = ref([
		{ val: 0, opt: 'On' },
		{ val: 1, opt: 'Off' },
	]);
	const documentList = ref([]);

	const firmwareList = ref([]);

	const documentTypeList = ref([]);

	const productTypeList = ref([]);

	const creatorList = ref([]);

	const fixDocumentTypeList = async () => {
		try {
			const documentType = encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				limit: 100,
				page: 0,
				filter: {},
			});
			documentTypeList.value = (
				await postList('documentType', documentType)
			).list.map((el) => ({
				val: el._id,
				opt: el.name,
			}));
		} catch (error) {}
	};

	const fixFirmwareList = async () => {
		try {
			const firmware = encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				limit: 100,
				page: 0,
				filter: {},
			});
			firmwareList.value = (
				await postList('firmware', firmware)
			).list.map((el) => ({
				val: el._id,
				opt: el.name,
			}));
			// console.log(firmwareList.value);
		} catch (error) {}
	};

	const getDataByPage = async (page, route, jud = true) => {
		if (jud) fixLoading(true);
		let res = {
			total: 0,
			list: [],
		};
		try {
			res = await postList(
				route,
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: page_limit.value,
					page,
					filter: {},
				})
			);
		} catch (error) {
			if (error.response)
				fixError({
					title: 'Error',
					msg: error.response.data.error_code,
					isShow: true,
				});
		}
		if (jud) fixLoading(false);

		return res;
	};
	const fixDocumentList = async () => {
		try {
			const document = await postList(
				'document',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: 100,
					page: 0,
					filter: {},
				})
			);
			documentList.value = document.list.map((el) => ({
				val: el._id,
				opt: el.name,
			}));
			// console.log(documentList.value);
		} catch (error) {}
	};
	const fixPrefitList = async () => {
		try {
			const prefit = await postList(
				'prefit',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: 100,
					page: 0,
					filter: {},
				})
			);
			prefitList.value = prefit.list.map((el) => ({
				val: el.prefit,
				opt: el.name,
			}));
		} catch (error) {}
	};
	const fixProductTypeList = async () => {
		try {
			const productType = await postList(
				'productionType',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: 100,
					page: 0,
					filter: {},
				})
			);
			productTypeList.value = productType.list.map((el) => ({
				val: el._id,
				opt: el.name,
				photo: el.photo,
				_id: el._id,
			}));
		} catch (error) {
			console.log(error);
		}
	};
	const getProductList = async () => {
		try {
			const product = await postList(
				'product',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: 1000,
					page: 0,
					filter: {},
				})
			);
			productAction(product.list);
		} catch (error) {
			console.log(error);
		}
	};

	const getCreatorList = async () => {
		try {
			const creator = await postList(
				'admin',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: 1000,
					page: 0,
					filter: {
						permissions: [0, 1],
					},
				})
			);
			creatorList.value = creator.list.map((el) => ({
				val: el._id,
				opt: el.name,
			}));
			// console.log(creatorList.value);
		} catch (error) {
			console.log(error);
		}
	};

	const getSelectOptions = async (type) => {
		// console.log(type);
		if (type <= 1) {
			await fixPrefitList();
			await fixDocumentList();
			await fixFirmwareList();
		}
		await getCreatorList();
		await fixDocumentTypeList();
		await fixProductTypeList();
		await getProductList();
	};

	const fixOpenEditPop = (bool) => {
		isOpenEditPop.value = bool;
		isShadow.value = bool;
	};

	const fixLoading = (bool) => {
		isShadow.value = bool;
		isLoading.value = bool;
		isZShadow.value = bool;
	};

	return {
		isOpenEditPop,
		fixOpenEditPop,
		isShadow,
		prefitList,
		statusList,
		fixPrefitList,
		page_limit,
		fixLoading,
		isLoading,
		isZShadow,
		fixProductTypeList,
		productTypeList,
		documentList,
		fixDocumentList,
		firmwareList,
		fixFirmwareList,
		getSelectOptions,
		getDataByPage,
		getProductList,
		fixDocumentTypeList,
		documentTypeList,
		creatorList,
		getCreatorList,
	};
});
