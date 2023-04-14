// import { fa } from 'element-plus/es/locale';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useComponentStore } from './component';

export const useParameterStore = defineStore('parameter', () => {
	const comStore = useComponentStore();
	const { checkEmail } = comStore;

	const loginAdmin = ref({});
	const tokenKey = ref('C8763');
	const showMenu = ref(false);
	const errorMsg = ref({
		title: '',
		msg: '',
		isShow: false,
	});
	const nowHeader = ref('');
	const adminRules = reactive({
		email: [
			{
				required: 'true',
				trigger: 'blur',
				validator: checkEmail,
			},
		],
		company: [
			{
				required: 'true',
				message: "company can't be empty",
				trigger: 'blur',
			},
		],
		name: [
			{
				required: 'true',
				message: "Name can't be empty",
				trigger: 'blur',
			},
		],
		password: [
			{
				required: 'true',
				message: "Password can't be empty",
				trigger: 'blur',
			},
		],
		account: [
			{
				required: 'true',
				message: "Account can't be empty",
				trigger: 'blur',
			},
		],
	});

	const fixError = (obj) => {
		errorMsg.value = obj;
		if (obj.isShow)
			setTimeout(() => {
				errorMsg.value.isShow = false;
			}, 1500);
	};

	const loginAction = (obj) => (loginAdmin.value = obj);
	const changeShowMenu = (bool) => (showMenu.value = bool);
	const fixHeader = (str) => (nowHeader.value = str);

	return {
		loginAdmin,
		tokenKey,
		loginAction,
		showMenu,
		changeShowMenu,
		fixError,
		errorMsg,
		nowHeader,
		fixHeader,
		adminRules,
	};
});
