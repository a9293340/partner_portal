import { decode, useGetAxiosData } from "./index";

export const postList = async (address, data) =>
	decode(
		useGetAxiosData(
			await axios.post(`/api/${address}/list`, {
				data,
			})
		)
	);

export const postAdd = async (address, data) =>
	await axios.post(`/api/${address}/add`, {
		data,
	});

export const postEdit = async (address, data) =>
	await axios.post(`/api/${address}/edit`, { data });

export const postDelete = async (address, data) =>
	await axios.post(`/api/${address}/delete`, { data });

export const logout = async (data) =>
	await axios.post("/api/admin/logout", {
		data,
	});

export const login = async (data) =>
	decode(
		axiosList(
			await axios.post("/api/admin/login", {
				data,
			})
		)
	);
