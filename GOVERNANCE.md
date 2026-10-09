# 🏛️ Architecture Governance & Regulatory Applicability Assessment
# 架構治理與法規適用性評估報告

> **System**: 安心歇 · PauseWell  
> **Classification**: Zero-Trust, Local-First, Zero Data Retention (ZDR) Client-Side Application  
> **Last Updated**: 2026-10-09  
> **Status**: Approved & Published  

---

## 1. Executive Summary / 執行摘要

### English
**PauseWell** is engineered strictly under the **Local-First** paradigm, operating with **100% Client-Side In-Memory Computing** and **Zero Data Retention (ZDR)**. The application requires no user authentication, hosts no backend servers, logs no telemetry, and transmits zero payloads over the network. 

This document provides a formal **Regulatory Applicability & Scoping Assessment** across major jurisdictions (Hong Kong SAR, European Union, Mainland China) and international standards (ISO/IEC). It explicitly delineates compliant controls and formal architectural exemptions.

### 中文
**安心歇 (PauseWell)** 嚴格依循 **Local-First (本機優先)** 架構標準構建，落實 **100% 本端記憶體運算** 與 **零資料留存 (Zero Data Retention, ZDR)** 原則。本系統毋需使用者註冊、不設後端伺服器、零遙測追蹤日誌，且完全不向外傳輸任何資料酬載。

本文件為針對主要司法管轄區（香港特別行政區、歐盟、中國內地）及國際標準（ISO/IEC）所作之正式**法規適用性與界定評估報告**，嚴謹陳述系統之合規控制措施與架構性法定豁免依據。

---

## 2. Regulatory Scoping Matrix / 法規適用與對標矩陣

| Regulation / Standard <br> 法規與標準 | Jurisdiction / Body <br> 管轄體系 | Status <br> 適用狀態 | Primary Rationale & Controls <br> 核心論據與管控措施 |
| :--- | :--- | :---: | :--- |
| **Personal Data (Privacy) Ordinance (PDPO, Cap. 486)** <br> 《個人資料（私隱）條例》 | Hong Kong SAR (PCPD) <br> 香港個人資料私隱專員公署 | **Compliant** <br> 完全符合 | Fully aligned with Data Protection Principles (DPP 1, 2, 4). Zero PII ingestion, transmission, or central storage. Local deletion executes immediately upon user command. |
| **General Data Protection Regulation (GDPR / UK GDPR)** <br> 歐盟與英國通用數據保護條例 | European Union / UK <br> 歐盟 / 英國 | **Compliant** <br> 完全符合 | Meets Article 25 (Data Protection by Design and by Default) and Article 5 (Data Minimisation). Zero cookies, zero profiling, deterministic JSON export supporting right to data portability (Art. 20). |
| **Personal Information Protection Law (PIPL)** <br> 《個人信息保護法》 | Mainland China (CAC) <br> 國家互聯網信息辦公室 | **Compliant** <br> 完全符合 | All data operations are strictly sandboxed within the user's terminal equipment. Zero cross-border transfer (CBDT) and zero cloud hosting. |
| **ISO/IEC 27001:2022 & ISO/IEC 27701:2019** <br> 資訊安全與隱私資訊管理標準 | ISO / IEC 國際標準化組織 | **Benchmarked** <br> 架構對標 | Attack surface eliminated via zero backend API. Protected by strict Content Security Policy (CSP), subresource sandboxing, and memory lifecycle hygiene (`revokeObjectURL`). |
| **EU Artificial Intelligence Act (EU AI Act)** <br> 歐盟人工智能法案 | European Union <br> 歐盟 | **Non-Applicable** <br> **架構豁免** | **Exempt by Architecture.** The application utilizes purely deterministic mathematical logic (basic percentage formulas). It contains zero machine learning, deep learning, or automated decision-making engines. Does NOT fall under High-Risk AI recruitment systems. |
| **ISO/IEC 42001:2023 (AIMS)** <br> 人工智能管理體系 | ISO / IEC 國際標準化組織 | **Principles Aligned** <br> 原則對齊 | Not deploying AI models, hence formal AIMS certification is non-applicable. However, the system actively operationalizes core ethical tenets: Algorithmic Transparency, Non-manipulation, and Unconditional Human Agency & Oversight. |

---

## 3. Detailed Applicability Rationale / 逐項治理評估論據

### 3.1. EU AI Act Exemption / 歐盟人工智能法案之豁免論證
* **Finding / 判定**: **Non-Applicable (不適用 / 架構豁免)**.
* **Legal Rationale / 法律依據**:
  * Under Article 3(1) of Regulation (EU) 2024/1689 (EU AI Act), an "AI system" is defined as a machine-based system designed to operate with varying levels of autonomy and that may exhibit adaptiveness after deployment, and that infers from inputs how to generate outputs such as predictions, content, recommendations, or decisions.
  * **PauseWell** executes strictly deterministic business logic via native JavaScript (e.g., computing conversion ratios via arithmetic division: `interviewCount / totalCount`). It employs **zero neural networks, generative AI, heuristics, or opaque algorithmic models**.
  * Consequently, the system is categorically exempt from the EU AI Act, including requirements governing high-risk employment screening systems (Annex III, point 4).

### 3.2. Data Privacy & Minimisation / 資料私隱與最小化
* **Finding / 判定**: **Fully Compliant by Design (完全符合架構原則)**.
* **HK PDPO & GDPR Controls / 管控落實**:
  * **Collection Limitation (收集限制)**: The software collects zero user identities, biometric inputs, or behavioral trackers.
  * **Zero Server Transmission (零伺服器外傳)**: Web storage APIs (`localStorage`) run strictly within the client device sandbox.
  * **Sanitization & Schema Enforcement (資料過濾與校驗)**: Imported backup payloads are strictly parsed and sanitized against whitelists (`VALID_STATUSES`), truncated (`maxlength` enforced), and immune to prototype pollution.

### 3.3. Technical Security Controls / 技術資安防禦
* **Content Security Policy (CSP)**:
  * Strict directives restrict scripts, styles, and data URI handling to self-origin (`'self'`).
  * Directives explicitly mandate `object-src 'none'`, `base-uri 'self'`, and `form-action 'none'`, neutralizing remote code injection (RCE) and cross-site scripting (XSS) threat vectors.
* **Hardware Sandbox Isolations (Permissions-Policy)**:
  * Hardware devices (`camera`, `microphone`, `geolocation`, `accelerometer`, `gyroscope`, `payment`, `usb`) are strictly denied at the HTTP header/meta layer.

---

## 4. Governance Sign-Off / 治理聲明

This architecture demonstrates that privacy and algorithmic governance can be achieved through **structural elimination of risk** rather than post-hoc compliance controls.

**Engineering Governance Team**  
*安心歇 · PauseWell Project Architecture*
