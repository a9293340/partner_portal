import { createRouter, createWebHashHistory } from 'vue-router';
import { depCopy } from '@/utils';
import { router, router_bak } from '../utils/router';

const newRoute = depCopy(router);
const newRoute_bak = depCopy(router_bak);

const defaultRouter = [
	{
		path: '/',
		redirect: '/introduce',
	},
	{
		path: '/introduce',
		name: 'Introduce',
		component: () => import('../views/Introduce.vue'),
		meta: { prefit: [0, 1, 2, 3, 4, 20, 21] },
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login.vue'),
		meta: { prefit: [0, 1, 2, 3, 4, 20, 21] },
	},
	{
		path: '/configurationHub',
		name: 'Configuration Hub',
		component: () => import('../views/ConfigurationHub.vue'),
		meta: { prefit: [0, 1, 2, 3, 4] },
		children: [
			{
				path: 'userList',
				name: 'User List',
				component: () =>
					import('../views/ConfigurationHub/UserList.vue'),
				meta: { prefit: [0, 2, 3] },
			},
			{
				path: 'prefitList',
				name: 'Prefit List',
				component: () =>
					import('../views/ConfigurationHub/PrefitList.vue'),
				meta: { prefit: [0] },
			},
			{
				path: 'documentList',
				name: 'Document List',
				component: () =>
					import('../views/ConfigurationHub/DocumentList.vue'),
				meta: { prefit: [0, 2] },
			},
			{
				path: 'documentLangList',
				name: 'Document Language List',
				component: () =>
					import('../views/ConfigurationHub/DoucmentLang.vue'),
				meta: { prefit: [0, 2] },
			},
			{
				path: 'documentTypeList',
				name: 'Document Type List',
				component: () =>
					import('../views/ConfigurationHub/DocumentTypeList.vue'),
				meta: { prefit: [0, 2] },
			},
			{
				path: 'productList',
				name: 'Product List',
				component: () =>
					import('../views/ConfigurationHub/ProductList.vue'),
				meta: { prefit: [0, 2] },
			},
			{
				path: 'productTypeList',
				name: 'Product Type List',
				component: () =>
					import('../views/ConfigurationHub/ProductTypeList.vue'),
				meta: { prefit: [0, 2] },
			},
			{
				path: 'firmwareList',
				name: 'Firmware List',
				component: () =>
					import('../views/ConfigurationHub/FirmwareList.vue'),
				meta: { prefit: [0, 2, 1, 4] },
			},
			{
				path: 'parameterList',
				name: 'Parameter',
				component: () =>
					import('../views/ConfigurationHub/ParameterList.vue'),
				meta: { prefit: [0, 2, 4] },
			},
		],
	},
	{
		path: '/actionLog',
		name: 'Action Log',
		component: () => import('../views/ActionLog.vue'),
		meta: { prefit: [0] },
	},
	{
		path: '/production',
		name: 'Production',
		component: () => import('../views/ProductionList.vue'),
		meta: { prefit: [0, 1, 2, 3, 4, 20, 21] },
	},
	{
		path: '/production/:id',
		name: 'Product',
		component: () => import('../views/Product/_id.vue'),
		meta: { prefit: [0, 1, 2, 3, 4, 20, 21] },
	},
];

const routes = [
	...defaultRouter,
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
