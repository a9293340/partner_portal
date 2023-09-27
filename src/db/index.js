// Options
import { status } from "./options/status";
import { database_function_control } from "./options/databaseFunctionControl";
import {
	database_options_partner_portal,
	database_keys_options_partner_portal,
} from "./options/databaseOptions";
import { router_options_partner_portal } from "./options/routerOptions";
import { document_language } from "./options/documentLanguage";
import { owner } from "./options/owner";
import { action_log_type } from "./options/actionLogType";
import { resources_default_action } from "./options/resourcesAction";
import { database_Security_Filter_Dependence } from "./options/databaseSecurityFilterDependence";

// Roles
import { databaseList } from "./roles/database";
import {
	routers_backStage,
	routers_partner_portal_backStage,
	routers_partner,
} from "./roles/router";
import { document_language_role } from "./roles/document_language";

// Export Options
export const options = {
	status,
	database_function_control,
	database_options: database_options_partner_portal,
	router_options: router_options_partner_portal,
	document_language,
	owner,
	action_log_type,
	resources_default_action,
	database_keys_options_partner_portal,
	database_Security_Filter_Dependence,
};

// Export Roles
export const roles = {
	databaseList,
	routerList: [
		...routers_backStage,
		...routers_partner,
		...routers_partner_portal_backStage,
	],
	forTreeView: { routers_partner, routers_partner_portal_backStage },
	document_language_role,
};
