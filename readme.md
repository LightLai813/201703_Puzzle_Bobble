Git & React exercises - 泡泡龍實作
===========================
### npm
- npm init [-y]

### webpack
- **webpack-dev-server** <font color="#AAA">建立測試 server，提供瀏覽器因應檔案變動，自動刷新頁面功能</font>
    |指令|說明|
    |---|---|
    |webpack-dev-server|會在 localhost:8080 建立起專案的 server|
    |--content-based [foldername]|指向專案最終輸出的資料夾|
    |--inline|自動刷新頁面，如果不加這段的話，可以改用  localhost:8080/webpack-dev-server/index.html 去瀏覽頁面，此方法是使用 iframe 方式去 reload 頁面|
    |--hot|新增/更新 modules，自動刷新頁面|
    |--devtool eval|會顯示出發生錯誤的行數與檔案名稱|
    |--progress|會顯示出打包的過程|
    |--colors|會幫 webpack 顯示的訊息加入顏色|
    
### babel
|套件|說明|
|---|---|
|babel-loader|使 webpack 可以透過 babel 轉譯 javascript|
|babel-preset-es2015|ES2015 轉碼規則|
|babel-preset-react|react 轉碼規則|
|babel-preset-stage-0|想實驗一些尚未成為標準的features，後面數字0-3，表示目前審議階段，數字越大越接近納入標準，如果是 4 表示已經納入標準，所以沒有 babel-preset-stage-4 這種套件|
|babel-plugin-add-module-exports|babel6 預設不再 export module.exports，此套件 延續 babel 5 的行為，在 export.default 存在時，增加 module.exports|
|babel-plugin-react-html-attrs|將 JSX 中的 HTML 屬性轉換為 React 等效項|

### Git
|指令|說明|
|---|---|
|git clone -b [branchname] url [foldername]|將線上 git 抓下來|
|git add [-A/[filename]]|將檔案放進要 commit 列表|
|git commit -m "msg"|提交 commit 附上說明|
|git log|檢視 commit 記錄|
|git push [remotename] [branchname]|將 commit push 到線上 git|
|git fetch [remotename]|抓取其他人更新部分|
|git merge [remotename]/[branchname]||

### react
