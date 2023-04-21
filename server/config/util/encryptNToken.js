const CryptoJS = require('crypto-js');
const { MongooseCRUD } = require('../MongoDb/Api');

require('dotenv').config();

const makeToken = (account) =>
	encryptRes({
		account,
		date: new Date(),
	});

const checkToken = async (req, res, next) => {
	const { token, tokenReq } = decryptRes(req.body.data);
	const realToken = decryptRes(token);
	if (
		realToken.account !== tokenReq ||
		new Date() - new Date(realToken.date) >
			parseInt(process.env.DELAY) * 60 * 1000
	) {
		await MongooseCRUD('Uo', 'admin', { account: tokenReq }, { token: '' });
		next(10005);
	} else next();
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
