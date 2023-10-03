const express = require("express");
const router = express.Router();

const { limiter } = require("../../../config/util/rate-limiter");
const {
	decryptRes,
	checkToken,
} = require("../../../config/util/encryptNToken");
const { pList, pEdit, pAdd } = require("../../../config/util/postAction");

router.post("/list", limiter, checkToken, async (req, res, next) => {
	const { page, limit, filter } = decryptRes(req.body.data);

	pList(res, next, "document", filter, false, { limit, page });
});

router.post("/add", limiter, checkToken, async (req, res, next) => {
	const { token, tokenReq, ...user } = decryptRes(req.body.data);

	pAdd(res, next, "document", user);
});

router.post("/edit", limiter, checkToken, async (req, res, next) => {
	const { token, tokenReq, _id, ...other } = decryptRes(req.body.data);
	// console.log(other);
	if (!_id && !other) next(10003);
	else pEdit(res, next, "document", other, _id);
});

module.exports = router;
