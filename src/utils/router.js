export const router = [
	{
		name: 'Configuration Hub',
		path: '/userControl',
		component: 'UserControl',
		prefit: [0],
		subContent: [
			{
				name: 'New User',
				path: '/addUser',
				component: 'User/UserAdd',
				prefit: [0],
			},
			{
				name: 'User List',
				path: '/userList',
				component: 'User/UserList',
				prefit: [0],
			},
		],
	},
	{
		name: 'Production',
		path: '/productionList',
		component: 'ProductionList',
		prefit: [0, 1, 2, 3],
		subContent: null,
	},
	{
		name: 'Data Processing Center',
		path: '/dataProcessingCenter',
		component: 'DataProcessingCenter',
		prefit: [0, 1],
		subContent: [
			{
				name: 'Add Product Data',
				path: '/addProduct',
				component: 'Production/ProductAdd',
				prefit: [0, 1],
			},
			{
				name: 'Product List',
				path: '/productList',
				component: 'Production/ProductList',
				prefit: [0, 1],
			},
			{
				name: 'Add Document Data',
				path: '/addDocument',
				component: 'Document/DocumentAdd',
				prefit: [0, 1],
			},
			{
				name: 'Document List',
				path: '/documentList',
				component: 'Document/DocumentList',
				prefit: [0, 1],
			},
			{
				name: 'Add Firmware Data',
				path: '/addFirmware',
				component: 'Firmware/FirmwareAdd',
				prefit: [0, 1],
			},
			{
				name: 'Firmware List',
				path: '/firmwareList',
				component: 'Firmware/FirmwareList',
				prefit: [0, 1],
			},
		],
	},
];
