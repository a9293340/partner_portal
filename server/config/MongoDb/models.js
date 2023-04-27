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

const admin_token = new mongoose.Schema({
	token: { type: String },
	tokenReq: { type: String },
	time: { type: Date },
});

const router = new mongoose.Schema({
	name: { type: String },
	path: { type: String },
	component: { type: String },
	perfit: { type: Array },
	subContent: { type: Array },
});

const firmware = new mongoose.Schema({
	name: { type: String },
	product_id: { type: String },
	perfit: { type: Array },
	version: { type: Array },
});

const product = new mongoose.Schema({
	name: { type: String },
	production_type_id: { type: String },
	perfit: { type: Array },
	firmware_id: { type: Array },
	documents_id: { type: Array },
	slogan: { type: String },
	photo: { type: String },
});

const production_type = new mongoose.Schema({
	name: { type: String },
	photo: { type: String },
	perfit: { type: Array },
});

const software = new mongoose.Schema({
	name: { type: String },
	software_type_id: { type: String },
	perfit: { type: Array },
	documents_id: { type: Array },
	photo: { type: String },
});

const software_type = new mongoose.Schema({
	name: { type: String },
	photo: { type: String },
	perfit: { type: Array },
});

const documents = new mongoose.Schema({
	name: { type: String },
	document_type_id: { type: String },
	perfit: { type: Array },
	version: { type: Array },
});

const document_type = new mongoose.Schema({
	name: { type: String },
	photo: { type: String },
	perfit: { type: Array },
});

const prefit = new mongoose.Schema({
	name: { type: String },
	prefit: { type: Number },
});

module.exports = {
	admin,
	router,
	firmware,
	product,
	production_type,
	software,
	software_type,
	documents,
	document_type,
	prefit,
	admin_token,
};
