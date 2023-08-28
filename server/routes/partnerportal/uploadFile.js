const express = require('express');
const { encryptRes } = require('../../config/util/encryptNToken');
const router = express.Router();
const path = require('path');

router.post('/:extname', async (req, res) => {
	try {
		// 目前僅支援pdf ppkg上傳
		if (!['pdf', 'ppkg'].includes(req.params.extname))
			return res.status(422).json({
				error_code: 2001,
				data: encryptRes({}),
			});

		// handle no file
		if (!req.files) {
			res.status(400).json({
				error_code: 2000,
				data: encryptRes({}),
			});
			// handle has files
		} else {
			let avatar = req.files.uploadedFile;
			if (![`.${req.params.extname}`].includes(path.extname(avatar.name)))
				return res.status(422).json({
					error_code: 2002,
					data: encryptRes({}),
				});

			avatar.mv(
				`./uploadFiles/${req.params.extname}/${req.body.path}/` +
					avatar.name
			);

			res.status(200).json({
				error_code: 0,
				data: encryptRes({
					name: avatar.name,
					mimetype: avatar.mimetype,
					size: avatar.size,
				}),
			});
		}
	} catch (err) {
		res.status(400).json({
			error_code: 2003,
			data: encryptRes({}),
		});
	}
});

module.exports = router;
