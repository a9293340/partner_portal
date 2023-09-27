export const specialForm = [
	{
		database: "document",
		key: ["version"],
		contents: [
			{
				key: "ver",
				type: "input",
			},
			{
				key: "language_ver",
				type: "input",
			},
			{
				key: "document_language",
				type: "select",
			},
		],
	},
	{
		database: ["partner_level"],
		key: ["special_documents", "special_firmware", "special_software"],
		contents: [
			{
				key: "target",
				type: "select",
			},
			{
				key: "resources_default_action",
				type: "select",
			},
		],
	},
	{
		database: ["router_security"],
		key: ["router_ctrl"],
		contents: [
			{
				key: "router_path",
				type: "select",
			},
			{
				key: "database_function_control",
				type: "multi-select",
			},
		],
	},
	{
		database: ["database_security"],
		key: ["db_ctrl"],
		contents: [
			{
				key: "db_path",
				type: "select",
			},
			{
				key: "sensitive_field",
				type: "multi-select",
			},
			{
				key: "filters",
				type: "multi-special",
				child: [
					{
						key: "field",
						type: "select",
					},
					{
						key: "filter_dependence",
						type: "select",
					},
					{
						key: "filter_target",
						type: "input",
					},
				],
			},
		],
	},
];
