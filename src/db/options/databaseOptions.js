import { databaseList } from "../roles/database";

export const database_options_partner_portal = databaseList.map((el) => ({
	val: el.name,
	opt: el.optionName,
}));
