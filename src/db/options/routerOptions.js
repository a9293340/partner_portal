import { routers_partner_portal_backStage } from "../roles/router";

export const routerOptions = routers_partner_portal_backStage
	.filter((el) => el.component)
	.map((el) => ({
		val: el.path,
		opt: el.name,
	}));
