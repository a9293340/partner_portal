import { ElMessage, ElMessageBox } from 'element-plus';
import { postDelete, postEdit } from './api';

export function localGet(key) {
	const value = window.localStorage.getItem(key);
	try {
		return JSON.parse(window.localStorage.getItem(key));
	} catch (error) {
		return value;
	}
}

export function sessionGet(key) {
	return window.sessionStorage.getItem(key);
}

export function localSet(key, value) {
	window.localStorage.setItem(key, JSON.stringify(value));
}

export function sessionSet(key, value) {
	window.sessionStorage.setItem(key, value);
}

export function sessionRemove(key) {
	window.sessionStorage.removeItem(key);
}

export function localRemove(key) {
	window.localStorage.removeItem(key);
}

export const encode = (txt) =>
	CryptoJS.AES.encrypt(JSON.stringify(txt), 'cino9527').toString();

export const decode = (txt) =>
	JSON.parse(
		CryptoJS.AES.decrypt(txt, 'cino9527').toString(CryptoJS.enc.Utf8)
	);

export const axiosList = (axo) => axo.data.data;

export const firstStringUpperCase = (str) =>
	str
		.replace('_id', '')
		.replace(/^./, str[0].toUpperCase())
		.replace('_', ' ');

export const getRoute = async () =>
	decode(
		axiosList(
			await axios.post('/api/route/list', {
				data: encode({
					limit: 100,
					page: 0,
					filter: {},
				}),
			})
		)
	).list;

export const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});

export const sortBy = (arr) =>
	arr.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));

export const depCopy = (obj) => JSON.parse(JSON.stringify(obj));

export const comfirmBox = async () =>
	ElMessageBox.confirm(
		'Proxy will permanently delete the file. Continue?',
		'Warning',
		{
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancel',
			type: 'warning',
		}
	);

export const popMsg = async (str) =>
	ElMessage({
		type: 'success',
		message: str,
	});

export const changeItem = async (target, data, path, jud = true) => {
	let err = null;
	try {
		try {
			target === 'D'
				? await postDelete(path, data)
				: await postEdit(path, data);
			if (jud)
				await popMsg(
					target === 'D' ? 'Delete completed' : 'Edit completed'
				);
		} catch (error) {
			if (error.response) err = error;
		}
		return err;
	} catch (error) {}
};
