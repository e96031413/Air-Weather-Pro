# Air Weather Pro 天氣與空氣品質查詢系統
![image](https://github.com/user-attachments/assets/dd1e814f-d488-4762-af51-2056590968a7)


這是一個專業的天氣與空氣品質查詢網頁應用程式，提供即時天氣資訊、空氣品質指標以及未來天氣預報功能。使用 React 和 TypeScript 開發，具備完整的 PWA 支援，可安裝於各種裝置使用。

## 主要功能

### 即時天氣資訊
- 顯示當前溫度、濕度、風速等氣象資料
- 提供降雨機率預報
- 支援繁體中文天氣描述
- 自動更新天氣資訊

### 空氣品質監測
- 即時 PM2.5 指數顯示
- 空氣品質等級評估（優、良好、輕度污染等）
- 視覺化的空氣品質狀態展示

### 7天天氣預報
- 每日最高溫與最低溫預測
- 降雨機率預報
- 天氣狀況圖示顯示
- 簡潔清晰的預報介面

### 個人化功能
- 自動記憶最近搜尋的 5 個城市
- 支援城市收藏功能
- 快速切換常用城市
- 記住使用者的 API 金鑰設定

### PWA 功能
- 支援離線瀏覽最後更新的天氣資訊
- 可安裝至手機主畫面，提供類似原生應用程式的體驗
- 自動更新確保應用程式始終保持最新狀態
- 優化的快取策略，提供更快的載入速度

## 技術規格

### 前端技術
- React 18 + TypeScript
- Tailwind CSS 響應式設計
- Zustand 狀態管理
- React Query 資料快取
- Vite 建構工具

### API 整合
- WeatherAPI.com 天氣資料服務
- 支援全球主要城市天氣查詢
- 即時天氣與預報資料更新

### 效能優化
- 圖片與資源優化
- 智慧快取策略
- 延遲載入非關鍵資源
- 優化的重新渲染策略

## 開始使用

### 本地開發
1. 複製專案
```bash
git clone https://github.com/e96031413/Air-Weather-Pro
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
4. 輸入您的 API 金鑰並儲存

## 部署說明

### Netlify 部署步驟

1. Fork 此專案到您的 GitHub 帳號

2. 登入 [Netlify](https://www.netlify.com)

3. 點擊 "New site from Git"

4. 選擇您的 GitHub 專案

5. 設定部署選項：
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` 或更高版本

6. 點擊 "Deploy site"

### 環境變數設定（選用）
如果您想要預設 API 金鑰，可以在 Netlify 的環境變數中設定：
- `VITE_WEATHER_API_KEY`: 您的 WeatherAPI.com API 金鑰

## 瀏覽器支援
- Chrome / Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- 支援 PWA 的行動瀏覽器

## 注意事項
- WeatherAPI.com 免費方案有每月 API 呼叫次數限制
- 建議在正式環境中使用 HTTPS 以確保資料傳輸安全
- PWA 功能需要在 HTTPS 環境下才能運作
- 部分瀏覽器可能需要手動允許位置存取權限

## 開發團隊
- 設計與開發：[您的名字/團隊名稱]
- 問題回報：請在 GitHub Issues 中提出
- 貢獻指南：歡迎提交 Pull Request

## 授權
MIT License

## 更新日誌
### 1.0.0 (2024-03)
- 初始版本發布
- 支援即時天氣查詢
- 加入空氣品質監測
- 實作 PWA 功能
- 支援城市收藏功能
