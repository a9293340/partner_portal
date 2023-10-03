const dayjs = require("dayjs");

const toDateString = (date) => dayjs(date).format("YYYY-MM-DD HH:mm:ss");

const toISODate = (str) => new Date(str);

const makeArticleDateArr = (arr) =>
	arr.map((el) => {
		let a = JSON.parse(JSON.stringify(el));
		if (Object.keys(a).find((s) => s === "on_board_time"))
			a.on_board_time = toDateString(el.on_board_time);
		if (Object.keys(a).find((s) => s === "action_time"))
			a.action_time = toDateString(el.action_time);
		if (Object.keys(a).find((s) => s === "established_date"))
			a.established_date = toDateString(el.established_date);
		if (Object.keys(a).find((s) => s === "upload_date"))
			a.upload_date = toDateString(el.upload_date);
		return a;
	});

module.exports = {
	toISODate,
	toDateString,
	makeArticleDateArr,
};
