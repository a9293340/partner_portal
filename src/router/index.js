import { createRouter, createWebHashHistory } from 'vue-router';
import routerData from '../assets/db/routerDb.json';

const defaultRouter = [
	{
		path: '/',
		redirect: '/introduce',
	},
	{
		path: '/introduce',
		name: 'introduce',
		component: () =>
			import(
				/* webpackChunkName: "introduce" */ '../views/Introduce.vue'
			),
		meta: { prefit: 1 },
	},
	{
		path: '/login',
		name: 'login',
		component: () =>
			import(/* webpackChunkName: "add" */ '../views/Login.vue'),
		meta: { prefit: 3 },
	},
];

const makeRouterData = (db) => {
	let arr = [];
	for (let i = 0; i < db.length; i++) {
		const target = db[i];
		if (target.subContent) {
			arr = [
				...arr,
				...target.subContent.map((el) => ({
					path: el.path,
					name: el.name,
					component: () => import(`../views/${el.component}.vue`),
					meta: { prefit: el.prefit },
				})),
			];
		} else {
			arr.push({
				path: target.path,
				name: target.name,
				component: () => import(`../views/${target.component}.vue`),
				meta: { prefit: target.prefit },
			});
		}
	}

	console.log(arr);

	return arr;
};

const routerData2 = makeRouterData(routerData);

const routes = [...defaultRouter, ...routerData2];

const router = createRouter({
	history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
	routes: routes,
});

export default router;
