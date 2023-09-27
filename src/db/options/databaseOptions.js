import { databaseList } from "../roles/database";

export const database_options_partner_portal = databaseList.map((el) => ({
	val: el.name,
	opt: el.optionName,
	field: el.keys,
}));

export const database_keys_options_partner_portal = (db) =>
	databaseList
		.find((el) => el.name === db)
		.keys.map((el) => ({
			val: el,
			opt: el,
		}));
