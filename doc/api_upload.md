### API Log

| API      | Action       | Date      |
| -------- | ------------ | --------- |
| /upload/ | 上傳檔案 api | 2023/08/3 |

---

# log-server

-   url: https://xxxxxxx.com.tw/api/[path]
-   method: POST

| Path                                | Description |
| ----------------------------------- | ----------- |
| [/upload/[extname]](#uploadextname) | 上傳檔案    |

---

## Upload

### /upload/[extname]

request:

```json
{
	"*uploadedFile": "file",
	"*path": "string",

	"_comment_uploadFile": "上傳檔案細節，目前僅支援一個檔案上傳，副檔名僅支援 pdf ppkg",
	"_comment_path": "放置於server的位置，方便管理"
}
```

response:

```json
{
	"name": "string",
	"mimetype": "string",
	"size": "number",

	"_comment_name": "檔案名稱",
	"_comment_minetype": "媒體類型",
	"_comment_size": "檔案大小"
}
```
