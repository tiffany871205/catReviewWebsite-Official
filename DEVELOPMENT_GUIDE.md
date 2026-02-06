---
title: 喵皇御膳房 - 開發規範文件
---

# 喵皇御膳房 - 開發規範文件

> 一個致力於成為「選品有依據、購買有信心」的貓咪食品資料整合平台

---

## 一、專案簡介

### 1.1 使用技術

**前端框架**：React + Vite  
**後端技術**：json-server（開發階段使用）  
**部署平台**：GitHub Pages  
**CSS 技術**：Bootstrap 5 + SCSS

### 1.2 主要使用套件

- **Bootstrap 5** - UI 框架
- **Axios** - HTTP 請求
- **React Quill** - 富文本編輯器
- **React Router** - 路由管理
- **sass-embedded** - SCSS 編譯

### 1.3 主要頁面

| 頁面     | 路由         | 說明               |
| -------- | ------------ | ------------------ |
| 首頁     | `/`          | 網站首頁           |
| 膳食探索 | `/food`      | 貓食產品列表與篩選 |
| 喵皇學堂 | `/knowledge` | 知識文章專區       |
| 我要投稿 | `/contrib`   | 使用者投稿功能     |
| 會員中心 | `/member`    | 會員個人資料與收藏 |

---

## 二、基礎環境建置流程

### 2.1 建立 Vite + React 專案

```bash
# 可先使用 cd 到想要建立的地方
npm create vite@latest
# 選擇 React → JavaScript → 暫不安裝 npm
```

### 2.2 安裝依賴套件

```bash
# 進入專案資料夾
cd your-project-name

# 安裝基本依賴
npm install

# 安裝 SCSS 支援
npm add -D sass-embedded

# 安裝 Bootstrap
npm install bootstrap

# 安裝 Axios
npm install axios

# 安裝其他套件（依需求）
npm install react-router-dom react-quill
```

### 2.3 設定 SCSS

1. **建立 SCSS 檔案結構**

```
src/
└── assets/
    └── scss/
        ├── helpers/
        │   ├── _variables.scss
        │   └── _utils.scss
        ├── base/
        │   ├── _reset.scss
        │   └── _base.scss
        ├── components/
        ├── layout/
        │   ├── _header.scss
        │   └── _footer.scss
        ├── pages/
        └── all.scss
```

2. **複製 Bootstrap 變數檔案**
   - 從 `node_modules/bootstrap/scss/` 複製 `_variables.scss` 和 `_variables-dark.scss` 到 `src/assets/scss/`

3. **在 `all.scss` 引入**

```scss
// Bootstrap Functions
@import "bootstrap/scss/functions";

// 自訂變數（覆蓋 Bootstrap 預設值）
@import "./variables";
@import "./variables-dark";

// Bootstrap 核心
@import "bootstrap/scss/bootstrap";

// 自訂樣式
@import "./helpers/utils";
@import "./base/reset";
@import "./base/base";
@import "./layout/header";
@import "./layout/footer";
// ... 其他樣式
```

4. **在 `main.jsx` 引入 SCSS**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/scss/all.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 2.4 設定 GitHub Pages 部署

1. **修改 `vite.config.js`**

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/catReviewWebsite-Official/", // GitHub repo 名稱
});
```

2. **在 `package.json` 加入部署指令**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "vite build && gh-pages -d dist"
  }
}
```

3. **安裝 gh-pages**

```bash
npm install --save-dev gh-pages
```

4. **初始化 Git 並推送**

```bash
git init
git remote add origin https://github.com/你的帳號/catReviewWebsite-Official.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

5. **部署到 GitHub Pages**

```bash
# 編譯專案
npm run build

