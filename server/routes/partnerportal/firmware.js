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

router.post('/list', limiter, checkToken, (req, res, next) => {
	const { page, limit, filter } = decryptRes(req.body.data);
	pList(res, next, 'firmware', filter, false, { limit, page });
});

router.post('/add', limiter, checkToken, (req, res, next) => {
	const { token, tokenReq, ...useful } = decryptRes(req.body.data);
	canNotBeSameBeforeAdd(res, next, 'firmware', useful, 'name');
});

router.post('/edit', limiter, checkToken, async (req, res, next) => {
	const { token, tokenReq, _id, ...other } = decryptRes(req.body.data);
	if (!_id && !other) next(10003);
	else pEdit(res, next, 'firmware', other, _id);
});

router.post('/delete', limiter, checkToken, async (req, res, next) => {
	const { _id } = decryptRes(req.body.data);
	if (!_id) next(10003);
	else pDelete(res, next, 'firmware', _id);
});

module.exports = router;
