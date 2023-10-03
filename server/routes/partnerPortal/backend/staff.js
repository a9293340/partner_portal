const express = require("express");
const router = express.Router();

const { limiter } = require("../../../config/util/rate-limiter");
const {
	encryptRes,
	decryptRes,
	checkToken,
} = require("../../../config/util/encryptNToken");
const { MongooseCRUD } = require("../../../config/MongoDb/Api");
const { pList, pEdit } = require("../../../config/util/postAction");

router.post("/list", limiter, checkToken, (req, res, next) => {
	const { page, limit, filter } = decryptRes(req.body.data);
	// console.log(page, limit);
	pList(res, next, "staff", filter, false, { limit, page });
});

router.post("/add", limiter, checkToken, async (req, res, next) => {
	const { token, tokenReq, ...user } = decryptRes(req.body.data);
	if (!user) next(10003);
	else {
		try {
			const hasAccount = await MongooseCRUD("R", "staff", {
				account: user.account,
			});
			// console.log(hasAccount);
			if (hasAccount.length) next(11003);
			else {
				await MongooseCRUD("C", "staff", user);
				res.status(200).json({ error_code: 0, data: encryptRes({}) });
			}
		} catch (e) {
			next(10003);
		}
	}
});

router.post("/edit", limiter, checkToken, async (req, res, next) => {
	const { token, tokenReq, _id, ...other } = decryptRes(req.body.data);
	// console.log(other);
	if (!_id && !other) next(10003);
	else pEdit(res, next, "staff", other, _id);
});

module.exports = router;
