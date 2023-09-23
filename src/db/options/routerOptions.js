import { routers_partner_portal_backStage } from "../roles/router";

export const router_options_partner_portal = routers_partner_portal_backStage
	.filter((el) => el.component)
	.map((el) => ({
		val: `${el.main_path}${el.path}`,
		opt: el.name,
	}));