# 部署
npm run deploy
```

---

## 三、專案結構說明

### 3.1 完整目錄結構

```
catReviewWebsite-Official/
├── public/                     # 靜態資源
│   └── images/
│       ├── contrib/           # 投稿相關圖片
│       ├── food/              # 食物相關圖片
│       ├── index/             # 首頁相關圖片
│       └── knowledge/         # 知識文章相關圖片
│
├── src/
│   ├── assets/
│   │   └── scss/              # SCSS 樣式
│   │       ├── helpers/       # 變數、工具
│   │       ├── base/          # 基礎樣式
│   │       ├── components/    # 元件樣式
│   │       ├── layout/        # 佈局樣式
│   │       ├── pages/         # 頁面樣式
│   │       └── all.scss       # 主要 SCSS 入口
│   │
│   ├── components/            # React 元件
│   │   ├── common/            # 共用元件
│   │   │   ├── submitBtn.jsx
│   │   │   ├── searchBar.jsx
│   │   │   └── searchBtn.jsx
│   │   ├── food/              # 食品頁面元件
│   │   │   ├── FoodListCard.jsx
│   │   │   └── FoodDetail.jsx
│   │   ├── knowledge/         # 知識頁面元件
│   │   ├── contrib/           # 投稿頁面元件
│   │   └── member/            # 會員頁面元件
│   │
│   ├── routers/                # 路由配置目錄
│   │   └── router.jsx          # 路由定義文件
│   │
│   ├── pages/                 # 頁面元件
│   │   ├── Index.jsx
│   │   ├── Food.jsx
│   │   ├── Knowledge.jsx
│   │   ├── Contrib.jsx
│   │   └── Member.jsx
│   │
│   ├── api/                   # API 請求
│   │   └── foodApi.js
│   │
│   ├── utils/                 # 工具函式
│   │   └── helpers.js
│   │
│   ├── App.jsx                # 主要應用元件
│   └── main.jsx               # 應用程式入口
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### 3.2 資料夾說明

| 資料夾             | 用途                                |
| ------------------ | ----------------------------------- |
| `public/`          | 靜態資源，不經過編譯直接複製到 dist |
| `src/assets/scss/` | SCSS 樣式檔案                       |
| `src/components/`  | 可重複使用的 React 元件             |
| `src/pages/`       | 頁面級別的元件                      |
| `src/api/`         | API 請求相關函式                    |
| `src/utils/`       | 工具函式                            |

---

## 四、程式碼風格規範

### 4.1 Prettier 設定

安裝 VSCode 套件 **Prettier** 並在 `settings.json` 加入以下設定：

```json
{
  // Prettier 設定
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "prettier.semi": true,
  "prettier.singleQuote": false,
  "prettier.tabWidth": 2,
  "prettier.trailingComma": "es5",
  "prettier.printWidth": 100,
  "prettier.arrowParens": "always"
}
```

### 4.2 檔案命名規範

#### a. React 元件命名

**大駝峰命名法 (PascalCase)**

- 頁面元件：`Index.jsx`, `Food.jsx`, `Knowledge.jsx`
- 功能元件：`FoodListCard.jsx`, `FoodDetail.jsx`

```jsx
// ✅ 正確
FoodListCard.jsx;
KnowledgeArticle.jsx;

// ❌ 錯誤
foodListCard.jsx;
food - list - card.jsx;
```

#### b. 共用元件命名

**小駝峰命名法 (camelCase)**  
依照**功能**命名

```jsx
// ✅ 正確
submitBtn.jsx;
searchBar.jsx;
searchBtn.jsx;

// ❌ 錯誤
SubmitBtn.jsx;
submit - btn.jsx;
```

#### c. JavaScript/工具檔案命名

**小駝峰命名法 (camelCase)**

```javascript
// ✅ 正確
foodApi.js;
helpers.js;
formValidation.js;

// ❌ 錯誤
FoodApi.js;
food - api.js;
```

#### d. SCSS 檔案命名

**烤肉串命名法 (kebab-case)** + 底線開頭（partial 檔案）

```scss
// ✅ 正確
_food-list.scss
_search-bar.scss
_member-card.scss

// ❌ 錯誤
foodList.scss
_FoodList.scss
```

