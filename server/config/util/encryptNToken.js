const CryptoJS = require('crypto-js');
const { MongooseCRUD } = require('../MongoDb/Api');

require('dotenv').config();

const makeToken = async (account, isToken) => {
	const token = encryptRes({
		account,
		date: new Date(),
	});
	if (isToken) await MongooseCRUD('D', 'admin_token', { tokenReq: account });
	await MongooseCRUD('C', 'admin_token', {
		tokenReq: account,
		token,
		date: new Date(),
	});

	return token;
};

const checkToken = async (req, res, next) => {
	const { token, tokenReq } = decryptRes(req.body.data);
	if (typeof token !== 'string' || typeof tokenReq !== 'string') {
		req.error_code = 10003;
		next(10003);
	} else
		try {
			MongooseCRUD('R', 'admin_token', { token }).then(
				async (arr, err) => {
					// console.log(arr);
					if (err || arr.length > 1) next(err || 10004);
					else if (!arr.length) next(10008);
					else {
						const checkDate =
							new Date() - new Date(arr[0]['date']) >
							15 * 60 * 1000;
						req.error_code = checkDate ? 10005 : 0;
						if (!req.error_code) {
							await MongooseCRUD(
								'Uo',
								'admin_token',
								{ tokenReq, token },
								{ date: new Date() }
							);
							next();
						} else next(req.error_code);
					}
				}
			);
		} catch (error) {
			req.error_code = 10003;
			next(10003);
		}
};

const decryptRes = (tar) => {
	const val = CryptoJS.AES.decrypt(tar, 'cino9527').toString(
		CryptoJS.enc.Utf8
	);
	try {
		return JSON.parse(val);
	} catch (e) {
		return false;
	}
};

const encryptRes = (tar) =>
	CryptoJS.AES.encrypt(JSON.stringify(tar), 'cino9527').toString();

const fuzzySearch = (str) => new RegExp(`.*${str}.*$`);

module.exports = {
	decryptRes,
	encryptRes,
	fuzzySearch,
	makeToken,
	checkToken,
};
