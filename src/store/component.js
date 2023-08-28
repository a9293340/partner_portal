import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { sessionGet, encode, changeItem, comfirmBox, depCopy } from '@/utils';
import { useParameterStore } from './parameter';
import { postList, postAdd } from '../utils/api';
import dayjs from 'dayjs';

export const useComponentStore = defineStore('component', () => {
	const { loginAdmin } = storeToRefs(useParameterStore());
	const { fixError, productAction } = useParameterStore();

	const originShowPath = ref([
		{
			name: 'admin',
			prefit: [0, 2, 3],
			path: 'userList',
			type: 0,
			btnName: 'Account List',
		},
		{
			name: 'prefit',
			prefit: [0],
			path: 'prefitList',
			btnName: 'Account Permission Management',
		},
		{
			name: 'document',
			prefit: [0, 2],
			path: 'documentList',
			type: 1,
			btnName: 'Resources List',
		},
		{
			name: 'document_type',
			prefit: [0, 2],
			path: 'documentTypeList',
			btnName: 'Resources Type List',
		},
		{
			name: 'document_lang',
			prefit: [0, 2],
			path: 'documentLangList',
			btnName: 'Resources Language List',
		},
		{
			name: 'product',
			prefit: [0, 2],
			path: 'productList',
			type: 3,
			btnName: 'Product List',
		},
		{
			name: 'product_type',
			prefit: [0, 2],
			path: 'productTypeList',
			type: 98,
			btnName: 'Product Type List',
		},
		{
			name: 'firmware',
			prefit: [0, 2, 1, 4],
			path: 'firmwareList',
			type: 2,
			btnName: 'Firmware List',
		},
		{
			name: 'parameter',
			prefit: [0, 2, 4],
			path: 'parameterList',
			type: 2,
			btnName: 'Parameter List',
		},
	]);
	const usefulPath = ref([]);
	const nowConfiguration = ref('');
	const routerTrigger = ref(false);
	const isOpenEditPop = ref(false);
	const isOpenAddPop = ref(false);
	const isShowHelpPop = ref(false);
	const isShadow = ref(false);
	const isLoading = ref(false);
	const isZShadow = ref(false);
	const isOpenFunctionButton = ref(false);

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
	const langList = ref([]);

	const fixPage_limit = (size) => (page_limit.value = size);

	const tableRowClassName = ({ row, rowIndex }) =>
		row.status === 1
			? '--el-table-tr-bg-color: var(--el-color-danger-light-3)'
			: rowIndex % 2 === 1
			? '--el-table-tr-bg-color: var(--el-color-info-light-9)'
			: '';

	// Fix List
	const fixDocumentTypeList = async () => {
		try {
			const documentType = encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				limit: 1000,
				page: 0,
				filter: {
					status: 0,
				},
			});
			documentTypeList.value = (
				await postList('documentType', documentType)
			).list.map((el) => ({
				val: el._id,
				opt: el.name,
			}));
		} catch (error) {
			fixError({
				title: 'Error',
				msg: error.response?.data.error_code,
				isShow: true,
			});
			fixLoading(false);
		}
	};

	const fixFirmwareList = async () => {
		try {
			const firmware = encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				limit: 1000,
				page: 0,
				filter: {
					status: 0,
				},
			});
			firmwareList.value = (
				await postList('firmware', firmware)
			).list.map((el) => ({
				val: el._id,
				opt: el.name,
			}));
			// console.log(firmwareList.value);
		} catch (error) {
			fixError({
				title: 'Error',
				msg: error.response?.data.error_code,
				isShow: true,
			});
			fixLoading(false);
		}
	};

	const fixDocumentList = async () => {
		try {
			const document = await postList(
				'document',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: 1000,
					page: 0,
					filter: {
						status: 0,
					},
				})
			);
			documentList.value = document.list.map((el) => ({
				val: el._id,
				opt: el.name,
			}));
			// console.log(documentList.value);
		} catch (error) {
			fixError({
				title: 'Error',
				msg: error.response?.data.error_code,
				isShow: true,
			});
			fixLoading(false);
		}
	};
	const fixPrefitList = async () => {
		try {
			const prefit = await postList(
				'prefit',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: 1000,
					page: 0,
					filter: {
						status: 0,
					},
				})
			);
			prefitList.value = prefit.list.map((el) => ({
				val: el.prefit,
				opt: el.name,
			}));
		} catch (error) {
			fixError({
				title: 'Error',
				msg: error.response?.data.error_code,
				isShow: true,
			});
			fixLoading(false);
		}
	};
	const fixProductTypeList = async () => {
		try {
			const productType = await postList(
				'productionType',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: 1000,
					page: 0,
					filter: {
						status: 0,
					},
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
			fixError({
				title: 'Error',
				msg: error.response?.data.error_code,
				isShow: true,
			});
			fixLoading(false);
		}
	};

	const getLangList = async () => {
		try {
			const lang = await postList(
				'resourcesLang',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: 1000,
					page: 0,
					filter: {},
				})
			);
			langList.value = lang.list.map((el) => ({
				val: el._id,
				opt: el.name,
				code: el.code,
			}));
		} catch (error) {
			console.log(error);
			fixError({
				title: 'Error',
				msg: error.response?.data.error_code,
				isShow: true,
			});
			fixLoading(false);
		}
	};

	const getProductList = async () => {
		try {
			// console.log(loginAdmin.value);
			const product = await postList(
				'product',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: 1000,
					page: 0,
					filter: {
						status: 0,
					},
				})
			);
			productAction(product.list);
		} catch (error) {
			console.log(error);
			fixError({
				title: 'Error',
				msg: error.response?.data.error_code,
				isShow: true,
			});
			fixLoading(false);
		}
	};
	const getCreatorList = async (permissions) => {
		try {
			const creator = await postList(
				'admin',
				encode({
					tokenReq: loginAdmin.value.account,
					token: sessionGet('cinoT'),
					limit: 1000,
					page: 0,
					filter: {
						permissions,
						status: 0,
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
			fixError({
				title: 'Error',
				msg: error.response?.data.error_code,
				isShow: true,
			});
			fixLoading(false);
		}
	};

	// Component Action
	const getDataByPage = async (page, route, jud = true, filter = {}) => {
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
					filter,
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
	const getSelectOptions = async (jud, type) => {
		let promiseArray = [];
		if (jud.find((el) => el === 'PR')) await fixPrefitList();
		if (jud.find((el) => el === 'D')) await fixDocumentList();
		if (jud.find((el) => el === 'F')) await fixFirmwareList();
		if (jud.find((el) => el === 'DT')) await fixDocumentTypeList();
		if (jud.find((el) => el === 'PT')) await fixProductTypeList();
		if (jud.find((el) => el === 'P')) await getProductList();
		if (jud.find((el) => el === 'LA')) await getLangList();

		if (jud.find((el) => el === 'C'))
			await getCreatorList(
				originShowPath.value.find((el) => el.type === type).prefit
			);
	};

	const whichSelectOptionsShouldBeGet = async (type) => {
		// console.log(type);
		let data = {};
		let edit = [];
		let jud = [];
		switch (type) {
			case 0: // User
				if (!prefitList.value.length) jud.push('PR');
				break;
			case 1: // Document
				if (!documentTypeList.value.length) jud.push('DT');
				if (!prefitList.value.length) jud.push('PR');
				if (!langList.value.length) jud.push('LA');
				jud.push('C');
				break;
			case 2: // Firmware
				if (!prefitList.value.length) jud.push('PR');
				jud.push('C');
				break;
			case 3: // Product
				if (!productTypeList.value.length) jud.push('PT');
				if (!prefitList.value.length) jud.push('PR');
				if (!documentList.value.length) jud.push('D');
				if (!firmwareList.value.length) jud.push('F');
				break;
			case 98: //Production List
				// console.log(1);
				if (!productTypeList.value.length) jud.push('PT');
				break;
		}
		await getSelectOptions(jud, type);
		switch (type) {
			case 0:
				data = {
					permissions: prefitList.value,
				};
				edit = [
					{
						key: 'permissions',
						width: 170,
						list: prefitList.value,
					},
				];
				break;
			case 1:
				data = {
					document_type_id: documentTypeList.value,
					prefit: prefitList.value,
					creator: creatorList.value,
					lang: langList.value,
				};
				edit = [
					{
						key: 'document_type_id',
						width: 200,
						list: documentTypeList.value,
					},
				];
				break;
			case 2:
				data = {
					prefit: prefitList.value,
					creator: creatorList.value,
				};
				edit = [];
				break;
			case 3:
				data = {
					production_type_id: productTypeList.value,
					prefit: prefitList.value,
					documents_id: documentList.value,
					firmware_id: firmwareList.value,
				};
				edit = [
					{
						key: 'production_type_id',
						width: 180,
						list: productTypeList.value,
					},
				];
				break;
		}

		data['status'] = statusList.value;
		edit.push({
			key: 'status',
			width: 100,
			list: statusList.value,
		});
		// console.log(data, edit);
		return { data, edit };
	};

	const getEditData = async (data, path, getData, jud = true) => {
		fixLoading(true);
		changeItem(
			'E',
			encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				...data,
			}),
			path,
			jud
		).then(async (res) => {
			if (res)
				fixError({
					title: 'Error',
					msg: res.response?.data.error_code,
					isShow: true,
				});
			else await getData();

			fixLoading(false);
			fixOpenEditPop(false);
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
			// console.log(error);
			if (error.response)
				fixError({
					title: 'Error',
					msg: error.response?.data.error_code,
					isShow: true,
				});
		}
		// router.push('/userList');
		fixOpenAddPop(false);
		fixLoading(false);
	};

	// trigger control
	const fixOpenEditPop = (bool) => {
		isOpenEditPop.value = bool;
		isShadow.value = bool;
	};

	const fixOpenAddPop = (bool) => {
		isOpenAddPop.value = bool;
		isShadow.value = bool;
	};

	const fixLoading = (bool) => {
		isShadow.value = bool;
		isLoading.value = bool;
		isZShadow.value = bool;
	};

	const fixShadow = (bool) => {
		isShadow.value = bool;
	};

	const actionLog = async (path, type, data, editTarget, res, finalCB) => {
		let detail = {
			path: path,
			target: data._id,
			from: {},
			to: {},
		};
		if (type === 'E') {
			const keys = Object.keys(data);
			let from = {};
			let to = {};
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				if (
					JSON.stringify(data[key]) !==
					JSON.stringify(editTarget[key])
				) {
					if (key !== 'version') {
						from[key] = editTarget[key];
						to[key] = data[key];
					} else {
						for (let x = 0; x < data[key].length; x++) {
							const after = data[key][x];
							const before = editTarget[key][x];
							if (
								JSON.stringify(after) !== JSON.stringify(before)
							) {
								const childKeys = Object.keys(after);
								childKeys.forEach((ke) => {
									if (ke === 'version') {
										from['ver_target'] = before[ke];
										to['ver_target'] = after[ke];
									} else if (before[ke] !== after[ke]) {
										from[ke] = before[ke];
										to[ke] = after[ke];
									}
								});
							}
						}
					}
				}
			}
			detail.from = from;
			detail.to = to;
		}
		if (type === 'A') detail.target = res.list[0]._id;

		const log = {
			time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			type,
			detail,
		};

		const final = depCopy(loginAdmin.value['action_log']);
		final.push(log);
		if (final.length > 100) final.shift();

		getEditData(
			{ action_log: final, _id: loginAdmin.value['_id'] },
			'admin',
			() => {},
			false
		).then(() => {
			finalCB(final);
		});
	};

	const showHelpWindow = (bool) => {
		fixShadow(bool);
		isShowHelpPop.value = bool;
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
		addItem,
		fixPage_limit,
		whichSelectOptionsShouldBeGet,
		isOpenFunctionButton,
		fixOpenAddPop,
		isOpenAddPop,
		originShowPath,
		tableRowClassName,
		fixShadow,
		actionLog,
		showHelpWindow,
		getLangList,
		isShowHelpPop,
		routerTrigger,
		usefulPath,
		nowConfiguration,
		langList,
	};
});
