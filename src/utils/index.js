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
