import { defineStore } from 'pinia';
import { ref } from 'vue';
import { sessionGet, encode, decode, axiosList } from '@/utils';

export const useComponentStore = defineStore('component', () => {
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

	const productTypeList = ref([]);

	const fixPrefitList = async (tokenReq) => {
		try {
			const prefit = await axios.post('/api/prefit/list', {
				data: encode({
					tokenReq,
					token: sessionGet('cinoT'),
					limit: 100,
					page: 0,
					filter: {},
				}),
			});
			prefitList.value = decode(axiosList(prefit)).list.map((el) => ({
				val: el.prefit,
				opt: el.name,
			}));
		} catch (error) {}
	};

	const fixProductTypeList = async (tokenReq) => {
		try {
			const prodctType = await axios.post('/api/productionType/list', {
				data: encode({
					tokenReq,
					token: sessionGet('cinoT'),
					limit: 100,
					page: 0,
					filter: {},
				}),
			});
			productTypeList.value = decode(axiosList(prodctType)).list.map(
				(el) => ({
					val: el._id,
					opt: el.name,
				})
			);
		} catch (error) {
			console.log(error);
		}
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
	};
});
