import router from "./router";
import { useComponentStore } from "@/store/useComponentsStatusStore";
import { useUserStore } from "./store/useUserStore";
import { storeToRefs } from "pinia";

router.beforeEach((to, from, next) => {
	// Login not need to check permission
	if (to.path.indexOf("/login") !== -1) {
		// logout

		next();
	} else {
		const { userRouterScy, identity, userDetail } = storeToRefs(useUserStore());
		const { showErrorMsgAlert, displaySideBarExecute } = useComponentStore();

		// 是否顯示 Side Bar
		displaySideBarExecute(
			to.path.indexOf("/login") !== -1 || to.name === "Cino System Control"
		);

		//! Partner Not Improve to visit backStage
		// const checkIsStaffToBackStage =
		// 	to.path.indexOf("/backStage") !== -1 &&
		// 	identity.value !== "/backStage/login";
		//! Not Login
		// const checkLoginStatus = Object.keys(userDetail.value).length;
		//! Check
		// if (checkIsStaffToBackStage || !checkLoginStatus) {
		// 	showErrorMsgAlert(10008);
		// 	next(identity.value);
		// 	return;
		// }

		// Router Security

		next();
	}
});

router.afterEach((to, from) => {
	const { setFontSizeController, setTreeView, displaySideBarExecute } =
		useComponentStore();
	const { fontSizeController } = storeToRefs(useComponentStore());

	try {
		// 是否顯示 Side Bar
		displaySideBarExecute(
			to.path.indexOf("/login") !== -1 || to.name === "Cino System Control"
		);
		// 設定 Tree View
		setTreeView(to.path);
		// Font Size Control
		if (to.path.indexOf("/login") === -1)
			setFontSizeController(fontSizeController.value);
	} catch (error) {
		showErrorMsgAlert(30001);
		router.push(from.path);
	}
});
