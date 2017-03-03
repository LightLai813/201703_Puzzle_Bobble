Git & React exercises - 泡泡龍實作
===========================
### npm
- npm init [-y]

### webpack
- **webpack-dev-server** <font color="#AAA">建立測試 server，提供瀏覽器因應檔案變動，自動刷新頁面功能</font>

    - **webpack-dev-server** <font color="#AAA">會在 localhost:8080 建立起專案的 server</font>
    - **--content-based [foldername]** <font color="#AAA">指向專案最終輸出的資料夾</font>	
    - **--inline** <font color="#AAA">自動刷新頁面，如果不加這段的話，可以改用  localhost:8080/webpack-dev-server/index.html 去瀏覽頁面，此方法是使用 iframe 方式去 reload 頁面</font>
    - **--hot** <font color="#AAA">新增/更新 modules，自動刷新頁面</font>
    - **--devtool eval** <font color="#AAA">會顯示出發生錯誤的行數與檔案名稱</font>
    - **--progress** <font color="#AAA">會顯示出打包的過程</font>
    - **--colors** <font color="#AAA">會幫 webpack 顯示的訊息加入顏色</font>
    
### babel
- **babel-loader** <font color="#AAA">使 webpack 可以透過 babel 轉譯 javascript</font>
- **babel-preset-es2015** <font color="#AAA">ES2015 轉碼規則</font>
- **babel-preset-react** <font color="#AAA">react 轉碼規則</font>
- **babel-preset-stage-0** <font color="#AAA">想實驗一些尚未成為標準的features，後面數字0-3，表示目前審議階段，數字越大越接近納入標準，如果是 4 表示已經納入標準，所以沒有 babel-preset-stage-4 這種套件</font>
- **babel-plugin-add-module-exports** <font color="#AAA">babel6 預設不再 export module.exports，此套件 延續 babel 5 的行為，在 export.default 存在時，增加 module.exports</font>
- **babel-plugin-react-html-attrs** <font color="#AAA">將 JSX 中的 HTML 屬性轉換為 React 等效項</font>

### Git
- git clone -b [branchname] url [foldername]
- git add [-A/[filename]]
- git commit -m "msg"
- git push [remote-name] [branchname]
- git fetch [remotename]
- git merge [remotename]/[branchname]

### react
