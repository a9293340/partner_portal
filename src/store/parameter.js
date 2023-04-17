// import { fa } from 'element-plus/es/locale';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useComponentStore } from './component';

export const useParameterStore = defineStore('parameter', () => {
	const comStore = useComponentStore();
	const { checkEmail } = comStore;

	const adminList = ref([]);
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
	const resetAdminList = (arr) => (adminList.value = arr);
	const changeShowMenu = (bool) => (showMenu.value = bool);
	const fixHeader = (str) => (nowHeader.value = str);
	const isPassPrefit = (obj) =>
		obj.findIndex((el) => el === loginAdmin.value.permissions) === -1;

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
		isPassPrefit,
		adminList,
		resetAdminList,
	};
});
