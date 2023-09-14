export const specialForm = [
	{
		database: ["firmware", "software"],
		key: ["version"],
		contents: [
			{
				key: "version",
				type: "input",
			},
			{
				key: "uploader",
				type: "select",
			},
			{
				key: "upload_date",
				type: "date-select",
			},
		],
	},
	{
		database: "document",
		key: ["version"],
		contents: [
			{
				key: "version",
				type: "input",
			},
			{
				key: "uploader",
				type: "select",
			},
			{
				key: "upload_date",
				type: "date-select",
			},
			{
				key: "language_version",
				type: "input",
			},
			{
				key: "document_language",
				type: "input-number",
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
				key: "resources_action",
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
				type: "select",
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
				key: "not_access_field",
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
				],
			},
		],
	},
];
