const express = require('express');
const router = express.Router();
const { limiter } = require('../../config/util/rate-limiter');
const { checkToken, decryptRes } = require('../../config/util/encryptNToken');
const {
	pList,
	canNotBeSameBeforeAdd,
	pEdit,
	pDelete,
} = require('../../config/util/postAction');

const fuzzySearch = (str) => new RegExp(`.*${str}.*$`);

router.post('/list', limiter, checkToken, (req, res, next) => {
	const { page, limit, filter } = decryptRes(req.body.data);
	if (filter.description)
		filter.description = fuzzySearch(filter.description);
	try {
		pList(res, next, 'p_mode_0', filter, false, { limit, page });
	} catch (error) {
		console.log(error);
	}
});

router.post('/add', limiter, checkToken, (req, res, next) => {
	const { token, tokenReq, ...useful } = decryptRes(req.body.data);
	// console.log(useful);
	canNotBeSameBeforeAdd(res, next, 'p_mode_0', useful, 'offset');
});

router.post('/edit', limiter, checkToken, async (req, res, next) => {
	const { token, tokenReq, _id, ...other } = decryptRes(req.body.data);
	if (!_id && !other) next(10003);
	else pEdit(res, next, 'p_mode_0', other, _id);
});

router.post('/delete', limiter, checkToken, async (req, res, next) => {
	const { _id } = decryptRes(req.body.data);
	if (!_id) next(10003);
	else pDelete(res, next, 'p_mode_0', _id);
});

module.exports = router;
