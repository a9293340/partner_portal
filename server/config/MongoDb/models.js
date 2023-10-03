const mongoose = require("mongoose");

// Member
const staff = new mongoose.Schema({
	_id: { type: String },
	name_en: { type: String },
	name_tc: { type: String },
	staff_id: { type: String },
	on_board_time: { type: Date },
	status: { type: Number },
	account: { type: String },
	password: { type: String },
	email: { type: String },
	remarks: { type: Array },
	division: { type: String },
	router_scy: { type: String },
	db_scy: { type: String },
});

const admin_token = new mongoose.Schema({
	token: { type: String },
	tokenReq: { type: String },
	date: { type: Date },
});

const staff_group = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	nickname: { type: String },
	group_id: { type: String },
	established_date: { type: Date },
	status: { type: Number },
	staff_names: { type: Array },
	remarks: { type: Array },
});

const division = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	email: { type: String },
	division_id: { type: String },
	status: { type: Number },
	remarks: { type: Array },
});

const action_log = new mongoose.Schema({
	_id: { type: String },
	action_path: { type: String },
	action_target: { type: String },
	action_time: { type: Date },
	staff: { type: Number },
	action_type: { type: String },
	action_detail: { type: Object },
});

const partner = new mongoose.Schema({
	_id: { type: String },
	name_en: { type: String },
	name_local: { type: String },
	partner_id: { type: String },
	status: { type: Number },
	account: { type: String },
	password: { type: String },
	email: { type: String },
	remarks: { type: Array },
	partner_level: { type: String },
	company: { type: String },
	job_title: { type: String },
	router_scy: { type: String },
	db_scy: { type: String },
});

const partner_group = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	nickname: { type: String },
	partner_group_id: { type: String },
	established_date: { type: Date },
	status: { type: Number },
	partner_names: { type: Array },
	remarks: { type: Array },
});

const company = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	nickname: { type: String },
	status: { type: Number },
	remarks: { type: Array },
});

// Products

const firmware = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	file_name: { type: String },
	status: { type: Number },
	resources_default_action: { type: Number },
	download_path_s: { type: String },
	download_path_g: { type: String },
	download_path_b: { type: String },
	version: { type: String },
	upload_date: { type: Date },
	uploader: { type: String },
	major_sku: { type: String },
	remarks: { type: Array },
});

const software = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	file_name: { type: String },
	status: { type: Number },
	resources_default_action: { type: Number },
	download_path_s: { type: String },
	download_path_g: { type: String },
	download_path_b: { type: String },
	version: { type: String },
	upload_date: { type: Date },
	uploader: { type: String },
	owner: { type: Array },
	remarks: { type: Array },
});

const major_sku_type = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	photo: { type: String },
	status: { type: Number },
	remarks: { type: Array },
});

const major_sku = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	photo: { type: String },
	status: { type: Number },
	major_sku_type: { type: Number },
	owner: { type: Array },
	remarks: { type: Array },
	documents: { type: Array },
});

const document_type = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	status: { type: Number },
	remarks: { type: Array },
});

const document = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	file_name: { type: String },
	nickname: { type: String },
	download_path_s: { type: String },
	download_path_g: { type: String },
	download_path_b: { type: String },
	version: { type: String },
	uploader: { type: String },
	language_ver: { type: String },
	upload_date: { type: Date },
	document_language: { type: Number },
	status: { type: Number },
	resources_default_action: { type: Number },
	owner: { type: Array },
	remarks: { type: Array },
});

// Permission

const partner_level = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	status: { type: Number },
	remarks: { type: Array },
	special_documents: { type: Array },
	special_firmware: { type: Array },
	special_software: { type: Array },
	owner: { type: Array },
});

const router_security = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	status: { type: Number },
	router_ctrl: { type: Array },
});

const database_security = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	status: { type: Number },
	db_ctrl: { type: String },
});

const db_ctrl = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	filter_target: { type: String },
	db_path: { type: String },
	status: { type: Number },
	filter_dependence: { type: Number },
	sensitive_field: { type: Array },
});

module.exports = {
	staff,
	admin_token,
	staff_group,
	division,
	action_log,
	partner,
	partner_group,
	company,
	firmware,
	software,
	major_sku_type,
	major_sku,
	document_type,
	document,
	partner_level,
	router_security,
	database_security,
	db_ctrl,
};
