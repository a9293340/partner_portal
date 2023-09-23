import { decode, useGetAxiosData } from "./index";
import axios from "axios";

// R
export const require_db_list = async (address, data) =>
	decode(
		useGetAxiosData(
			await axios.post(`/api/${address}/list`, {
				data,
			})
		)
	);

// C
export const require_db_create = async (address, data) =>
	await axios.post(`/api/${address}/add`, {
		data,
	});

// U
export const require_db_edit = async (address, data) =>
	await axios.post(`/api/${address}/edit`, { data });

// Login Partner

// Logout Partner

// Login Staff

// Logout Staff
