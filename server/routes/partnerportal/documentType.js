const express = require('express');
const router = express.Router();
const { limiter } = require('../../config/util/rate-limiter');
const { checkToken, decryptRes } = require('../../config/util/encryptNToken');
const {
	pList,
	canNotBeSameBeforeAdd,
	pEdit,
} = require('../../config/util/postAction');

router.post('/list', limiter, checkToken, (req, res, next) => {
	const { page, limit, filter } = decryptRes(req.body.data);
	try {
		pList(res, next, 'document_type', filter, false, { limit, page });
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
