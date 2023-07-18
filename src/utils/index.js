import { ElMessage, ElMessageBox } from 'element-plus';
import { postAdd, postDelete, postEdit } from './api';

export function localGet(key) {
	return window.localStorage.getItem(key);
}

export function sessionGet(key) {
	return window.localStorage.getItem(key);
}

export function localSet(key, value) {
	window.localStorage.setItem(key, JSON.stringify(value));
}

export function sessionSet(key, value) {
	window.localStorage.setItem(key, value);
}

export function sessionRemove(key) {
	window.localStorage.removeItem(key);
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
				: target === 'E'
				? await postEdit(path, data)
				: await postAdd(path, data);
			if (jud)
				await popMsg(
					target === 'D'
						? 'Delete completed'
						: target === 'E'
						? 'Edit completed'
						: 'Add completed'
				);
		} catch (error) {
			if (error.response) err = error;
		}
		return err;
	} catch (error) {}
};
