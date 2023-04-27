const express = require('express');
const router = express.Router();

const { limiter } = require('../../config/util/rate-limiter');
const {
	encryptRes,
	decryptRes,
	makeToken,
	checkToken,
} = require('../../config/util/encryptNToken');
const { MongooseCRUD } = require('../../config/MongoDb/Api');
const { pList, pEdit } = require('../../config/util/postAction');
const dayjs = require('dayjs');

router.post('/login', limiter, async (req, res, next) => {
	const user = decryptRes(req.body.data);
	if (!user) next(10003);
	else
		MongooseCRUD('R', 'admin', { account: user.account }).then(
			async (arr, err) => {
				if (err || arr.length > 1) next(err || 10004);
				else if (!arr.length) next(11001);
				else if (
					!(user.password === arr[0]['password']) ||
					arr[0].status
				)
					next(11002);
				else if (arr[0].status) next(10008);
				else {
					await MongooseCRUD(
						'Uo',
						'admin',
						{ account: user.account },
						{
							last_login_time: dayjs().format(
								'YYYY-MM-DD HH:mm:ss'
							),
						}
					);
					const isToken = await MongooseCRUD('R', 'admin_token', {
						tokenReq: user.account,
					});
					const token = await makeToken(user.account, isToken);
					res.status(200).json({
						error_code: !isToken.length ? 0 : 10009,
						data: encryptRes({ token }),
					});
				}
			}
		);
});

router.post('/logout', limiter, checkToken, async (req, res, next) => {
	const { tokenReq, token } = decryptRes(req.body.data);
	await MongooseCRUD('D', 'admin_token', { tokenReq, token });
	res.status(200).json({ error_code: 0, data: encryptRes({}) });
});

router.post('/list', limiter, checkToken, (req, res, next) => {
	const { page, limit, filter } = decryptRes(req.body.data);
	pList(res, next, 'admin', filter, false, { limit, page });
});

router.post('/add', limiter, checkToken, async (req, res, next) => {
	const user = decryptRes(req.body.data);
	if (!user) next(10003);
	else {
		const temp = {
			account: user.account,
			password: user.password,
			token: '',
			permissions: user.permissions,
			name: user.name,
			status: user.status,
			email: user.email,
			create_date: new Date(),
			last_login_time: '',
			action_log: [],
		};
		try {
			const hasAccount = await MongooseCRUD('R', 'admin', {
				$or: [{ account: user.account }, { email: user.email }],
			});
			console.log(hasAccount);
			if (hasAccount.length) next(11003);
			else {
				await MongooseCRUD('C', 'admin', temp);
				res.status(200).json({ error_code: 0, data: encryptRes({}) });
			}
		} catch (e) {
			next(10003);
		}
	}
});

router.post('/edit', limiter, checkToken, async (req, res, next) => {
	const { token, tokenReq, _id, ...other } = decryptRes(req.body.data);
	// console.log(other);
	if (!_id && !other) next(10003);
	else pEdit(res, next, 'admin', other, _id);
});

module.exports = router;
