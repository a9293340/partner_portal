import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useComponentStore = defineStore('component', () => {
	const isOpenEditPop = ref(false);
	const isShadow = ref(false);

	const prefitList = ref([
		{ val: 0, opt: 'Super admin' },
		{ val: 1, opt: 'Support' },
		{ val: 2, opt: 'Partner(CINO)' },
		{ val: 3, opt: 'Partner(SICK)' },
	]);
	const typeList = ref([
		{ val: 0, opt: 'On' },
		{ val: 1, opt: 'Off' },
	]);

	const fixOpenEditPop = (bool) => {
		isOpenEditPop.value = bool;
		isShadow.value = bool;
	};

	const firstStringUpperCase = (str) =>
		str.replace(/^./, str[0].toUpperCase());

	const makeKeys = (row, notNeed, selectOption, options) => {
		let obj = Object.keys(row)
			.filter((el) => !notNeed.find((s) => s === el))
			.map((el) => ({
				title: firstStringUpperCase(el),
				key: el,
				option: selectOption.find((s) => s === el) ? 'select' : 'input',
				isSelect: !selectOption.find((s) => s === el)
					? []
					: options[el],
			}));
		obj.sort((x, y) => {
			let a = x.title.toLowerCase();
			let b = y.title.toLowerCase();
			if (a > b) return 1;
			if (a < b) return -1;
			else return 0;
		});

		return obj;
	};

	const checkEmail = (rule, value, callback) => {
		let emailRegxp =
			/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
		if (!value) return callback(new Error("Email can't be empty"));
		else if (!emailRegxp.test(value))
			callback(new Error('Email format is wrong'));
		else callback();
	};

	return {
		isOpenEditPop,
		fixOpenEditPop,
		isShadow,
		makeKeys,
		checkEmail,
		firstStringUpperCase,
		prefitList,
		typeList,
	};
});
