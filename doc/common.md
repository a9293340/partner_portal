## 導覽

1. [Request & Response](#request--response)
2. [Encryption](#encryption)
3. [上傳檔案規則](#上傳檔案規則)
4. [Error Code](#error-code)
5. [路徑 ＆ 權限定義](#路徑-＆-權限定義)
6. [靜態 & 動態選項定義](#靜態--動態選項定義)

## Request & Response

1. request 或 response 中的 comment 為註解，傳遞參數時不用理會
2. 有 **\*** 號為必填欄位
3. request**未加密**格式為

```json
{
	"data": {}
}
```

4. response**未加密**格式為

```json
{
	"error_code": 0,
	"data": {}
}
```

5. Request & Response 的 data 都須作**AES**加密
6. 以下 api request/response 為了方便只寫出 data 中的內容

## Encryption

### 加密方式

將 data 欄位加密
encrypt string 為 AES(JSON string).toString()

---

## 上傳檔案規則

1. 目前僅提供 ppkg 、 pdf 兩種格式上傳
2. 目前檔案大小限制為 100 mb
3. 檔案儲存路徑須依照定義規則存放，且不得任意更動

### Upload Path 定義

1. 上傳之路徑由各 Resources 中的 download_path_s 此 field 定義，每個 Resources 的此欄位皆為必填項目
2. 當用戶 download 時，會先將檔案複製到一個固定的亂碼資料夾，再提供給客戶下載使用
3. 檔案複製後，可設定固定 15 分鐘後刪除，避免資源浪費
4. 當執行 download 流程時，會先檢查此亂數資料夾內有無該文件、產品，若有則會直接提供，避免資源浪費

## Error Code

| Code                 | Description |
| -------------------- | ----------- |
| 成功                 | 0           |
| 請求路徑錯誤         | 10001       |
| 請求方法應為 POST    | 10002       |
| JSON decode failed   | 10003       |
| 請求參數不合法       | 10004       |
| token 過期           | 10005       |
| Base64 decode failed | 10006       |
| 找不到對應資料       | 10007       |
| 沒有權限的操作       | 10008       |
| 已從其他地方登入     | 10009       |
| 上傳圖片失敗         | 10010       |
| JSON encode failed   | 10011       |
| 資料重複             | 10012       |
| 找不到使用者         | 11001       |
| 密碼錯誤             | 11002       |
| 註冊帳號重複         | 11003       |
| 上傳檔案錯誤         | 20000       |
| 上傳檔案副檔名未支援 | 20001       |
| 上傳檔案副檔名錯誤   | 20002       |
| 上傳檔案失敗         | 20003       |

## 路徑 ＆ 權限定義

### 網頁 router 規劃

1. 域名 : https://partnerportal.com.tw/
2. 未登入狀況下 : 根目錄對應 => Partner 登入頁面( /partner/login )
3. 登入狀態下 : 根目錄對應 => Partner 首頁( /partner/introduce )

| Router                        | 描述                          |
| ----------------------------- | ----------------------------- |
| **/api/**                     | 後端 api 路徑                 |
| **/partnerPortal/**           | 客戶瀏覽路徑                  |
| **/backStage/**               | 總控平台                      |
| **/upload/_[extname]_**       | 下載路徑,extname: pdf、ppkg   |
| **/backStage/partnerPortal/** | Partner Portal BackStage 系統 |
| **/backStage/erp/**           | ERP 系統                      |
| **/backStage/ecommerce/**     | ECOMMERCE 系統                |
| **/backStage/powertool/**     | PowerTool 系統                |

### 後端 API

1. partner_portal api
2. partner_portal_backStage api
3. login api
4. upload api
5. options api

詳細內容請參考後端 API 文件

### 客戶瀏覽路徑規劃(/partnerPortal)

| 名稱           | 級數 | 名稱(英文)       | 屬於 | 路徑                       |
| -------------- | ---- | ---------------- | ---- | -------------------------- |
| 首頁           | 1    | Introduce        | -    | /introduce                 |
| Major SKU 列表 | 1    | Major SKU        | -    | /majorSku                  |
| Major SKU      |      | [Major SKU NAME] | -    | /majorSku/[major sku name] |

### 後台(/backStage)

| 名稱     | 級數 | 名稱(英文)     | 屬於 | 路徑 |
| -------- | ---- | -------------- | ---- | ---- |
| 總控平台 | 1    | System Control | -    | /    |

### Partner Portal 後台(/backStage/partnerPortal)

| 名稱                          | 級數 | 名稱(英文)             | 屬於                  | 路徑                                       |
| ----------------------------- | ---- | ---------------------- | --------------------- | ------------------------------------------ |
| Partner Portal BackStage 首頁 | 1    | Introduce              | -                     | /introduce                                 |
| 帳號管理                      | 1    | Account Management     | -                     | -                                          |
| 員工 group                    | 2    | Staff                  | Account Management    | -                                          |
| 員工                          | 3    | Staff List             | Staff                 | /staff                                     |
| 部門                          | 3    | Division List          | Staff                 | /division                                  |
| 員工群組                      | 3    | Staff Group            | Staff                 | /staffGroup                                |
| 夥伴 group                    | 2    | Partner                | Account Management    | -                                          |
| 夥伴                          | 3    | Partner List           | Partner               | /partner                                   |
| 夥伴層級                      | 3    | Partner Level          | Partner               | /partnerLevel                              |
| 公司                          | 3    | Company List           | Partner               | /company                                   |
| 夥伴群組                      | 3    | Partner Group          | Partner               | /partnerGroup                              |
| 安全 group                    | 2    | Security               | Account Management    | -                                          |
| 路徑安全設定                  | 3    | Router Security List   | Security              | /routerSecurity                            |
| 資料庫安全設定                | 3    | Database Security List | Security              | /databaseSecurity                          |
| 產品管理                      | 1    | Product Management     | -                     | -                                          |
| 主要產品                      | 2    | Major Sku List         | Product Management    | /majorSku                                  |
| 主要產品分類                  | 2    | Major Sku Type         | Product Management    | /majorSkuType                              |
| 資源管理 group                | 1    | Resources Management   | -                     | -                                          |
| 文件 group                    | 2    | Document               | Resources Management  | -                                          |
| 文件                          | 3    | Document List          | Document              | /document                                  |
| 文件分類                      | 3    | Document Type          | Document              | /documentType                              |
| 韌體                          | 2    | Firmware List          | Resources Management  | /firmware                                  |
| 軟體                          | 2    | Software List          | Resources Management  | /software                                  |
| Powertool3 group              | 1    | Powertool3 Management  | -                     | -                                          |
| Powertool3 參數               | 2    | Powertool3 Parameter   | Powertool3 Management | **/backStage/powertool/parameterDatabase** |
| Action Log                    | 1    | Action Log             | -                     | /actionLog                                 |

### 下載路徑(/upload)

[請參考 Upload Path 定義](#upload-path-定義)

### 登入頁面(/login)

| 名稱             | 級數 | 名稱(英文)    | 屬於 | 路徑                 |
| ---------------- | ---- | ------------- | ---- | -------------------- |
| 登入頁面(客戶端) | 1    | Partner Login | -    | /partnerPortal/login |
| 登入頁面(後台)   | 1    | Staff Login   | -    | /backStage/login     |

## 靜態 & 動態選項(options)定義

### 概述

- 靜態選項 : 較少更動，固定寫在 code 裡面，使用 local 端 json 檔案管理 ( **_若需新增/修改需透過告知 RD 處理_** )
- 動態選項 : 較常更動，綁定資料庫，需要時 call api ( **_若需新增/修改直接修改即可_** )

### 選項(options)格式

```json
{
	"val": "string" | "number",
	"opt": "string",

	"_comment_val": "動態選項(string) | 靜態選項(number)",
    "_comment_opt": "選項名稱",
}
```

### 動態選項細節

    val : 固定為動態選項所屬資料庫之 unique id(_id)
    opt : 固定為動態選項所屬資料庫之名稱(name)

下列為目前會使用到之動態選項:

1. staff
2. division
3. partner
4. company
5. major_sku_type
6. major_sku
7. document_type
8. document
9. partner_level
10. router_scy
11. db_scy

\*動態資料庫需透過向後端請求後提供

### 靜態資料庫定義

#### status 狀態

| val | opt     |
| --- | ------- |
| 0   | enable  |
| 1   | disable |

#### database function control 資料庫操作控制

| val | opt    |
| --- | ------ |
| 0   | Edit   |
| 1   | Create |
| 2   | Import |
| 3   | Export |

#### database list 資料庫列表

- 由資料庫 role 檔生成

#### router list 路徑列表

- 由路徑 role 檔生成

#### resources default action 資源操作

| val | opt                     |
| --- | ----------------------- |
| 0   | Normal                  |
| 1   | Must apply for download |
| 2   | Invisible               |

#### owner 商品歸屬

| val | opt     |
| --- | ------- |
| 0   | Non-ODM |
| 1   | SICK    |

#### action log type 活動紀錄類型

| val | opt      |
| --- | -------- |
| 0   | Edit     |
| 1   | Create   |
| 2   | Download |
| 3   | Import   |
| 4   | Export   |

#### document language 文件語言

| val | opt            |
| --- | -------------- |
| 0   | English (EN)   |
| 1   | 繁體中文 (TC)  |
| 2   | 简体中文 (SC)  |
| 3   | 日本語 (JP)    |
| 4   | 한국어 (KO)    |
| 5   | Deutsch (DE)   |
| 6   | Français (FR)  |
| 7   | Español (ES)   |
| 8   | Русский (RU)   |
| 9   | Português (PT) |
| 10  | Italiano (IT)  |
| 11  | อักษรไทย (TH)  |

#### database security filter dependence 資料庫安全管理敏感性資料判斷依據

| val | opt      |
| --- | -------- |
| 0   | 等於     |
| 1   | 大於     |
| 2   | 大於等於 |
| 3   | 小於     |
| 4   | 小於等於 |
