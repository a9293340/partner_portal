import { roles } from "@/db";

const getTreeViewName = (useful, idx, target) =>
	useful
		.filter((el) => el.level === idx)
		.map((el) => ({
			...el,
			children: target.find((x) => x.belong === el.name)
				? target
						.filter((x) => x.belong === el.name)
						.map((x) => ({
							name: x.name,
							children: x.children ? x.children : [],
							path: x.path,
						}))
				: [],
		}));

const getTreeViewObject = (tar) => {
	let useful = tar
		.filter((el) => el.tree_view_name)
		.map((el) => ({
			name: el.tree_view_name,
			level: el.level,
			belong: el.belong,
			path: `${el.main_path}${el.path}`,
		}));

	return getTreeViewName(
		useful,
		1,
		getTreeViewName(
			useful,
			2,
			useful.filter((el) => el.level === 3)
		)
	).map((el) => ({
		name: el.name,
		children: el.children,
		path: el.path,
	}));
};

export const tree_view_partner_portal_backStage = () =>
	getTreeViewObject(roles.forTreeView.routers_partner_portal_backStage);

export const tree_view_partner_portal = () =>
	getTreeViewObject(roles.forTreeView.routers_partner);