### 4.3 元件撰寫規範

#### 命名原則

- **頁面所屬元件**：以頁面為開頭
  - 例如：`FoodListCard`, `FoodDetail`
- **共用元件**：以功能為主
  - 例如：`submitBtn`, `searchBar`

#### 元件範例

```jsx
// FoodListCard.jsx
import React from "react";
import "./FoodListCard.scss";

const FoodListCard = ({ title, price, image }) => {
  return (
    <div className="food-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p className="price">${price}</p>
    </div>
  );
};

export default FoodListCard;
```

---

## 五、開發流程

### 5.1 Git 分支策略

```
main                    # 正式環境（最終版本）
│
├── gh-pages           # GitHub Pages 部署分支
│
├── dev                # 開發測試分支
│   │
│   ├── feature-index      # 首頁功能
│   ├── feature-food       # 食品頁面功能
│   ├── feature-knowledge  # 專欄頁面功能
│   ├── feature-contrib    # 投稿頁面功能
│   └── feature-member     # 會員頁面功能
```

### 5.2 開發流程

```bash
# 1. 從 dev 分支開新分支
git checkout dev
git pull origin dev
git checkout -b feature-food

# 2. 開發功能
# 撰寫程式碼...

# 3. 提交變更（建議一個功能就 commit 一次）
git add .
git commit -m "feat: 新增食品列表篩選功能"

# 4. 推送到自己的分支
git push origin feature-food

# 5. 在 GitHub 發起 Pull Request
# 從 feature-food → dev

# 6. 通知團隊成員審核（在 Discord 通知）

# 7. 審核通過後 merge 到 dev
```

### 5.3 Commit Message 規範

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範：

```
<type>: <subject>

[optional body]
```

#### Type 類型

| Type       | 說明                         | 範例                          |
| ---------- | ---------------------------- | ----------------------------- |
| `feat`     | 新增功能                     | `feat: 新增食品篩選功能`      |
| `fix`      | 修復 Bug                     | `fix: 修復搜尋欄位驗證問題`   |
| `docs`     | 文件更新                     | `docs: 更新 README 安裝說明`  |
| `style`    | 程式碼格式調整（不影響邏輯） | `style: 調整縮排和空格`       |
| `refactor` | 重構程式碼                   | `refactor: 優化 API 請求邏輯` |
| `test`     | 測試相關                     | `test: 新增食品卡片單元測試`  |
| `chore`    | 雜項工作                     | `chore: 更新依賴套件版本`     |
| `build`    | 建置相關                     | `build: 修改 vite 設定`       |
| `perf`     | 效能優化                     | `perf: 優化圖片載入速度`      |
| `revert`   | 回退提交                     | `revert: 回退上次的重構`      |

#### 範例

```bash
# ✅ 好的 commit message
git commit -m "feat: 新增會員收藏功能"
git commit -m "fix: 修復食品詳情頁圖片顯示錯誤"
git commit -m "docs: 更新開發規範文件"

# ❌ 不好的 commit message
git commit -m "update"
git commit -m "修改"
git commit -m "123"
```

---

## 六、其他規範

### 6.1 Import 順序

#### main.jsx

```jsx
// 1. React 相關方法
import React from "react";
import ReactDOM from "react-dom/client";

// 2. 第三方套件
import { BrowserRouter } from "react-router-dom";

// 3. 元件引入
import App from "./App.jsx";

// 4. 樣式引入
import "./assets/scss/all.scss";

// 5. 其他資源
```

#### 元件檔案 (.jsx)

```jsx
// 1. React 相關
import React, { useState, useEffect } from "react";

// 2. 第三方套件
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 3. API 引入
import { getFoodList } from "../api/foodApi";

// 4. 元件引入
import FoodListCard from "../components/food/FoodListCard";
import searchBar from "../components/common/searchBar";

// 5. 樣式引入
import "./Food.scss";

// 6. 資料/常數引入
import { FOOD_CATEGORIES } from "../data/constants";
```

