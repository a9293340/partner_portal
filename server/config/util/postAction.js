const { MongooseCRUD } = require('../../config/MongoDb/Api');
const { encryptRes } = require('./encryptNToken');
const { makeArticleDateArr } = require('./toDate');

const pList = (
	res,
	next,
	modelName,
	target,
	hasDateFormat = false,
	hasPage = false,
	projection = {}
) => {
	const option = hasPage
		? {
				limit: hasPage.limit,
				skip: hasPage.page * hasPage.limit,
		  }
		: {};
	try {
		MongooseCRUD('R', modelName, target, option, projection).then(
			async (arr, err) => {
				if (err) next(err);
				else if (
					hasPage &&
					(!Number.isInteger(hasPage.limit) ||
						!Number.isInteger(hasPage.page))
				) {
					next(10004);
				} else {
					if (hasDateFormat) arr = makeArticleDateArr(arr);
					const count = hasPage
						? await MongooseCRUD('COUNT', modelName, target)
						: 0;
					res.status(200).json({
						error_code: 0,
						data: encryptRes(
							hasPage
								? {
										total: count,
										list: arr,
								  }
								: {
										list: arr,
								  }
						),
					});
				}
			}
		);
	} catch (error) {
		next(10003);
	}
};

const pAdd = (res, next, modelName, use) => {
	if (typeof use !== 'object') next(10003);
	else
		try {
			MongooseCRUD('C', modelName, use).then((arr, err) => {
				if (err) next(err);
				else {
					res.status(200).json({
						error_code: 0,
						data: encryptRes({}),
					});
				}
			});
		} catch (error) {
			next(10003);
		}
};

const pEdit = async (res, next, modelName, use, _id) => {
	if (typeof use !== 'object' || typeof _id !== 'string') next(10003);
	else
		try {
			let arr = await MongooseCRUD('Uo', modelName, { _id }, use);
			// console.log(arr);
			res.status(200).json({
				error_code: !arr['modifiedCount'] ? 10007 : 0,
				data: encryptRes({}),
			});
		} catch (error) {
			next(10003);
		}
};

const pDelete = async (res, next, modelName, _id) => {
	if (typeof _id !== 'string') next(10003);
	else
		try {
			let arr = await MongooseCRUD('Do', modelName, { _id });
			console.log(arr);
			res.status(200).json({
				error_code: !arr['deletedCount'] ? 10007 : 0,
				data: encryptRes({}),
			});
		} catch (error) {
			next(10003);
		}
};

const pAggregate = async (res, modelName, target, hasPage) => {
	if (typeof target !== 'object') next(10003);
	else
		try {
			MongooseCRUD('A', modelName, target, {}, {}).then(
				async (arr, err) => {
					if (err) next(err);
					else if (
						hasPage &&
						(!Number.isInteger(hasPage.limit) ||
							!Number.isInteger(hasPage.page))
					) {
						next(10004);
					} else {
						let lastFilter = target.filter(
							(el) =>
								Object.keys(el)[0] === '$match' ||
								Object.keys(el)[0] === '$search'
						);
						// Add Count
						lastFilter.push({
							$count: 'count',
						});
						const total = (
							await MongooseCRUD('A', modelName, lastFilter)
						)[0].count;
						res.status(200).json({
							error_code: 0,
							data: encryptRes({
								total,
								list: arr,
							}),
						});
					}
				}
			);
		} catch (error) {
			next(10003);
		}
};

const canNotBeSameBeforeAdd = async (
	res,
	next,
	modelName,
	useful,
	checkKey
) => {
	if (!useful[checkKey]) next(10004);
	else if (typeof useful !== 'object') next(10003);
	else {
		let obj = {};
		obj[checkKey] = useful[checkKey];
		try {
			const arr = await MongooseCRUD('R', modelName, obj);
			if (arr.length) next(10012);
			else pAdd(res, next, modelName, useful);
		} catch (error) {
			next(10003);
		}
	}
};

module.exports = {
	pList,
	pAdd,
	pEdit,
	canNotBeSameBeforeAdd,
	pAggregate,
	pDelete,
};
