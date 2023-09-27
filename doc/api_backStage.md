### API Log

| API           | Action          | Date       |
| ------------- | --------------- | ---------- |
| /staff/       | staff api       | 2023/09/27 |
| /action_log/  | action_log api  | 2023/09/27 |
| /staff_group/ | staff_group api | 2023/09/27 |
| /division/    | division api    | 2023/09/27 |

# log-server

- url: https://xxxxxxx.com.tw/api/[path]
- method: POST

| Path                                  | Description   |
| ------------------------------------- | ------------- |
| [/staff/list](#stafflist)             | 取得 員工資料 |
| [/staff/add](#staffadd)               | 新增 員工資料 |
| [/staff/edit](#staffedit)             | 修改 員工資料 |
| [/action_log/list](#action_loglist)   | 取得 活動紀錄 |
| [/action_log/add](#action_logadd)     | 新增 活動紀錄 |
| [/staff_group/list](#staff_grouplist) | 取得 員工群組 |
| [/staff_group/add](#staff_groupadd)   | 新增 員工群組 |
| [/staff_group/edit](#staff_groupedit) | 修改 員工群組 |
| [/division/list](#divisionlist)       | 取得 部門     |
| [/division/add](#divisionadd)         | 新增 部門     |
| [/division/edit](#divisionedit)       | 修改 部門     |

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
		"on_board_time": "Date",
		"division": "ObjectId"
	},

	"_comment_name_en": "英文名",
	"_comment_name_tc": "中文名",
	"_comment_on_board_time": "到職日 YYYY-MM-DD",
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
		"established_date": "Date"
	},

	"_comment_status": "0=enable, 1=disable",
	"_comment_established_date": "建立時間 YYYY-MM-DD"
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

	"_comment__id": "database 自動生成",
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

	"_comment__id": "database 自動生成",
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

	"_comment__id": "database 自動生成",
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

	"_comment__id": "database 自動生成",
	"_comment_status": "0=enable, 1=disable",
	"_comment_division_id": "部門編號"
}
```

response:

```json
{}
```
