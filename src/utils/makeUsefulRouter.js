export const makeUsefulRouter = (arr) => {
	return arr
		.filter((el) => el.component)
		.map((el) => ({
			name: el.name,
			path: `${el.main_path}${el.path}`,
			component: el.component,
		}));
};
