### API Log

| API          | Action                   | Date       |
| ------------ | ------------------------ | ---------- |
| /staffLog/   | staff login/logout api   | 2023/09/26 |
| /partnerLog/ | partner login/logout api | 2023/09/26 |

---

# log-server

- url: https://xxxxxxx.com.tw/api/[path]
- method: POST

| Path                                    | Description |
| --------------------------------------- | ----------- |
| [/staffLog/login](#staffloglogin)       | 登入        |
| [/staffLog/logout](#staffloglogout)     | 登出        |
| [/partnerLog/login](#partnerLoglogin)   | 登入        |
| [/partnerLog/logout](#partnerLoglogout) | 登出        |

---

## staffLog

### /staffLog/login

request:

```json
{
	"*account": "string",
	"*password": "string"
}
```

response:

```json
{
	"token": "string",

	"_comment_token": "為加密之登入時間，用以每次api請求時核對使用"
}
```

### /staffLog/logout

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",

	"_comment_tokenReq": "使用者帳號"
}
```

response:

```json
{}
```

## partnerLog

### /partnerLog/login

request:

```json
{
	"*account": "string",
	"*password": "string"
}
```

response:

```json
{
	"token": "string",

	"_comment_token": "為加密之登入時間，用以每次api請求時核對使用"
}
```

### /partnerLog/logout

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",

	"_comment_tokenReq": "使用者帳號"
}
```

response:

```json
{}
```
