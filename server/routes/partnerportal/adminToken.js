const express = require('express');
const router = express.Router();
const { limiter } = require('../../config/util/rate-limiter');
const { decryptRes } = require('../../config/util/encryptNToken');
const { pList } = require('../../config/util/postAction');

router.post('/list', limiter, (req, res, next) => {
	const { token } = decryptRes(req.body.data);
	// console.log(token);
	pList(res, next, 'admin_token', { token }, false, { limit: 1, page: 0 });
});

module.exports = router;
