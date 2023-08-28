### API Log

| API   | Action             | Date       |
| ----- | ------------------ | ---------- |
| /log/ | 新增帳號操作等 api | 2023/08/22 |

---

# log-server

-   url: https://xxxxxxx.com.tw/api/[path]
-   method: POST

| Path                                       | Description |
| ------------------------------------------ | ----------- |
| [/log/login](#loglogin)                    | 登入        |
| [/log/logout](#memberlogout)               | 登出        |
| [/log/resetPassword](#memberresetpassword) | 重設密碼    |
| [/log/add](#memberadd)                     | 會員註冊    |

---

## Log

### /log/login

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

### /log/logout

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

### /log/resetPassword

request:

```json
{
	"*token": "string",
	"*tokenReq": "string",
	"*old_password": "string",
	"*new_password": "string"
}
```

response:

```json
{}
```

### /log/add

request:

```json
{
	"*account": "string",
	"*password": "string"
}
```

response:

```json
{}
```
