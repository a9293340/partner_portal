### API Log

| API       | Action                  | Date       |
| --------- | ----------------------- | ---------- |
| /options/ | options dynamic options | 2023/09/27 |

# log-server

- url: https://xxxxxxx.com.tw/api/[path]
- method: POST

| Path                                              | Description            |
| ------------------------------------------------- | ---------------------- |
| [/options/all](#optionsall)                       | all options            |
| [/options/staff](#optionsstaff)                   | staff options          |
| [/options/division](#optionsdivision)             | division options       |
| [/options/partner](#optionspartner)               | partner options        |
| [/options/company](#optionscompany)               | company options        |
| [/options/major_sku_type](#optionsmajor_sku_type) | major_sku_type options |
| [/options/major_sku](#optionsmajor_sku)           | major_sku options      |
| [/options/document_type](#optionsdocument_type)   | document_type options  |
| [/options/document](#optionsdocument)             | document options       |
| [/options/partner_level](#optionspartner_level)   | partner_level options  |
| [/options/router_scy](#optionsrouter_scy)         | router_scy options     |
| [/options/db_scy](#optionsdb_scy)                 | db_scy options         |

## all

### /options/all

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": {
		"staff": [
			{
				"val": "ObjectId",
				"opt": "string"
			}
		],
		"division": [
			{
				"val": "ObjectId",
				"opt": "string"
			}
		],
		"partner": [
			{
				"val": "ObjectId",
				"opt": "string"
			}
		],
		"company": [
			{
				"val": "ObjectId",
				"opt": "string"
			}
		],
		"major_sku_type": [
			{
				"val": "ObjectId",
				"opt": "string"
			}
		],
		"major_sku": [
			{
				"val": "ObjectId",
				"opt": "string"
			}
		],
		"document_type": [
			{
				"val": "ObjectId",
				"opt": "string"
			}
		],
		"document": [
			{
				"val": "ObjectId",
				"opt": "string"
			}
		],
		"partner_level": [
			{
				"val": "ObjectId",
				"opt": "string"
			}
		],
		"router_scy": [
			{
				"val": "ObjectId",
				"opt": "string"
			}
		],
		"db_scy": [
			{
				"val": "ObjectId",
				"opt": "string"
			}
		]
	}
}
```

## staff

### /options/staff

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": [
		{
			"val": "ObjectId",
			"opt": "string"
		}
	],

	"_comment_val": "staff _id",
	"_comment_val": "staff name"
}
```

## division

### /options/division

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": [
		{
			"val": "ObjectId",
			"opt": "string"
		}
	],

	"_comment_val": "division _id",
	"_comment_val": "division name"
}
```

## partner

### /options/partner

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": [
		{
			"val": "ObjectId",
			"opt": "string"
		}
	],

	"_comment_val": "partner _id",
	"_comment_val": "partner name"
}
```

## company

### /options/company

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": [
		{
			"val": "ObjectId",
			"opt": "string"
		}
	],

	"_comment_val": "company _id",
	"_comment_val": "company name"
}
```

## major_sku_type

### /options/major_sku_type

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": [
		{
			"val": "ObjectId",
			"opt": "string"
		}
	],

	"_comment_val": "major_sku_type _id",
	"_comment_val": "major_sku_type name"
}
```

## major_sku

### /options/major_sku

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": [
		{
			"val": "ObjectId",
			"opt": "string"
		}
	],

	"_comment_val": "major_sku _id",
	"_comment_val": "major_sku name"
}
```

## document_type

### /options/document_type

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": [
		{
			"val": "ObjectId",
			"opt": "string"
		}
	],

	"_comment_val": "document_type _id",
	"_comment_val": "document_type name"
}
```

## document

### /options/document

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": [
		{
			"val": "ObjectId",
			"opt": "string"
		}
	],

	"_comment_val": "document _id",
	"_comment_val": "document name"
}
```

## partner_level

### /options/partner_level

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": [
		{
			"val": "ObjectId",
			"opt": "string"
		}
	],

	"_comment_val": "partner_level _id",
	"_comment_val": "partner_level name"
}
```

## router_scy

### /options/router_scy

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": [
		{
			"val": "ObjectId",
			"opt": "string"
		}
	],

	"_comment_val": "router_scy _id",
	"_comment_val": "router_scy name"
}
```

## db_scy

### /options/db_scy

request:

```json
{
	"*token": "string",
	"*tokenReq": "string"
}
```

response:

```json
{
	"list": [
		{
			"val": "ObjectId",
			"opt": "string"
		}
	],

	"_comment_val": "db_scy _id",
	"_comment_val": "db_scy name"
}
```
