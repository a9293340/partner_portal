import { databaseList } from "../roles/database";

export const databaseOptions = databaseList.map((el) => ({
	val: el.name,
	opt: el.optionName,
}));
