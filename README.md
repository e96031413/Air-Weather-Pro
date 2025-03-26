# Air Weather Pro 天氣與空氣品質查詢系統
![image](https://github.com/user-attachments/assets/38728b61-3d98-4416-9eab-422412c37bfc)

這是一個專業的天氣與空氣品質查詢網頁應用程式，提供即時天氣資訊、空氣品質指標以及未來天氣預報功能。

## 功能特色

### 即時天氣與空氣品質查詢
- 顯示當前溫度、濕度、風速等天氣資訊
- 提供 PM2.5、AQI 等空氣品質指標
- 支援未來 7 天天氣預報

### PWA 功能
- 可安裝至手機主畫面
- 支援離線瀏覽最後更新的天氣資訊
- 使用 Service Worker 進行資料快取

### 個人化功能
- 自動記憶最近查詢的 5 個城市
- 可設定預設城市
- 支援城市收藏功能

## 技術規格
- React + TypeScript
- Tailwind CSS 響應式設計
- PWA 支援
- WeatherAPI.com API 整合
- Zustand 狀態管理

## 開始使用

### 本地開發
1. 複製專案
```bash
git clone <專案網址>
```

2. 安裝依賴
```bash
npm install
```

3. 啟動開發伺服器
```bash
npm run dev
```

4. 開啟瀏覽器訪問 `http://localhost:5173`

### API 金鑰設定
1. 註冊 [WeatherAPI.com](https://www.weatherapi.com) 帳號
2. 取得免費 API 金鑰
3. 在應用程式右上角點擊「設定 API 金鑰」按鈕
4. 輸入您的 API 金鑰

## 部署至網際網路

### Netlify 部署步驟

1. 前往 [Netlify](https://www.netlify.com) 並註冊/登入帳號

2. 選擇以下其中一種部署方式：

   #### 方法一：直接部署
   1. 點擊 [Deploy to Netlify](https://app.netlify.com/start) 按鈕
   2. 選擇「從 Git 倉庫部署」
   3. 選擇您的 Git 倉庫並授權
   4. 設定部署選項：
      - 建置指令：`npm run build`
      - 發布目錄：`dist`
   5. 點擊「部署」按鈕

   #### 方法二：使用 Netlify CLI
   1. 安裝 Netlify CLI
   ```bash
   npm install -g netlify-cli
   ```

   2. 登入 Netlify
   ```bash
   netlify login
   ```

   3. 初始化專案
   ```bash
   netlify init
   ```

   4. 部署專案
   ```bash
   netlify deploy --prod
   ```

3. 部署完成後，Netlify 會自動生成一個網址供您訪問

### 自訂域名設定（選用）
1. 在 Netlify 專案設定中點擊「Domain settings」
2. 點擊「Add custom domain」
3. 輸入您的域名
4. 依照指示設定 DNS 記錄

## 注意事項
- API 金鑰請妥善保管，不要分享給他人
- 免費版 WeatherAPI.com 有每月請求次數限制
- PWA 功能需要在 HTTPS 環境下才能運作
- 建議使用最新版本的 Chrome、Firefox、Safari 瀏覽器

## 授權
MIT License
