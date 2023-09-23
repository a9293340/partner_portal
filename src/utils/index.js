import { ElMessage, ElMessageBox } from "element-plus";
import cryptoJs from "crypto-js";

// Local storage 操作
export function localGet(key) {
	return window.localStorage.getItem(key);
}

export function localSet(key, value) {
	window.localStorage.setItem(key, JSON.stringify(value));
}

export function localRemove(key) {
	window.localStorage.removeItem(key);
}

// 加密解密
export const encode = (txt) =>
	cryptoJs.AES.encrypt(
		JSON.stringify(txt),
		import.meta.env.VITE_ENCODEKEY
	).toString();

export const decode = (txt) =>
	JSON.parse(
		cryptoJs.AES.decrypt(txt, import.meta.env.VITE_ENCODEKEY).toString(
			cryptoJs.enc.Utf8
		)
	);

// 取得Axios回傳值
export const useGetAxiosData = (axo) => axo.data.data;

// 字串轉空格並開頭大寫
export const firstStringUpperCase = (str) =>
	str.replace("_id", "").replace(/^./, str[0].toUpperCase()).replace("_", " ");

// Input[file] 取得base64圖檔
export const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});

// Import Image
export const makeImage = (src) => new URL(`${src}`, import.meta.url).href;

// 降冪
export const sortBy = (arr, key) =>
	arr.sort((a, b) => new Date(b[key]) - new Date(a[key]));

// 深拷貝
export const depCopy = (obj) => JSON.parse(JSON.stringify(obj));

// 彈窗
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
