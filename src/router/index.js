import { createRouter, createWebHashHistory } from 'vue-router';
import { depCopy } from '@/utils';
import { router } from '../utils/router';

const newRoute = depCopy(router);

const defaultRouter = [
	{
		path: '/',
		redirect: '/introduce',
	},
	{
		path: '/introduce',
		name: 'Introduce',
		component: () => import('../views/Introduce.vue'),
		meta: { prefit: [0, 1, 2, 3] },
	},
	{
		path: '/product/:id',
		name: 'Product',
		component: () => import('../views/Product/_id.vue'),
		meta: { prefit: [0, 1, 2, 3] },
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login.vue'),
		meta: { prefit: [0, 1, 2, 3] },
	},
];
let modules = import.meta.glob('../**/*.vue');
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
					component: modules[`../views/${el.component}.vue`],
					meta: { prefit: el.prefit },
				})),
			];
		} else {
			// console.log(target.prefit);
			arr.push({
				path: target.path,
				name: target.name,
				component: () => import(`../views/${target.component}.vue`),
				meta: { prefit: target.prefit },
			});
		}
	}

	// console.log(arr);

	return arr;
};

const routes = [
	...defaultRouter,
	...makeRouterData(newRoute),
	{
		path: '/:catchAll(.*)',
		redirect: '/introduce',
	},
];

const routers = createRouter({
	history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
	routes: routes,
});

export default routers;