#### all.scss

```scss
// 1. 變數、通用樣式
@import "bootstrap/scss/functions";
@import "./variables";
@import "./variables-dark";

// 2. 第三方套件
@import "bootstrap/scss/bootstrap";

// 3. 基礎樣式
@import "./helpers/utils";
@import "./base/reset";
@import "./base/base";

// 4. 佈局元件
@import "./layout/header";
@import "./layout/footer";

// 5. 共用元件
@import "./components/search-bar";
@import "./components/button";

// 6. 頁面樣式
@import "./pages/index";
@import "./pages/food";
@import "./pages/knowledge";
```

### 6.2 開發注意事項

#### 1. 圖片資源

- 圖片放在 `public/images/` 下
- 使用相對路徑引入：`/images/food/product1.jpg`
- 記得壓縮圖片以提升載入速度

#### 2. API 請求

```jsx
// api/foodApi.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getFoodList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/foods`);
    return response.data;
  } catch (error) {
    console.error("獲取食品列表失敗:", error);
    throw error;
  }
};
```

#### 3. 環境變數

- 建立 `.env` 檔案（不要提交到 Git）
- 使用 `VITE_` 前綴

```env
VITE_API_BASE_URL=http://localhost:3000
```

```jsx
// 使用環境變數
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### 3. 啟動 JSON server 終端指令

使用 `npx json-server-auth db.json` 來 JSON server

**版本跟說明**

本專案使用 `json-server@0.17.1` 和 `json-server-auth@2.1.0`。

依照目前官方 [json-server-auth](https://github.com/jeremyben/json-server-auth) 的安裝（`npm install -D json-server json-server-auth`），在預設上 json-server 會去安裝最新的版本（目前是 1.0.0-beta.3），這個新版本的核心架構已經拔除原先的 Node Express。

而 json-server-auth 已經有四年沒有更新，當初這個套件是基於 json-server v0.17.x 搭配 Express 的核心架構來製作的，所以目前會跟移除 Express 的 json-server v1.x 版本不相容。

---

---

### 4.Mock API 資料使用規範（json-server / json-server-auth）

本專案使用 **json-server / json-server-auth** 作為假 API 進行前後端開發與測試，資料檔案請依照以下規範使用。

---

### 📄 資料檔案說明（專案根目錄）

```
/
├─ db.json        # 個人本機測試用（不納入版控）
├─ db.seed.json   # 專案共用示範資料（納入版控）
```

---

### `db.json`（個人使用）

- 僅供 **個人本機測試**
- 可自由新增 / 修改 / 刪除資料
- 每位開發者內容皆不同
- **不納入 Git 版控**

📌 請自行由 `db.seed.json` 複製一份建立：

```bash
cp db.seed.json db.json
```

---

### `db.seed.json`（共用資料）

- 為 **專案共用的示範資料**
- 用來呈現：
  - 使用者資料
  - 功能關聯（如留言、文章、關聯 ID）
  - API 測試範例狀態
- **納入 Git 版控**
- 用於讓所有人能在相同資料狀態下開發與測試

📌 請勿直接將個人測試用的 `db.json` 整份覆蓋到 `db.seed.json`。

---

### 🛠 更新 `db.seed.json` 的建議流程

1. 於本機 `db.json` 中進行功能測試（例如留言、關聯操作）
2. 確認哪些資料具有代表性或教學價值
3. **手動整理、重建資料**
4. 再更新至 `db.seed.json`

👉 請確保 `db.seed.json` 保持乾淨、結構清楚、資料數量適中。

---

### 🚫 注意事項

- 請勿在 PR 中提交 `db.json`
- 請勿將測試過程中產生的大量資料直接提交至 `db.seed.json`
- `db.seed.json` 僅作為 **示範與重現狀態使用**

---

### 📌 Git 設定建議

請於 `.gitignore` 中加入：

```
db.json
```
