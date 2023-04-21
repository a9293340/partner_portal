# Data Base Template

### 帳號 (admin)

```json
{
	"_id": "string",
	"permissions": 0,
	"name": "string",
	"create_date": "date",
	"last_login_time": "date",
	"status": 0,
	"account": "string",
	"password": "string",
	"email": "string",
	"action_log": [
		{
			"action": "string",
			"log_time": "date"
		}
	],
	"token":"string"

	"_comment__id": "database 自動生成",
	"_comment_permissions": "0=管理者, 1= Support, 2= Partner(CINO) 3 = Partner(SICK)",
	"_comment_status": "0=正常, 1=停用中",
	"_comment_name": "length = 20",
	"_comment_account": "max length = 16, min length = 8",
	"_comment_password": "max length = 16, min length = 8",
	"_comment_create_date": "YYYY-MM-DD HH:MM:SS",
	"_comment_last_login_time": "YYYY-MM-DD HH:MM:SS",
	"_comment_action_log": "紀錄下載動作 & 時間",
	"_comment_token": "AES加密，內容為帳號+時間 判斷登入時間"
}
```

### 路由 (router)

```json
{
	"_id": "string",
	"name": "string",
	"path": "string",
	"component": "string",
	"perfit": [0],
	"subContent": [
		{
			"name": "string",
			"path": "string",
			"component": "string",
			"prefit": [0]
		}
	],

	"_comment_name": "路由title",
	"_comment_path": "路徑",
	"_comment_prefit": "適用權限",
	"_comment_component": "適用模板",
	"_comment_subContent": "子路由"
}
```

### 韌體 (firmware)

```json
{
	"_id": "string",
	"name": "string",
	"product_id": "string",
	"prefit": [0],
	"version": [
		{
			"download_path": "string",
			"version": "string",
			"create_date": "date"
		}
	],

	"_comment_name": "EX: serialcommand...",
	"_comment_document_type_id": "product id",
	"_comment_prefit": "適用權限"
}
```

### 產品 (product)

```json
{
	"_id": "string",
	"name": "string",
	"production_type_id": "string",
	"photo": "string",
	"slogan": "string",
	"documents_id": ["string"],
	"firmware_id": ["string"],
	"prefit": [0],

	"_comment_name": "EX: A770",
	"_comment_production_type_id": "production_type id",
	"_comment_photo": "base64 format(.png)",
	"_comment_documents_id": "Documents db id",
	"_comment_firmware_id": "firmware db id",
	"_comment_prefit": "適用權限"
}
```

### 產品分類 (production_type)

```json
{
	"_id": "string",
	"name": "string",
	"photo": "string",
	"prefit": [0],

	"_comment_name": "EX: corded...",
	"_comment_photo": "base64 format(.png)",
	"_comment_prefit": "適用權限"
}
```

### 軟體 (software)

```json
{
	"_id": "string",
	"name": "string",
	"photo": "string",
	"software_type_id": "string",
	"documents_id": ["string"],
	"prefit": [0],

	"_comment_name": "EX: corded...",
	"_comment_software_type_id": "software_type id",
	"_comment_photo": "base64 format(.png)",
	"_comment_documents_id": "Documents db id",
	"_comment_prefit": "適用權限"
}
```

### 軟體分類 (software_type)

```json
{
	"_id": "string",
	"name": "string",
	"photo": "string",
	"prefit": [0],

	"_comment_name": "EX: corded...",
	"_comment_photo": "base64 format(.png)",
	"_comment_prefit": "適用權限"
}
```

### 文件 (documents)

```json
{
	"_id": "string",
	"name": "string",
	"document_type_id": "string",
	"prefit": [0],
	"version": [
		{
			"download_path": "string",
			"version": "string",
			"create_date": "date"
		}
	],

	"_comment_name": "EX: serialcommand...",
	"_comment_document_type_id": "document_type id",
	"_comment_prefit": "適用權限"
}
```

### 文件分類 (document_type)

```json
{
	"_id": "string",
	"name": "string",
	"photo": "string",
	"prefit": [0],

	"_comment_name": "EX: corded...",
	"_comment_photo": "base64 format(.png)",
	"_comment_prefit": "適用權限"
}
```

### 權限 (prefit)

```json
{
	"_id": "string",
	"name": "string",
	"prefit": 0,

	"_comment_prefit": "0 : 管理員 ;1: Support ;2: CINO partner ;3: SICK partner"
}
```
