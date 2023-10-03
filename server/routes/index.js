// backend
const staffRouter = require("./partnerPortal/backend/staff.js");
const staff_groupRouter = require("./partnerPortal/backend/staff_group.js");
const staffLogRouter = require("./partnerPortal/backend/staffLog.js");
const action_logRouter = require("./partnerPortal/backend/action_log.js");
const divisionRouter = require("./partnerPortal/backend/division.js");
const partner_groupRouter = require("./partnerPortal/backend/partner_group.js");
const partnerLogRouter = require("./partnerPortal/backend/partnerLog.js");
const partnerRouter = require("./partnerPortal/backend/partner.js");
const companyRouter = require("./partnerPortal/backend/company.js");
const firmwareRouter = require("./partnerPortal/backend/firmware.js");
const major_sku_typeRouter = require("./partnerPortal/backend/major_sku_type.js");
const major_skuRouter = require("./partnerPortal/backend/major_sku.js");
const softwareRouter = require("./partnerPortal/backend/software.js");
const document_typeRouter = require("./partnerPortal/backend/document_type.js");
const documentRouter = require("./partnerPortal/backend/document.js");
const router_securityRouter = require("./partnerPortal/backend/router_security.js");
const database_securityRouter = require("./partnerPortal/backend/database_security.js");
const db_ctrlRouter = require("./partnerPortal/backend/db_ctrl.js");

module.exports = {
	backend: {
		staffRouter,
		staff_groupRouter,
		staffLogRouter,
		action_logRouter,
		divisionRouter,
		partner_groupRouter,
		partnerLogRouter,
		firmwareRouter,
		companyRouter,
		partnerRouter,
		major_sku_typeRouter,
		softwareRouter,
		major_skuRouter,
		document_typeRouter,
		documentRouter,
		router_securityRouter,
		database_securityRouter,
		db_ctrlRouter,
	},
};
