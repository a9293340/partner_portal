import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { sessionGet, encode, changeItem, comfirmBox } from '@/utils';
import { useParameterStore } from './parameter';
import { postList, postAdd } from '../utils/api';

export const useComponentStore = defineStore('component', () => {
	const { loginAdmin } = storeToRefs(useParameterStore());
	const { fixError, productAction } = useParameterStore();

	const isOpenEditPop = ref(false);
	const isShadow = ref(false);
	const isLoading = ref(false);
	const isZShadow = ref(false);

	const page_limit = ref(20);

	// List Store
	const prefitList = ref([]);
	const statusList = ref([
		{ val: 0, opt: 'On' },
		{ val: 1, opt: 'Off' },
	]);
	const documentList = ref([]);
	const firmwareList = ref([]);
	const documentTypeList = ref([]);
	const productTypeList = ref([]);
	const creatorList = ref([]);

	// Fix List
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

	// Component Action
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

	const getEditData = async (data, path, getData) => {
		fixLoading(true);
		changeItem(
			'E',
			encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				...data,
			}),
			path
		).then(async (res) => {
			if (res)
				fixError({
					title: 'Error',
					msg: res.response.data.error_code,
					isShow: true,
				});
			else await getData();

			fixLoading(false);
			fixOpenEditPop(false);
		});
	};

	const removeItem = async (row, path, cb) => {
		await comfirmBox();
		fixLoading(true);
		changeItem(
			'D',
			encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				_id: row._id,
			}),
			path
		).then(async (res) => {
			if (res)
				fixError({
					title: 'Error',
					msg: res.response.data.error_code,
					isShow: true,
				});
			else await cb();
			fixLoading(false);
		});
	};

	const addItem = async (data, path, cb) => {
		fixLoading(true);
		try {
			await postAdd(
				path,
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					...data,
				})
			);
			await cb();
		} catch (error) {
			console.log(error);
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

	// trigger control
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
		getEditData,
		removeItem,
		addItem,
	};
});
