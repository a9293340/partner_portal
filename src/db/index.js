// Options
import { status } from "./options/status";
import { databaseFunctionControl } from "./options/databaseFunctionControl";
import { databaseOptions } from "./options/databaseOptions";
import { routerOptions } from "./options/routerOptions";
import { document_language } from "./options/document_language";
import { owner } from "./options/owner";
import { actionLogType } from "./options/actionLogType";
import { resourcesAction } from "./options/resourcesAction";

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
	databaseFunctionControl,
	databaseOptions,
	routerOptions,
	document_language,
	owner,
	actionLogType,
	resourcesAction,
};

// Export Roles
export const roles = {
	databaseList,
	routerList: [
		...routers_backStage,
		...routers_partner,
		...routers_partner_portal_backStage,
	],
	specialForm,
	document_language_role,
};
