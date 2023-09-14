import { ElMessage, ElMessageBox } from "element-plus";

export function localGet(key) {
	return window.localStorage.getItem(key);
}

export function localSet(key, value) {
	window.localStorage.setItem(key, JSON.stringify(value));
}

export function localRemove(key) {
	window.localStorage.removeItem(key);
}

export const encode = (txt) =>
	CryptoJS.AES.encrypt(
		JSON.stringify(txt),
		import.meta.env.VITE_ENCODEKEY
	).toString();

export const decode = (txt) =>
	JSON.parse(
		CryptoJS.AES.decrypt(txt, import.meta.env.ENCODEKEY).toString(
			CryptoJS.enc.Utf8
		)
	);

export const useGetAxiosData = (axo) => axo.data.data;

export const firstStringUpperCase = (str) =>
	str.replace("_id", "").replace(/^./, str[0].toUpperCase()).replace("_", " ");

export const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});

export const sortBy = (arr, key) =>
	arr.sort((a, b) => new Date(b[key]) - new Date(a[key]));

export const depCopy = (obj) => JSON.parse(JSON.stringify(obj));

export const confirmBox = async (msg) =>
	ElMessageBox.confirm(msg, "Warning", {
		confirmButtonText: "OK",
		cancelButtonText: "Cancel",
		type: "warning",
	});

export const popMsg = async (str) =>
	ElMessage({
		type: "success",
		message: str,
	});
