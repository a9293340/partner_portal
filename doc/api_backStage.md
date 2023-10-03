### API Log

| API                 | Action                | Date       |
| ------------------- | --------------------- | ---------- |
| /staff/             | staff api             | 2023/09/27 |
| /action_log/        | action_log api        | 2023/09/27 |
| /staff_group/       | staff_group api       | 2023/09/27 |
| /division/          | division api          | 2023/09/27 |
| /partner/           | partner api           | 2023/09/27 |
| /partner_group/     | partner_group api     | 2023/09/27 |
| /company/           | company api           | 2023/09/27 |
| /firmware/          | firmware api          | 2023/09/27 |
| /software/          | software api          | 2023/09/27 |
| /major_sku_type/    | major_sku_type api    | 2023/09/27 |
| /major_sku/         | major_sku api         | 2023/09/27 |
| /document_type/     | document_type api     | 2023/09/27 |
| /document/          | document api          | 2023/09/27 |
| /partner_level/     | partner_level api     | 2023/09/27 |
| /router_security/   | router_security api   | 2023/09/27 |
| /database_security/ | database_security api | 2023/09/27 |
| /db_ctrl/           | db_ctrl api           | 2023/09/27 |

# log-server

- url: https://xxxxxxx.com.tw/api/[path]
- method: POST

