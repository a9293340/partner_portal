# Data Base Template

### 員工 (staff)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"*tc_name": "string",
	"*staff_id": "string",
	"*account": "string",
	"*password": "string",
	"*email": "string",
	"*on_board_time": "Date",
	"*status": 0,
	"remarks": ["string"],
	"*division": "ObjectId",
	"*router_scy": "ObjectId",
	"*db_scy": "ObjectId",

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_name": "英文名",
	"_comment_tc_name": "中文名",
	"_comment_staff_id": "員工編號",
	"_comment_on_board_time": "到職日 YYYY-MM-DD ",
	"_comment_division": "division _id",
	"_comment_router_scy": "router_scy _id",
	"_comment_db_scy": "db_scy _id"
}
```

### 活動紀錄 (action_log)

```json
{
	"_id": "ObjectId",
	"*action_type": 0,
	"*action_path": "string",
	"*action_target": "string",
	"*action_time": "Date",
	"action_detail": { "from": {}, "to": {} },
	"*staff": "ObjectId",

	"_comment__id": "database 自動生成",
	"_comment_staff": "staff _id",
	"_comment_action_type": "0=Edit, 1=Create, 2=Download",
	"_comment_action_path": "活動路徑",
	"_comment_tc_action_target": "活動目標",
	"_comment_action_time": "活動時間 YYYY-MM-DD HH:MM:SS",
	"_comment_action_detail": "活動細節(僅 Edit會有)"
}
```

### 員工群組 (staff_group)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"short_name": "string",
	"*established_date": "Date",
	"*status": 0,
	"staff_names": ["ObjectId"],
	"remarks": ["string"],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_short_name": "群組簡稱",
	"_comment_established_date": "建立時間 YYYY-MM-DD",
	"_comment_staff_names": "staff _id"
}
```

### 部門 (division)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"email": "string",
	"*status": 0,
	"remarks": ["string"],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable"
}
```

### 合作夥伴 (partner)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"tc_name": "string",
	"*partner_id": "string",
	"*account": "string",
	"*password": "string",
	"*email": "string",
	"*job_title": "string",
	"*company": "ObjectId",
	"*partner_level": "ObjectId",
	"*router_scy": "ObjectId",
	"*db_scy": "ObjectId",
	"*status": 0,
	"remarks": ["string"],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_partner_id": "夥伴編號",
	"_comment_job_title": "夥伴職稱",
	"_comment_partner_level": "夥伴等級",
	"_comment_company": "company _id",
	"_comment_router_scy": "router_scy _id",
	"_comment_db_scy": "db_scy _id"
}
```

### 夥伴群組 (partner_group)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"short_name": "string",
	"*established_date": "Date",
	"*status": 0,
	"partner_names": ["ObjectId"],
	"remarks": ["string"],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_short_name": "群組簡稱",
	"_comment_established_date": "建立時間 YYYY-MM-DD",
	"_comment_staff_names": "partner _id"
}
```

### 公司 (company)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"*status": 0,
	"remarks": ["string"],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable"
}
```

### 韌體 (firmware)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"*status": 0,
	"*download_path_s": "string",
	"download_path_g": "string",
	"download_path_b": "string",
	"remarks": ["string"],
	"*version": [
		{
			"version": "string",
			"uploader": "ObjectId",
			"upload_date": "Date"
		}
	],
	"*major_sku": "ObjectId",
	"*resources_action": 0,

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_major_sku": "major_sku _id",
	"_comment_resources_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_version": "version : 版號 ; uploader : staff _id ; upload_date: YYYY-MM-DD;",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path"
}
```

### 軟體 (software)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"*status": 0,
	"download_path_s": "string",
	"*download_path_g": "string",
	"download_path_b": "string",
	"remarks": ["string"],
	"*version": [
		{
			"version": "string",
			"uploader": "ObjectId",
			"upload_date": "Date"
		}
	],
	"*resources_action": 0,
	"*owner": [0],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_version": "version : 版號 ; uploader : staff _id ; upload_date: YYYY-MM-DD;",
	"_comment_resources_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_owner": "0=ODM 1=SICK",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path"
}
```

### 主要商品分類 (major_sku_type)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"*status": 0,
	"*photo": "string",
	"remarks": ["string"],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_photo": "base64格式"
}
```

### 主要商品 (major_sku)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"*status": 0,
	"*photo": "string",
	"remarks": ["string"],
	"*major_sku_type": "ObjectId",
	"*owner": [0],
	"*documents": ["ObjectId"],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_photo": "base64格式",
	"_comment_documents": "documents _id",
	"_comment_major_sku_type": "major_sku_type _id",
	"_comment_owner": "0=ODM 1=SICK"
}
```

### 文件分類 (document_type)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"*status": 0,
	"remarks": ["string"],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable"
}
```

### 文件 (document)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"*document_name": "string",
	"*status": 0,
	"*download_path_s": "string",
	"download_path_g": "string",
	"download_path_b": "string",
	"remarks": ["string"],
	"*version": [
		{
			"version": "string",
			"uploader": "ObjectId",
			"upload_date": "Date",
			"language_version": "string",
			"document_language": 0
		}
	],
	"*resources_action": 0,
	"*owner": [0],

	"_comment__id": "database 自動生成",
	"_comment_document_name": "文件檔案名稱",
	"_comment_name": "文件名稱",
	"_comment_status": "0=enable, 1=disable",
	"_comment_resources_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_owner": "0=ODM 1=SICK",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path",
	"_comment_version": "version : 版號 ;document_language: 參考language options; uploader : staff _id ; upload_date: YYYY-MM-DD; language_version: 語言版號"
}
```

### 夥伴層級 (partner_level)

```json
{
	"_id": "ObjectId",
	"*name": "string",
	"*status": 0,
	"*special_documents": [
		{
			"target": "ObjectId",
			"resources_action": 0
		}
	],
	"*special_firmware": [
		{
			"target": "ObjectId",
			"resources_action": 0
		}
	],
	"*special_software": [
		{
			"target": "ObjectId",
			"resources_action": 0
		}
	],
	"*owner": [0],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_special_documents": "target= documents _id resources_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_special_firmware": "target= firmware _id resources_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_special_software": "target= software _id resources_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_owner": "0= CINO , 1=SICK , 2=AIDA"
}
```

### 路徑安全管理 (router_security)

```json
	"_id": "ObjectId",
	"*name": "string",
	"*status": 0,
	"*router_ctrl": [
		{
			"router_path": "string",
			"database_function_control" : [0]
		}
	],


	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_router_control": "router_path : 各資料庫設定路徑(from json); database_function_control: 0=edit,1=create,2=import,3=export"

```

### 資料庫安全管理 (database_security)

```json
	"_id": "ObjectId",
	"*name": "string",
	"*status": 0,
	"*db_ctrl": [
		{
			"*db_path" : "string",
			"not_access_field": : ["string"],
			"filters": [
				{
					"field": "string",
					"filter_dependence": "string"
				}
			]
		}
	]

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_db_ctrl": "db_path: 資料庫; not_access_field: 無法看到的field; filters-field: 特定資料篩選field; filters-filter_dependence: 篩選依據",
```
