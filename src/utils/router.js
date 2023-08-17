export const router = [
	{
		name: 'Product',
		path: '/production',
		component: 'ProductionList',
		prefit: [0, 1, 2, 3, 4, 20, 21],
		subContent: null,
	},
	// {
	// 	name: 'Configuration Hub',
	// 	path: '/configurationHub',
	// 	component: 'ConfigurationHub',
	// 	prefit: [0, 1, 2, 3, 4],
	// 	subContent: [
	// 		{
	// 			name: 'Setting',
	// 			path: '/configurationHub',
	// 			component: 'ConfigurationHub',
	// 			prefit: [0, 1, 2, 3, 4],
	// 		},
	// 		{
	// 			name: 'User Action Log',
	// 			path: '/actionLog',
	// 			component: 'ActionLog',
	// 			prefit: [0],
	// 		},
	// 	],
	// },
];

export const router_cino = [
	{
		name: 'Control',
		path: '/configurationHub',
		component: 'ConfigurationHub',
		prefit: [0, 1, 2, 3, 4],
		subContent: [
			{
				name: 'Account Management',
				path: '/configurationHub/userList',
				component: 'ConfigurationHub',
				prefit: [0, 1, 2, 3, 4],
				sub: ['Account List', 'Account Permission Management'],
			},
			{
				name: 'Resources List',
				path: '/configurationHub/documentList',
				component: 'ConfigurationHub',
				prefit: [0, 1, 2, 3, 4],
				sub: [
					'Resources List',
					'Resources Type List',
					'Resources Language List',
				],
			},
			{
				name: 'Product List',
				path: '/configurationHub/productList',
				component: 'ConfigurationHub',
				prefit: [0, 1, 2, 3, 4],
				sub: ['Product List', 'Product Type List'],
			},
			{
				name: 'Application Management',
				path: '/configurationHub/firmwareList',
				component: 'ConfigurationHub',
				prefit: [0, 1, 2, 3, 4],
				sub: ['Firmware List', 'Software List'],
			},
			{
				name: 'Powertool3 Database',
				path: '/configurationHub/parameterList',
				component: 'ConfigurationHub',
				prefit: [0, 1, 2, 3, 4],
				sub: ['Parameter List', 'Help Window'],
			},
		],
	},
	{
		name: 'User Action Log',
		path: '/actionLog',
		component: 'ActionLog',
		prefit: [0, 1, 2, 3, 4],
	},
];

export const router_bak = [
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
			{
				name: 'Add Prefit',
				path: '/addPrefit',
				component: 'User/PrefitAdd',
				prefit: [0],
			},
			{
				name: 'Prefit List',
				path: '/prefitList',
				component: 'User/PrefitList',
				prefit: [0],
			},
		],
	},
	{
		name: 'Document Processing Center',
		path: '/documentProcessingCenter',
		component: 'DocumentProcessingCenter',
		prefit: [0, 1],
		subContent: [
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
				name: 'Add Document Type Data',
				path: '/addDocumentType',
				component: 'Document/DocumentTypeAdd',
				prefit: [0, 1],
			},
			{
				name: 'Document Type List',
				path: '/documentTypeList',
				component: 'Document/DocumentTypeList',
				prefit: [0, 1],
			},
		],
	},
	{
		name: 'Product Processing Center',
		path: '/productProcessingCenter',
		component: 'ProductProcessingCenter',
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
				name: 'Add Product Type Data',
				path: '/addProductType',
				component: 'Production/ProductTypeAdd',
				prefit: [0, 1],
			},
			{
				name: 'Product Type List',
				path: '/productTypeList',
				component: 'Production/ProductTypeList',
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