| Path                                              | Description         |
| ------------------------------------------------- | ------------------- |
| [/staff/list](#stafflist)                         | 取得 員工資料       |
| [/staff/add](#staffadd)                           | 新增 員工資料       |
| [/staff/edit](#staffedit)                         | 修改 員工資料       |
| [/action_log/list](#action_loglist)               | 取得 活動紀錄       |
| [/action_log/add](#action_logadd)                 | 新增 活動紀錄       |
| [/staff_group/list](#staff_grouplist)             | 取得 員工群組       |
| [/staff_group/add](#staff_groupadd)               | 新增 員工群組       |
| [/staff_group/edit](#staff_groupedit)             | 修改 員工群組       |
| [/division/list](#divisionlist)                   | 取得 部門           |
| [/division/add](#divisionadd)                     | 新增 部門           |
| [/division/edit](#divisionedit)                   | 修改 部門           |
| [/partner/list](#partnerlist)                     | 取得 合作夥伴       |
| [/partner/add](#partneradd)                       | 新增 合作夥伴       |
| [/partner/edit](#partneredit)                     | 修改 合作夥伴       |
| [/partner_group/list](#partner_grouplist)         | 取得 夥伴群組       |
| [/partner_group/add](#partner_groupadd)           | 新增 夥伴群組       |
| [/partner_group/edit](#partner_groupedit)         | 修改 夥伴群組       |
| [/company/list](#companylist)                     | 取得 公司           |
| [/company/add](#companyadd)                       | 新增 公司           |
| [/company/edit](#companyedit)                     | 修改 公司           |
| [/firmware/list](#firmwarelist)                   | 取得 韌體           |
| [/firmware/add](#firmwareadd)                     | 新增 韌體           |
| [/firmware/edit](#firmwareedit)                   | 修改 韌體           |
| [/software/list](#softwarelist)                   | 取得 軟體           |
| [/software/add](#softwareadd)                     | 新增 軟體           |
| [/software/edit](#softwareedit)                   | 修改 軟體           |
| [/major_sku_type/list](#major_sku_typelist)       | 取得 主要商品分類   |
| [/major_sku_type/add](#major_sku_typeadd)         | 新增 主要商品分類   |
| [/major_sku_type/edit](#major_sku_typeedit)       | 修改 主要商品分類   |
| [/major_sku/list](#major_skulist)                 | 取得 主要商品       |
| [/major_sku/add](#major_skuadd)                   | 新增 主要商品       |
| [/major_sku/edit](#major_skuedit)                 | 修改 主要商品       |
| [/document_type/list](#document_typelist)         | 取得 文件分類       |
| [/document_type/add](#document_typeadd)           | 新增 文件分類       |
| [/document_type/edit](#document_typeedit)         | 修改 文件分類       |
| [/document/list](#documentlist)                   | 取得 文件           |
| [/document/add](#documentadd)                     | 新增 文件           |
| [/document/edit](#documentedit)                   | 修改 文件           |
| [/partner_level/list](#partner_levellist)         | 取得 夥伴層級       |
| [/partner_level/add](#partner_leveladd)           | 新增 夥伴層級       |
| [/partner_level/edit](#partner_leveledit)         | 修改 夥伴層級       |
| [/router_security/list](#router_securitylist)     | 取得 路徑安全管理   |
| [/router_security/add](#router_securityadd)       | 新增 路徑安全管理   |
| [/router_security/edit](#router_securityedit)     | 修改 路徑安全管理   |
| [/database_security/list](#database_securitylist) | 取得 資料庫安全管理 |
| [/database_security/add](#database_securityadd)   | 新增 資料庫安全管理 |
| [/database_security/edit](#database_securityedit) | 修改 資料庫安全管理 |
| [/db_ctrl/list](#db_ctrllist)                     | 取得 敏感資料設定   |
| [/db_ctrl/add](#db_ctrladd)                       | 新增 敏感資料設定   |
| [/db_ctrl/edit](#db_ctrledit)                     | 修改 敏感資料設定   |

## staff(員工)

### /staff/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name_en": "string",
		"name_tc": "string",
		"status": 0,
		"begin_date": "Date",
		"end_date": "Date",
		"division": "ObjectId"
	},

	"_comment_name_en": "英文名",
	"_comment_name_tc": "中文名",
	"_comment_begin_date": "到職日查詢起始 YYYY-MM-DD",
	"_comment_end_date": "到職日查詢結束 YYYY-MM-DD",
	"_comment_division": "division _id",
	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name_en": "string",
			"name_tc": "string",
			"staff_id": "string",
			"account": "string",
			"email": "string",
			"on_board_time": "Date",
			"status": 0,
			"remarks": ["string"],
			"division": "ObjectId",
			"router_scy": "ObjectId",
			"db_scy": "ObjectId"
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_name_en": "英文名",
	"_comment_name_tc": "中文名",
	"_comment_staff_id": "員工編號",
	"_comment_on_board_time": "到職日 YYYY-MM-DD ",
	"_comment_division": "division _id",
	"_comment_router_scy": "router_scy _id",
	"_comment_db_scy": "db_scy _id"
}
```

### /staff/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name_en": "string",
	"*name_tc": "string",
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

	"_comment_status": "0=enable, 1=disable",
	"_comment_name_en": "英文名",
	"_comment_name_tc": "中文名",
	"_comment_staff_id": "員工編號",
	"_comment_on_board_time": "到職日 YYYY-MM-DD ",
	"_comment_division": "division _id",
	"_comment_router_scy": "router_scy _id",
	"_comment_db_scy": "db_scy _id"
}
```

response:

```json
{}
```

### /staff/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name_en": "string",
	"*name_tc": "string",
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

	"_comment_status": "0=enable, 1=disable",
	"_comment_name_en": "英文名",
	"_comment_name_tc": "中文名",
	"_comment_staff_id": "員工編號",
	"_comment_on_board_time": "到職日 YYYY-MM-DD ",
	"_comment_division": "division _id",
	"_comment_router_scy": "router_scy _id",
	"_comment_db_scy": "db_scy _id"
}
```

response:

```json
{}
```

## action_log(活動紀錄)

### /action_log/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"*staff": "string",
		"action_time": "Date"
	},

	"_comment_staff": "staff _id",
	"_comment_action_time": "活動時間 YYYY-MM-DD HH:MM:SS"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"action_type": 0,
			"action_path": "string",
			"action_target": "string",
			"action_time": "Date",
			"action_detail": { "from": {}, "to": {} },
			"staff": "ObjectId"
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_staff": "staff _id",
	"_comment_action_type": "0=Edit, 1=Create, 2=Download",
	"_comment_action_path": "活動路徑",
	"_comment_tc_action_target": "活動目標",
	"_comment_action_time": "活動時間 YYYY-MM-DD HH:MM:SS",
	"_comment_action_detail": "活動細節(僅 Edit會有)"
}
```

### /action_log/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"*action_type": 0,
		"*action_path": "string",
		"*action_target": "string",
		"*action_time": "Date",
		"action_detail": { "from": {}, "to": {} },
		"*staff": "ObjectId"
	},

	"_comment_staff": "staff _id",
	"_comment_action_type": "0=Edit, 1=Create, 2=Download",
	"_comment_action_path": "活動路徑",
	"_comment_tc_action_target": "活動目標",
	"_comment_action_time": "活動時間 YYYY-MM-DD HH:MM:SS",
	"_comment_action_detail": "活動細節(僅 Edit會有)"
}
```

response:

```json
{}
```

## staff_group(員工群組)

### /staff_group/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0,
		"staff_names": ["ObjectId"],
		"established_date": "Date"
	},

	"_comment_status": "0=enable, 1=disable",
	"_comment_established_date": "建立時間 YYYY-MM-DD",
	"_comment_staff_names": "staff _id"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name": "string",
			"nickname": "string",
			"established_date": "Date",
			"status": 0,
			"staff_names": ["ObjectId"],
			"remarks": ["string"],
			"group_id": "string"
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_nickname": "群組簡稱",
	"_comment_group_id": "群組編號",
	"_comment_established_date": "建立時間 YYYY-MM-DD",
	"_comment_staff_names": "staff _id"
}
```

### /staff_group/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"nickname": "string",
	"*established_date": "Date",
	"*status": 0,
	"staff_names": ["ObjectId"],
	"remarks": ["string"],
	"*group_id": "string",

	"_comment_status": "0=enable, 1=disable",
	"_comment_nickname": "群組簡稱",
	"_comment_group_id": "群組編號",
	"_comment_established_date": "建立時間 YYYY-MM-DD",
	"_comment_staff_names": "staff _id"
}
```

response:

```json
{}
```

### /staff_group/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"nickname": "string",
	"*established_date": "Date",
	"*status": 0,
	"staff_names": ["ObjectId"],
	"remarks": ["string"],
	"*group_id": "string",

	"_comment_status": "0=enable, 1=disable",
	"_comment_nickname": "群組簡稱",
	"_comment_group_id": "群組編號",
	"_comment_established_date": "建立時間 YYYY-MM-DD",
	"_comment_staff_names": "staff _id"
}
```

response:

```json
{}
```

## division(部門)

### /division/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0
	},

	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name": "string",
			"email": "string",
			"status": 0,
			"remarks": ["string"],
			"division_id": ["string"]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_division_id": "部門編號"
}
```

### /division/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"email": "string",
	"*status": 0,
	"remarks": ["string"],
	"*division_id": ["string"],

	"_comment_status": "0=enable, 1=disable",
	"_comment_division_id": "部門編號"
}
```

response:

```json
{}
```

### /division/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"email": "string",
	"*status": 0,
	"remarks": ["string"],
	"*division_id": ["string"],

	"_comment_status": "0=enable, 1=disable",
	"_comment_division_id": "部門編號"
}
```

response:

```json
{}
```

## partner(合作夥伴)

### /partner/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name_en": "string",
		"status": 0,
		"company": "ObjectId",
		"partner_level": "ObjectId"
	},

	"_comment_status": "0=enable, 1=disable",
	"_comment_partner_level": "夥伴等級",
	"_comment_company": "company _id"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name_en": "string",
			"name_local": "string",
			"partner_id": "string",
			"account": "string",
			"email": "string",
			"job_title": "string",
			"company": "ObjectId",
			"partner_level": "ObjectId",
			"router_scy": "ObjectId",
			"db_scy": "ObjectId",
			"status": 0,
			"remarks": ["string"]
		}
	],

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

### /partner/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name_en": "string",
	"*name_local": "string",
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

	"_comment_status": "0=enable, 1=disable",
	"_comment_partner_id": "夥伴編號",
	"_comment_job_title": "夥伴職稱",
	"_comment_partner_level": "夥伴等級",
	"_comment_company": "company _id",
	"_comment_router_scy": "router_scy _id",
	"_comment_db_scy": "db_scy _id"
}
```

response:

```json
{}
```

### /division/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name_en": "string",
	"*name_local": "string",
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

	"_comment_status": "0=enable, 1=disable",
	"_comment_partner_id": "夥伴編號",
	"_comment_job_title": "夥伴職稱",
	"_comment_partner_level": "夥伴等級",
	"_comment_company": "company _id",
	"_comment_router_scy": "router_scy _id",
	"_comment_db_scy": "db_scy _id"
}
```

response:

```json
{}
```

## partner_group(夥伴群組)

### /partner_group/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0,
		"established_date": "Date",
		"partner_names": ["ObjectId"]
	},

	"_comment_status": "0=enable, 1=disable",
	"_comment_established_date": "建立時間 YYYY-MM-DD",
	"_comment_partner_names": "partner _id"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"*name": "string",
			"nickname": "string",
			"*established_date": "Date",
			"*partner_group_id": "string",
			"*status": 0,
			"partner_names": ["ObjectId"],
			"remarks": ["string"]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_nickname": "群組簡稱",
	"_comment_established_date": "建立時間 YYYY-MM-DD",
	"_comment_partner_group_id": "夥伴群組編號",
	"_comment_partner_names": "partner _id"
}
```

### /partner_group/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"nickname": "string",
	"*established_date": "Date",
	"*partner_group_id": "string",
	"*status": 0,
	"partner_names": ["ObjectId"],
	"remarks": ["string"],

	"_comment_status": "0=enable, 1=disable",
	"_comment_nickname": "群組簡稱",
	"_comment_established_date": "建立時間 YYYY-MM-DD",
	"_comment_partner_group_id": "夥伴群組編號",
	"_comment_partner_names": "partner _id"
}
```

response:

```json
{}
```

### /partner_group/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"nickname": "string",
	"*established_date": "Date",
	"*partner_group_id": "string",
	"*status": 0,
	"partner_names": ["ObjectId"],
	"remarks": ["string"],

	"_comment_status": "0=enable, 1=disable",
	"_comment_nickname": "群組簡稱",
	"_comment_established_date": "建立時間 YYYY-MM-DD",
	"_comment_partner_group_id": "夥伴群組編號",
	"_comment_partner_names": "partner _id"
}
```

response:

```json
{}
```

## company(公司)

### /company/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0
	},

	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name": "string",
			"nickname": "string",
			"status": 0,
			"remarks": ["string"]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable"
}
```

### /company/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"nickname": "string",
	"*status": 0,
	"remarks": ["string"],

	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{}
```

### /company/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"nickname": "string",
	"*status": 0,
	"remarks": ["string"],

	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{}
```

## firmware(韌體)

### /firmware/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0,
		"major_sku": "ObjectId",
		"version": "string",
		"uploader": "ObjectId",
		"upload_date": "Date",
		"resources_default_action": 0
	},

	"_comment_status": "0=enable, 1=disable",
	"_comment_major_sku": "major_sku _id",
	"_comment_version": "版號 ",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name": "string",
			"file_name": "string",
			"status": 0,
			"download_path_s": "string",
			"download_path_g": "string",
			"download_path_b": "string",
			"remarks": ["string"],
			"version": "string",
			"uploader": "ObjectId",
			"upload_date": "Date",
			"major_sku": "ObjectId",
			"resources_default_action": 0
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_major_sku": "major_sku _id",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_version": "版號 ",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path"
}
```

### /firmware/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*file_name": "string",
	"*status": 0,
	"*download_path_s": "string",
	"download_path_g": "string",
	"download_path_b": "string",
	"remarks": ["string"],
	"*version": "string",
	"*uploader": "ObjectId",
	"*upload_date": "Date",
	"*major_sku": "ObjectId",
	"*resources_default_action": 0,

	"_comment_status": "0=enable, 1=disable",
	"_comment_major_sku": "major_sku _id",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_version": "版號 ",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path"
}
```

response:

```json
{}
```

### /firmware/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*file_name": "string",
	"*status": 0,
	"*download_path_s": "string",
	"download_path_g": "string",
	"download_path_b": "string",
	"remarks": ["string"],
	"*version": "string",
	"*uploader": "ObjectId",
	"*upload_date": "Date",
	"*major_sku": "ObjectId",
	"*resources_default_action": 0,

	"_comment_status": "0=enable, 1=disable",
	"_comment_major_sku": "major_sku _id",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_version": "版號 ",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path"
}
```

response:

```json
{}
```

## software(軟體)

### /software/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0,
		"owner": [0],
		"version": "string",
		"uploader": "ObjectId",
		"upload_date": "Date",
		"resources_default_action": 0
	},

	"_comment_status": "0=enable, 1=disable",
	"_comment_owner": "0=Non-ODM 1=SICK",
	"_comment_version": "版號 ",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"*name": "string",
			"*file_name": "string",
			"*status": 0,
			"download_path_s": "string",
			"*download_path_g": "string",
			"download_path_b": "string",
			"remarks": ["string"],
			"*version": "string",
			"*uploader": "ObjectId",
			"*upload_date": "Date",
			"*resources_default_action": 0,
			"*owner": [0]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_version": "版號 ",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_owner": "0=Non-ODM 1=SICK",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path"
}
```

### /software/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*file_name": "string",
	"*status": 0,
	"download_path_s": "string",
	"*download_path_g": "string",
	"download_path_b": "string",
	"remarks": ["string"],
	"*version": "string",
	"*uploader": "ObjectId",
	"*upload_date": "Date",
	"*resources_default_action": 0,
	"*owner": [0],

	"_comment_status": "0=enable, 1=disable",
	"_comment_version": "版號 ",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_owner": "0=Non-ODM 1=SICK",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path"
}
```

response:

```json
{}
```

### /software/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*file_name": "string",
	"*status": 0,
	"download_path_s": "string",
	"*download_path_g": "string",
	"download_path_b": "string",
	"remarks": ["string"],
	"*version": "string",
	"*uploader": "ObjectId",
	"*upload_date": "Date",
	"*resources_default_action": 0,
	"*owner": [0],

	"_comment_status": "0=enable, 1=disable",
	"_comment_version": "版號 ",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_owner": "0=Non-ODM 1=SICK",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path"
}
```

response:

```json
{}
```

## major_sku_type(主要商品分類)

### /major_sku_type/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0
	},

	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name": "string",
			"status": 0,
			"photo": "string",
			"remarks": ["string"]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_photo": "base64格式"
}
```

### /major_sku_type/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"photo": "string",
	"remarks": ["string"],

	"_comment_status": "0=enable, 1=disable",
	"_comment_photo": "base64格式"
}
```

response:

```json
{}
```

### /major_sku_type/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"photo": "string",
	"remarks": ["string"],

	"_comment_status": "0=enable, 1=disable",
	"_comment_photo": "base64格式"
}
```

response:

```json
{}
```

## major_sku(主要商品)

### /major_sku/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0,
		"major_sku_type": "ObjectId",
		"owner": [0],
		"documents": ["ObjectId"]
	},

	"_comment_status": "0=enable, 1=disable",
	"_comment_documents": "documents _id",
	"_comment_major_sku_type": "major_sku_type _id",
	"_comment_owner": "0=Non-ODM 1=SICK"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name": "string",
			"status": 0,
			"photo": "string",
			"remarks": ["string"],
			"major_sku_type": "ObjectId",
			"owner": [0],
			"documents": ["ObjectId"]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_photo": "base64格式",
	"_comment_documents": "documents _id",
	"_comment_major_sku_type": "major_sku_type _id",
	"_comment_owner": "0=Non-ODM 1=SICK"
}
```

### /major_sku/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"photo": "string",
	"remarks": ["string"],
	"*major_sku_type": "ObjectId",
	"*owner": [0],
	"*documents": ["ObjectId"],

	"_comment_status": "0=enable, 1=disable",
	"_comment_photo": "base64格式",
	"_comment_documents": "documents _id",
	"_comment_major_sku_type": "major_sku_type _id",
	"_comment_owner": "0=Non-ODM 1=SICK"
}
```

response:

```json
{}
```

### /major_sku/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"photo": "string",
	"remarks": ["string"],
	"*major_sku_type": "ObjectId",
	"*owner": [0],
	"*documents": ["ObjectId"],

	"_comment_status": "0=enable, 1=disable",
	"_comment_photo": "base64格式",
	"_comment_documents": "documents _id",
	"_comment_major_sku_type": "major_sku_type _id",
	"_comment_owner": "0=Non-ODM 1=SICK"
}
```

response:

```json
{}
```

## document_type(文件分類)

### /document_type/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0
	},

	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name": "string",
			"status": 0,
			"remarks": ["string"]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable"
}
```

### /document_type/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"remarks": ["string"],

	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{}
```

### /document_type/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"remarks": ["string"],

	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{}
```

## document(文件)

### /document/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0,
		"resources_default_action": 0,
		"version": "string",
		"uploader": "ObjectId",
		"upload_date": "Date",
		"document_language": 0,
		"owner": [0]
	},

	"_comment_status": "0=enable, 1=disable",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_owner": "0=Non-ODM 1=SICK",
	"_comment_version": "版號 ",
	"_comment_document_language": "參考language options",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"*name": "string",
			"*file_name": "string",
			"nickname": "string",
			"*status": 0,
			"*download_path_s": "string",
			"download_path_g": "string",
			"download_path_b": "string",
			"remarks": ["string"],
			"*version": "string",
			"*uploader": "ObjectId",
			"*upload_date": "Date",
			"*language_ver": "string",
			"*document_language": 0,
			"*resources_default_action": 0,
			"*owner": [0]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_document_name": "文件檔案名稱",
	"_comment_name": "文件名稱",
	"_comment_status": "0=enable, 1=disable",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_owner": "0=Non-ODM 1=SICK",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path",
	"_comment_version": "版號 ",
	"_comment_document_language": "參考language options",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD",
	"_comment_language_ver": "語言版號"
}
```

### /document/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*file_name": "string",
	"nickname": "string",
	"*status": 0,
	"*download_path_s": "string",
	"download_path_g": "string",
	"download_path_b": "string",
	"remarks": ["string"],
	"*version": "string",
	"*uploader": "ObjectId",
	"*upload_date": "Date",
	"*language_ver": "string",
	"*document_language": 0,
	"*resources_default_action": 0,
	"*owner": [0],

	"_comment__id": "database 自動生成",
	"_comment_document_name": "文件檔案名稱",
	"_comment_name": "文件名稱",
	"_comment_status": "0=enable, 1=disable",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_owner": "0=Non-ODM 1=SICK",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path",
	"_comment_version": "版號 ",
	"_comment_document_language": "參考language options",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD",
	"_comment_language_ver": "語言版號"
}
```

response:

```json
{}
```

### /document/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*file_name": "string",
	"nickname": "string",
	"*status": 0,
	"*download_path_s": "string",
	"download_path_g": "string",
	"download_path_b": "string",
	"remarks": ["string"],
	"*version": "string",
	"*uploader": "ObjectId",
	"*upload_date": "Date",
	"*language_ver": "string",
	"*document_language": 0,
	"*resources_default_action": 0,
	"*owner": [0],

	"_comment_document_name": "文件檔案名稱",
	"_comment_name": "文件名稱",
	"_comment_status": "0=enable, 1=disable",
	"_comment_resources_default_action": "0=Normal 1=Must apply for download 2=Invisible",
	"_comment_owner": "0=Non-ODM 1=SICK",
	"_comment_download_path_s": "公司server 的download path",
	"_comment_download_path_g": "google server 的download path",
	"_comment_download_path_b": "baidu server 的download path",
	"_comment_version": "版號 ",
	"_comment_document_language": "參考language options",
	"_comment_uploader": "staff _id",
	"_comment_upload_date": "YYYY-MM-DD",
	"_comment_language_ver": "語言版號"
}
```

response:

```json
{}
```

## partner_level(夥伴層級)

### /partner_level/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0
	},

	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name": "string",
			"status": 0,
			"special_documents": [
				{
					"target": "ObjectId",
					"resources_default_action": 0
				}
			],
			"special_firmware": [
				{
					"target": "ObjectId",
					"resources_default_action": 0
				}
			],
			"special_software": [
				{
					"target": "ObjectId",
					"resources_default_action": 0
				}
			],
			"*owner": [0]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_special_documents": "target= document _id resources_default_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_special_firmware": "target= firmware _id resources_default_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_special_software": "target= software _id resources_default_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_owner": "0=Non- CINO , 1=SICK"
}
```

### /partner_level/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"special_documents": [
		{
			"*target": "ObjectId",
			"*resources_default_action": 0
		}
	],
	"special_firmware": [
		{
			"*target": "ObjectId",
			"*resources_default_action": 0
		}
	],
	"special_software": [
		{
			"*target": "ObjectId",
			"*resources_default_action": 0
		}
	],
	"*owner": [0],

	"_comment_status": "0=enable, 1=disable",
	"_comment_special_documents": "target= document _id resources_default_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_special_firmware": "target= firmware _id resources_default_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_special_software": "target= software _id resources_default_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_owner": "0=Non- CINO , 1=SICK"
}
```

response:

```json
{}
```

### /partner_level/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"special_documents": [
		{
			"*target": "ObjectId",
			"*resources_default_action": 0
		}
	],
	"special_firmware": [
		{
			"*target": "ObjectId",
			"*resources_default_action": 0
		}
	],
	"special_software": [
		{
			"*target": "ObjectId",
			"*resources_default_action": 0
		}
	],
	"*owner": [0],

	"_comment_status": "0=enable, 1=disable",
	"_comment_special_documents": "target= document _id resources_default_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_special_firmware": "target= firmware _id resources_default_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_special_software": "target= software _id resources_default_action : 0=normal 1=must apply for download 2=invisible",
	"_comment_owner": "0=Non- CINO , 1=SICK"
}
```

response:

```json
{}
```

## router_security(路徑安全管理)

### /router_security/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0
	},

	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name": "string",
			"status": 0,
			"router_ctrl": [
				{
					"router_path": "string",
					"database_function_control": [0]
				}
			]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_router_control": "router_path : 各資料庫設定路徑(from json); database_function_control: 0=edit,1=create,2=import,3=export"
}
```

### /router_security/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"router_ctrl": [
		{
			"router_path": "string",
			"database_function_control": [0]
		}
	],

	"_comment_status": "0=enable, 1=disable",
	"_comment_router_control": "router_path : 各資料庫設定路徑(from json); database_function_control: 0=edit,1=create,2=import,3=export"
}
```

response:

```json
{}
```

### /router_security/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"router_ctrl": [
		{
			"router_path": "string",
			"database_function_control": [0]
		}
	],

	"_comment_status": "0=enable, 1=disable",
	"_comment_router_control": "router_path : 各資料庫設定路徑(from json); database_function_control: 0=edit,1=create,2=import,3=export"
}
```

response:

```json
{}
```

## database_security(資料庫安全管理)

### /database_security/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"name": "string",
		"status": 0
	},

	"_comment_status": "0=enable, 1=disable"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"name": "string",
			"status": 0,
			"db_ctrl": ["ObjectId"]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_db_ctrl": "sensitive_database _id"
}
```

### /database_security/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"db_ctrl": [
		{
			"*name": "string",
			"*status": 0,
			"db_ctrl": ["ObjectId"]
		}
	],

	"_comment_status": "0=enable, 1=disable",
	"_comment_db_ctrl": "sensitive_database _id"
}
```

response:

```json
{}
```

### /database_security/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*name": "string",
	"*status": 0,
	"db_ctrl": [
		{
			"*name": "string",
			"*status": 0,
			"db_ctrl": ["ObjectId"]
		}
	],

	"_comment_status": "0=enable, 1=disable",
	"_comment_db_ctrl": "sensitive_database _id"
}
```

response:

```json
{}
```

## db_ctrl(敏感資料設定)

### /db_ctrl/list

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"page": 0,
	"limit": 0,
	"*filter": {
		"db_path": "string",
		"status": 0
	},

	"_comment_status": "0=enable, 1=disable",
	"_comment_db_path": "資料庫"
}
```

response:

```json
{
	"total": 0,
	"*list": [
		{
			"_id": "ObjectId",
			"*filter_dependence": 0,
			"*filter_target": "string",
			"*status": 0,
			"*db_path": "string",
			"*sensitive_field": ["string"]
		}
	],

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_db_path": "資料庫",
	"_comment_sensitive_field": "敏感 field",
	"_comment_filter_target": "判斷依據",
	"_comment_filter_dependence": "0=等於 1=大於 2=大於等於 3=小於 4=小於等於 5=包含 6=不包含"
}
```

### /db_ctrl/add

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*filter_dependence": 0,
	"*filter_target": "string",
	"*status": 0,
	"*db_path": "string",
	"*sensitive_field": ["string"],

	"_comment_status": "0=enable, 1=disable",
	"_comment_db_path": "資料庫",
	"_comment_sensitive_field": "敏感 field",
	"_comment_filter_target": "判斷依據",
	"_comment_filter_dependence": "0=等於 1=大於 2=大於等於 3=小於 4=小於等於 5=包含 6=不包含"
}
```

response:

```json
{}
```

### /db_ctrl/edit

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*filter_dependence": 0,
	"*filter_target": "string",
	"*status": 0,
	"*db_path": "string",
	"*sensitive_field": ["string"],

	"_comment_status": "0=enable, 1=disable",
	"_comment_db_path": "資料庫",
	"_comment_sensitive_field": "敏感 field",
	"_comment_filter_target": "判斷依據",
	"_comment_filter_dependence": "0=等於 1=大於 2=大於等於 3=小於 4=小於等於 5=包含 6=不包含"
}
```

response:

```json
{}
```
