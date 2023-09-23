// Options
import { status } from "./options/status";
import { database_function_control } from "./options/databaseFunctionControl";
import { database_options_partner_portal } from "./options/databaseOptions";
import { router_options_partner_portal } from "./options/routerOptions";
import { document_language } from "./options/documentLanguage";
import { owner } from "./options/owner";
import { action_log_type } from "./options/actionLogType";
import { resources_action } from "./options/resourcesAction";

// Roles
import { databaseList } from "./roles/database";
import {
	routers_backStage,
	routers_partner_portal_backStage,
	routers_partner,
} from "./roles/router";
import { specialForm } from "./roles/specialForm";
import { document_language_role } from "./roles/document_language";

// Export Options
export const options = {
	status,
	database_function_control,
	database_options_partner_portal,
	router_options_partner_portal,
	document_language,
	owner,
	action_log_type,
	resources_action,
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
	specialForm,
	document_language_role,
};
