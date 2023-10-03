const express = require("express");
const router = express.Router();

const { limiter } = require("../../../config/util/rate-limiter");
const {
	encryptRes,
	decryptRes,
	makeToken,
	checkToken,
} = require("../../../config/util/encryptNToken");
const { MongooseCRUD } = require("../../../config/MongoDb/Api");

router.post("/login", limiter, async (req, res, next) => {
	const user = decryptRes(req.body.data);
	// console.log(user);
	if (!user) next(10003);
	else
		MongooseCRUD("R", "partner", { account: user.account }).then(
			async (arr, err) => {
				// console.log(arr);
				if (err || arr.length > 1) next(err || 10004);
				else if (!arr.length) next(11001);
				else if (!(user.password === arr[0]["password"])) next(11002);
				else if (arr[0].status) next(10008);
				else {
					const isToken = await MongooseCRUD("R", "admin_token", {
						tokenReq: user.account,
					});
					const company = await MongooseCRUD("R", "company", {
						_id: arr.company,
					});
					const partner_level = await MongooseCRUD("R", "partner_level", {
						_id: arr.partner_level,
					});
					const router_scy = await MongooseCRUD("R", "router_scy", {
						_id: arr.router_scy,
					});
					let db_scy = await MongooseCRUD("R", "db_scy", { _id: arr.db_scy });

					db_scy.db_ctrl = await MongooseCRUD("R", "db_ctrl", {
						_id: db_scy.db_ctrl,
					});

					const token = await makeToken(user.account, isToken);
					res.status(200).json({
						error_code: !isToken.length ? 0 : 10009,
						data: encryptRes({
							token,
							company,
							router_scy,
							db_scy,
							partner_level,
						}),
					});
				}
			}
		);
});

router.post("/logout", limiter, checkToken, async (req, res, next) => {
	const { tokenReq, token } = decryptRes(req.body.data);
	await MongooseCRUD("D", "admin_token", { tokenReq, token });
	res.status(200).json({ error_code: 0, data: encryptRes({}) });
});

module.exports = router;
