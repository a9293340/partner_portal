const mongoose = require('mongoose');

const admin = new mongoose.Schema({
	permissions: { type: Number },
	name: { type: String },
	create_date: { type: Date },
	last_login_time: { type: Date },
	status: { type: Number },
	account: { type: String },
	password: { type: String },
	email: { type: String },
	action_log: { type: Array },
	company: { type: String },
});

const p_mode_0 = new mongoose.Schema({
	description: { type: String },
	binMode: { type: Number },
	scanType: { type: Array },
	offset: { type: Number },
	val: { type: Object },
	key: { type: String },
	unit: { type: Array },
});

const p_mode_1 = new mongoose.Schema({
	description: { type: String },
	binMode: { type: Number },
	scanType: { type: Array },
	offset: { type: Object },
	key: { type: String },
	unit: { type: Array },
});

const admin_token = new mongoose.Schema({
	token: { type: String },
	tokenReq: { type: String },
	date: { type: Date },
	status: { type: Number },
});

const router = new mongoose.Schema({
	name: { type: String },
	path: { type: String },
	component: { type: String },
	prefit: { type: Array },
	subContent: { type: Array },
	status: { type: Number },
});

const firmware = new mongoose.Schema({
	name: { type: String },
	product_id: { type: String },
	prefit: { type: Array },
	version: { type: Array },
	status: { type: Number },
});

const product = new mongoose.Schema({
	name: { type: String },
	production_type_id: { type: String },
	prefit: { type: Array },
	firmware_id: { type: Array },
	documents_id: { type: Array },
	slogan: { type: String },
	photo: { type: String },
	status: { type: Number },
});

const production_type = new mongoose.Schema({
	name: { type: String },
	photo: { type: String },
	status: { type: Number },
});

const software = new mongoose.Schema({
	name: { type: String },
	software_type_id: { type: String },
	prefit: { type: Array },
	documents_id: { type: Array },
	photo: { type: String },
	status: { type: Number },
});

const software_type = new mongoose.Schema({
	name: { type: String },
	photo: { type: String },
	status: { type: Number },
});

const document = new mongoose.Schema({
	name: { type: String },
	document_type_id: { type: String },
	download_path: { type: String },
	remark: { type: Array },
	prefit: { type: Array },
	version: { type: Array },
	status: { type: Number },
});

const document_type = new mongoose.Schema({
	name: { type: String },
	photo: { type: String },
	status: { type: Number },
});

const prefit = new mongoose.Schema({
	name: { type: String },
	prefit: { type: Number },
	status: { type: Number },
});

const resources_lang = new mongoose.Schema({
	name: { type: String },
	code: { type: String },
});

module.exports = {
	admin,
	router,
	firmware,
	product,
	production_type,
	software,
	software_type,
	document,
	document_type,
	prefit,
	admin_token,
	p_mode_0,
	p_mode_1,
	resources_lang,
};
