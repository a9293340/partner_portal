import { defineStore } from "pinia";
import { ref } from "vue";
import i18n from "@/i18n";
import {
	tree_view_partner_portal_backStage,
	tree_view_partner_portal,
} from "@/utils/makeTreeView";

// 畫面
export const useComponentStore = defineStore("componentStatus", () => {
	// Side Bar Control
	// RWD使用
	const isShowSideBar = ref(false);
	const showSideBarExecute = (boolean) => (isShowSideBar.value = boolean);
	// Login Cino Control 等頁面使用
	const isDisplaySideBar = ref(false);
	const displaySideBarExecute = (boolean) => (isDisplaySideBar.value = boolean);

	// Side Bar Tree View
	const tv_pp = tree_view_partner_portal();
	const tv_pp_b = tree_view_partner_portal_backStage();
	const useful_tv = ref(tree_view_partner_portal());

	const setTreeView = (path) => {
		// Router 為後台
		if (path.indexOf("/backStage") !== -1) {
			// Partner Portal的後台
			path.indexOf("/partnerPortal") !== -1 && (useful_tv.value = tv_pp_b);
		}
		// Router 為前台
		else {
			// ! 後續新增Ecommerce 等前台分流再做判斷
			useful_tv.value = tv_pp;
		}
	};

	// Shadow
	const isShadow = ref(false);
	const isLoading = ref(false);
	const setShadow = (boolean) => (isShadow.value = boolean);
	const setLoading = (boolean) => (isLoading.value = boolean);

	// Alert
	const errorMsg = ref({
		title: "",
		isShow: false,
		msg: "",
		type: "error",
	});

	const showErrorMsgAlert = (error_code, type = "error") => {
		errorMsg.value = {
			title: `Error: ${error_code}`,
			isShow: true,
			msg: i18n.global.t(`errorCode.${error_code}`),
			type,
		};

		setTimeout(() => (errorMsg.value.isShow = false), 1000);
	};

	// font size
	const fontSizeController = ref(14);
	// font rule
	const font_rule_tag = [
		{ el: "span", size: "S" },
		{ el: "p", size: "S" },
		{ el: "h3", size: "M" },
		{ el: "label", size: "M" },
		{ el: "li", size: "M" },
		{ el: "h1", size: "L" },
	];
	const font_rule_class = [{ el: "el-input__inner", size: "M" }];
	const font_size_options = [
		{ opt: "Large", val: 16 },
		{ opt: "Medium", val: 14 },
		{ opt: "Small", val: 12 },
	];

	// font execute
	const setFontSizeController = (size) => {
		fontSizeController.value = size;

		const settingRole = (elements, type) => {
			for (let i = 0; i < elements.length; i++) {
				const tar = elements[i];
				tar.style["font-size"] = `${
					type === "M"
						? fontSizeController.value
						: type === "L"
						? fontSizeController.value + 2
						: fontSizeController.value - 2
				}px`;
			}
		};
		font_rule_tag.forEach((tag) =>
			settingRole(document.getElementsByTagName(tag.el), tag.size)
		);
		font_rule_class.forEach((cls) =>
			settingRole(document.getElementsByClassName(cls.el), cls.size)
		);
	};

	// i18n setting
	const language_i18n_options = [
		{ val: "en-US", opt: "USA" },
		{ val: "zh-TW", opt: "台灣" },
	];

	return {
		// Side Bar
		isShowSideBar,
		isDisplaySideBar,
		displaySideBarExecute,
		showSideBarExecute,
		setTreeView,
		useful_tv,
		// Shadow
		isShadow,
		setShadow,
		isLoading,
		setLoading,
		// font size
		fontSizeController,
		font_size_options,
		setFontSizeController,
		// i18n
		language_i18n_options,
		// Alert
		errorMsg,
		showErrorMsgAlert,
	};
});
