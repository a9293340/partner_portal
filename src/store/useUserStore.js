import { defineStore } from "pinia";
import { ref } from "vue";
import { useComponentStore } from "./useComponentsStatusStore";
import { localGet, localSet } from "@/utils";
import { require_db_list } from "@/utils/api";

export const useUserStore = defineStore("user", () => {
	const { showErrorMsgAlert } = useComponentStore();

	const identity = ref("/backStage/login");
	const userDetail = ref({});
	// Security
	const userRouterScy = ref({});
	const userDatabaseScy = ref({});

	// User檢查
	const loginApi = async (type, user) => {};

	// 取得router_scy db_scy user_info
	const getUserInfo = async (user) => {
		let user_info = {};

		return user_info;
	};

	// 判斷資料格式正確性
	const setUserInformation = (ident, data) => {
		try {
			identity.value = ident;
			const { router_scy, db_scy, ...other } = data;

			if (
				typeof router_scy !== "object" ||
				typeof db_scy !== "object" ||
				!Object.keys(other).length
			) {
				showErrorMsgAlert(11002);
				return false;
			}

			userRouterScy.value = router_scy;
			userDatabaseScy.value = db_scy;
			userDetail.value = other;
			return true;
		} catch (error) {
			showErrorMsgAlert(10007);
			return false;
		}
	};

	// Login 過程
	const loginExecute = async (type, ident, user) => {
		await loginApi(type, user);

		const user_info = await getUserInfo(user);

		return setUserInformation(ident, user_info);
	};

	return {
		identity,
		userDetail,
		userRouterScy,
		userDatabaseScy,
		loginExecute,
	};
});
