import { createRouter, createWebHashHistory } from "vue-router";
import { makeUsefulRouter } from "@/utils/makeUsefulRouter";
import { roles } from "@/db/index";

const modules3 = import.meta.glob("../views/*/*.vue");
const modules4 = import.meta.glob("../views/*/*/*.vue");

const counter = (str) => (str.match(/\//g) || []).length;

const defaultRouter = makeUsefulRouter(roles.routerList).map((el) => ({
	name: el.name,
	path: el.path,
	component:
		counter(el.component) === 3
			? modules3[el.component]
			: modules4[el.component],
}));

const routes = [
	...defaultRouter,
	{
		path: "/backStage/partnerPortal",
		redirect: "/backStage/partnerPortal/introduce",
	},
	{
		path: "/backStage/:catchAll(.*)",
		redirect: "/backStage",
	},
	{
		path: "/:catchAll(.*)",
		redirect: "/",
	},
];

const routers = createRouter({
	history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
	routes: routes,
});

export default routers;
