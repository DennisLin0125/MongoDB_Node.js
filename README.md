![example workflow](https://github.com/DennisLin0125/account/actions/workflows/node.js.yml/badge.svg)

# 專案介紹 : 網站記帳本結合MongoDB

### 環境需求 :  `Node.js` , `MongoDB`

# 測試版本

* `v18.17.0`

# 使用技術

* [express-generator](https://expressjs.com/en/starter/generator.html)
* [ejs](https://ejs.co/)

### 在 Local 端的安裝

```bash
npm i

```

### Server開啟

```bash

npm start

```

### 網站效果

* 打開瀏覽器 http://localhost:3000/account

## Folder tree

```text
account
│  .gitignore
│  app.js
│  package-lock.json
│  package.json
│  README.md
│
├─.github
│  └─workflows
│          node.js.yml
│
├─bin
│      www
│
├─config
│      config.js
│
├─data
│      db.json
│
├─db
│      db.js
│
├─models
│      AccountModels.js
│      bookmodels.js
│      MovieModels.js
│
├─public
│  ├─css
│  │      create.css
│  │      list.css
│  │      success.css
│  │
│  └─stylesheets
│          style.css
│
├─routes
│      index.js
│      users.js
│
├─test
│      db.json
│      lowdb.js
│      test.js
│
└─views
        create.ejs
        error.ejs
        index.ejs
        list.ejs
        success.ejs

```
