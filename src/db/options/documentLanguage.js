import { document_language_role } from "../roles/document_language";

export const document_language = document_language_role.map((el) => ({
	val: el.val,
	opt: `${el.opt}(${el.short})`,
}));
