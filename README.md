# 安心歇 · PauseWell

> **歇奏之間，安心自定。純本機求職節奏與心態日誌。**  
> *A Zero-Telemetry, Local-First Career Transition Operating System & Resilience Anchor.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Data Retention](https://img.shields.io/badge/Architecture-Zero%20Data%20Retention%20(ZDR)-brightgreen.svg)](GOVERNANCE.md)
[![Privacy by Design](https://img.shields.io/badge/Privacy-GDPR%20%7C%20HK%20PDPO%20Compliant-emerald.svg)](GOVERNANCE.md)
[![Zero Dependency](https://img.shields.io/badge/Dependencies-Zero%20(Vanilla%20JS)-orange.svg)](index.html)

---

## 繁體中文說明 (Traditional Chinese)

### 項目緣起與設計哲學
「當甚麼都不順利時，就當作上天賜予的長假。安下心歇一歇，順其自然就好。」

失業與轉職期間最大的消耗往往不是面試本身，而是「生活失控感」與「慢性心理消耗」。**安心歇 (PauseWell)** 專為處於職業空窗期、待業或重整節奏的求職者設計。它融合日常習慣錨定、客觀申請漏斗追蹤與每週覆盤機制，幫助求職者從被動焦慮切換為主動微調，將空窗轉化為蓄力前行的修整期。

### 核心特性
1. **純本機與零資料留存 (Local-First & ZDR)**：所有求職記錄、筆記與習慣均 100% 於瀏覽器記憶體及 LocalStorage 運算，無伺服器、無追蹤日誌、無 Telemetry。
2. **日常生活錨點 (Daily Anchors)**：透過固定微習慣（如固定時間起床、限時求職、每日戶外活動），守住日常節奏與心理防線。
3. **申請漏斗與跟進提醒 (Pipeline & Follow-up)**：支援就地編輯、狀態篩選、防抖（Debounce）搜尋與逾期自動紅標警告，避免盲目投遞。
4. **客觀數據覆盤 (Weekly Audit)**：動態計算歷史面試轉化率，引導求職者依據客觀數據調整策略，而非陷入自我懷疑。
5. **完整雙語切換 (Bilingual Support)**：繁體中文（香港）與英文雙向無縫切換，支援原生 Date 控制項語系自適應。
6. **PWA 支援與極致資安 (PWA & Hardened Security)**：支援手機端「加入主畫面」全螢幕體驗；嚴格實施 Content Security Policy (CSP) 與硬體權限沙盒封鎖。

### 資訊安全與合規治理
本項目由架構層面落實規範對標（詳見 [`GOVERNANCE.md`](GOVERNANCE.md)）：
* **🇭🇰 香港《個人資料（私隱）條例》(PDPO)**：落實 DPP 數據保護原則，零個資外傳。
* **🇪🇺 歐盟 GDPR**：完全遵循 Article 25 (Privacy-by-Design) 與資料最小化原則，支援完整 JSON 匯出匯入（Data Portability）。
* **🇨🇳 國家網信辦《個人信息保護法》(PIPL)**：資料僅儲存於個人終端，免除跨境傳輸合規風險。
* **🤖 歐盟 AI 法案 (EU AI Act)**：架構豁免。本系統無使用黑箱機器學習演算法，純為確定性數學統計，符合人自主宰原則。
* **🔒 ISO/IEC 27001 & 27701**：透過 CSP 嚴格阻斷外洩通道，消除外部 API 攻擊面。

---

## English Documentation

### Background & Philosophy
*"When things stall, take it as a gifted vacation. Pause well, breathe, and let rhythm return."*

During career transitions, the heaviest toll often stems from perceived loss of personal control and chronic rejection fatigue rather than technical mismatch. **PauseWell** is a hardened, client-side career resilience tool engineered to dismantle operational panic. By binding daily habit anchors, a transparent application pipeline, and structured weekly audits, it restores strategic agency to the user.

### Key Capabilities
* **Local-First & Zero Data Retention (ZDR)**: 100% in-memory client computing with local persistence. No backend endpoints, zero analytical cookies, and zero cloud footprint.
* **Daily Discipline Anchors**: Establishes micro-routines (e.g., disciplined wake times, 2-hour job hunt caps, outdoor decompression) to maintain emotional stability.
* **Pipeline Management**: Features in-place edits, status whitelisting, debounced search, and automated overdue follow-up tags.
* **Audited Metric Conversion**: Computes cumulative interview conversion ratios to encourage objective tactical pivots over subjective self-blame.
* **Seamless Bilingual System**: Instant toggle between Traditional Chinese (zh-HK) and English (en-US), including native browser calendar adapters.
* **PWA & Security Hardening**: Fully installable to mobile home screens with standalone UI; hardened by strict Content Security Policy (CSP) and hardware access revocations.

### Security & Governance
Architecturally validated against regulatory frameworks (see [`GOVERNANCE.md`](GOVERNANCE.md) for full audit):
* **HK PDPO (Cap. 486)**: Compliant with Data Protection Principles; eliminates central breach vectors.
* **EU GDPR / UK GDPR**: Fully adheres to Art. 25 (Privacy by Design) and Art. 20 (Data Portability via local JSON backups).
* **China PIPL (CAC)**: Zero centralized cloud handling; exempt from cross-border data transfer assessments.
* **EU AI Act**: Architecturally exempt. Operates strictly via deterministic arithmetic without neural or predictive algorithmic intervention.
* **ISO/IEC 27001 & 27701**: Defends the client runtime through strict CSP origin isolation (`object-src 'none'`).

---

## 快速開始 / Quick Start

### 方式 A：線上直接使用 (Online Production)
訪問託管於 GitHub Pages 的線上應用：  
👉 [https://jackylawck.github.io/PauseWell/](https://jackylawck.github.io/PauseWell/)

### 方式 B：本地執行 (Local Execution)
本專案為零依賴架構，無須安裝 Node.js、npm 或建置流程：
```bash
# 1. 複製儲存庫
git clone [https://github.com/jackylawck.github.io/PauseWell.git](https://github.com/jackylawck.github.io/PauseWell.git)
cd PauseWell

# 2. 啟動本地靜態伺服器 (推薦，避免部分瀏覽器對 file:// 協議的安全限制)
python3 -m http.server 8000

# 3. 於瀏覽器開啟 http://localhost:8000

```

---

## 專案結構 / Project Structure

```text
PauseWell/
├── index.html              # 主頁面 (SEO, PWA Headers, Modals & Dialogs)
├── style.css               # 響應式排版、封面、合規標籤與自適應樣式
├── manifest.json           # PWA 應用組態與安裝清單
├── gemini-svg.svg          # 經典悠長假期看板純代碼封面 (Zero-Asset SVG)
├── PauseWell192icon.png    # PWA 桌面圖示 (192x192 簡約風格)
├── PauseWell512icon.png    # 高解析度啟動圖示與社交卡片 (512x512)
├── GOVERNANCE.md           # 國際法規與資訊安全治理適用性評估報告
├── PRIVACY_DISCLAIMER.md   # 個人資料隱私政策與免責聲明
├── LICENSE                 # MIT License
└── js/
    ├── storage.js          # 本地存儲引擎、UUID Fallback 與 Schema Sanitizer
    ├── i18n.js             # 繁英雙語辭典與動態表單語系適配引擎
    └── app.js              # 應用主流程、搜尋防抖、就地編輯與事件委託

```

---

## 授權條款 / License

本專案採用 [MIT License](https://www.google.com/search?q=LICENSE) 授權開源。歡迎自由使用、修改及推廣。
