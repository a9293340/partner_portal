import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useParameterStore = defineStore('parameter', () => {
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

	const checkEmail = (rule, value, callback) => {
		let emailRegxp =
			/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
		if (!value) return callback(new Error("Email can't be empty"));
		else if (!emailRegxp.test(value))
			callback(new Error('Email format is wrong'));
		else callback();
	};

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
		slogan: [
			{
				required: 'true',
				message: "Account can't be empty",
				trigger: 'blur',
			},
		],
		production_type_id: [
			{
				required: 'true',
				message: "company can't be empty",
				trigger: 'change',
			},
		],
		documents_id: [
			{
				required: 'true',
				message: "company can't be empty",
				trigger: 'change',
			},
		],
		firmware_id: [
			{
				required: 'true',
				message: "company can't be empty",
				trigger: 'change',
			},
		],
		prefit: [
			{
				required: 'true',
				message: "company can't be empty",
				trigger: 'change',
			},
		],
	});

	const fixError = (obj) => {
		if (obj.msg && Number.isInteger(obj.msg))
			switch (obj.msg) {
				case 11002 || 11001:
					obj.msg = 'Account or Password is not exist!';
					break;
				case 10008:
					obj.msg = 'Your account has been suspended!';
					break;
				case 10005:
					obj.msg = 'Login TimeOut!';
					break;
				case 11003:
					obj.msg = 'Account Existed!';
					break;
				default:
					obj.msg = 'Format Error!';
					break;
			}
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
