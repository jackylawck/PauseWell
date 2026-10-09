/**
 * Lightweight Enterprise i18n Engine
 */
const I18N_STORAGE_KEY = 'career_anchor_lang';
const FALLBACK_LANG = 'zh-HK';

const dictionaries = {
  'zh-HK': {
    'app.title': '安心歇 · PauseWell',
    'app.subtitle': '歇奏之間，安心自定。100% 本端記憶體運算，零日誌留存 (ZDR)。',
    'app.motto': '「當甚麼都不順利時，就當作上天賜予的長假。安下心歇一歇，順其自然就好。」',
    'btn.export': '備份 (JSON)',
    'btn.import': '匯入備份',
    'btn.review': '每週覆盤與數據',
    'btn.guide': '📖 使用指引',
    'btn.compliance': '🛡️ 合規架構',
    'btn.edit': '編輯',
    'btn.delete': '刪除',
    'lang.label': 'English',

    'section.habits': '生活規律與守則 (日常錨點)',
    'input.habit.ph': '輸入遵守習慣（例：08:30 起床）',
    'btn.add': '新增',
    'habits.empty': '尚未設定錨點，從小事開始找回秩序。',

    'section.jobs': '申請進度與跟進',
    'filter.search.ph': '搜尋公司或備註...',
    'filter.status.all': '全部狀態',
    'input.company.ph': '公司名稱及應徵職位',
    'input.followup.ph': '預計跟進日期',
    'input.notes.ph': '行動筆記（今天具體完成了甚麼）',
    'btn.submit.job': '記錄申請',
    'jobs.empty': '暫無申請記錄',
    'status.applied': '已投遞',
    'status.interviewing': '面試中',
    'status.waiting': '等待結果',
    'status.closed': '已完結',
    'badge.overdue': '逾期未跟進',

    'section.interviews': '面試與關鍵日程',
    'input.interview.ph': '事項（例：ABC 公司 First Round）',
    'btn.submit.interview': '加入日程',
    'interviews.empty': '暫無面試日程',

    'default.habit.1': '每日 08:30 起床，維持作息錨點',
    'default.habit.2': '專注求職與技能整理不超過 2 小時',
    'default.habit.3': '下午戶外散步或運動 30 分鐘',

    'edit.title': '編輯求職記錄',
    'label.company': '公司及職位',
    'label.status': '目前狀態',
    'label.followup': '跟進日期',
    'label.notes': '覆盤心得',
    'btn.cancel': '取消',
    'btn.save': '儲存更新',

    'review.title': '求職轉換漏斗與每週覆盤',
    'review.intro': '依據客觀數據審視求職漏斗，將無力感轉為可微調的求職策略：',
    'stat.total': '總投遞數',
    'stat.interview_rate': '面試轉化率',
    'stat.overdue': '待跟進逾期',
    'review.q1': '1. 本週我主動完成了哪些在「個人掌控範圍內」的事？',
    'review.q2': '2. 若投遞轉換率不如預期，是 CV 對齊問題，還是需要轉向人脈推薦？',
    'btn.close': '關閉',
    'confirm.import': '匯入備份將會覆蓋當前的所有資料，確定要繼續嗎？',

    'guide.title': '安心歇 · 上手與心理使用指引',
    'guide.intro': '三步重拾日常秩序，在人生間奏中穩步調音：',
    'guide.s1.title': '1. 定下日常錨點',
    'guide.s1.desc': '在左欄建立固定作息（例：08:30 起床、散步 30 分鐘）。在不確定中守住微小的控制感。',
    'guide.s2.title': '2. 節制且結構化地投遞',
    'guide.s2.desc': '每日求職不超過 2 小時。投遞後記錄公司與「跟進日期」，隨時可編輯，避免漏失或盲目海投。',
    'guide.s3.title': '3. 每週覆盤與策略微調',
    'guide.s3.desc': '點擊「每週覆盤」檢視面試轉換率與逾期狀況。用客觀專案管理思維代替自責。',

    'compliance.title': '資訊安全與隱私合規聲明 (Privacy & Governance)',
    'compliance.intro': '本應用以「以人為本、隱私第一」為核心，符合中外嚴格治理標準：',
    'comp.pdpo': '符合香港 PDPO 數據保護原則。100% 本端記憶體運算，無伺服器留存 (ZDR)，徹底阻斷個資洩漏。',
    'comp.gdpr': '遵循 GDPR 第 25 條 (Privacy-by-Design)。無 Cookie 追蹤、無遙測，支援標準 JSON 本端可攜性。',
    'comp.ai': '符合 EU AI Act 治理精神。不設黑箱演算法推薦，數據透明可解釋，落實「人自主宰 (Human-in-the-Loop)」。',
    'comp.iso': '對標 ISO/IEC 27001 與 ISO/IEC 27701。以嚴格 CSP 沙盒保護，斷網環境下亦能安全運行。'
  },

  'en': {
    'app.title': 'PauseWell · 安心歇',
    'app.subtitle': 'Reclaim personal rhythm in the interlude. 100% Client-side, Zero Data Retention.',
    'app.motto': '"When things stall, take it as a gifted vacation. Pause well, breathe, and let rhythm return."',
    'btn.export': 'Export JSON',
    'btn.import': 'Import JSON',
    'btn.review': 'Weekly Review & Stats',
    'btn.guide': '📖 Guide',
    'btn.compliance': '🛡️ Compliance',
    'btn.edit': 'Edit',
    'btn.delete': 'Delete',
    'lang.label': '繁體中文',

    'section.habits': 'Daily Anchors & Discipline',
    'input.habit.ph': 'Add anchor routine (e.g., Wake up at 08:30)',
    'btn.add': 'Add',
    'habits.empty': 'No daily anchors set. Start small to anchor routine.',

    'section.jobs': 'Application Pipeline & Follow-up',
    'filter.search.ph': 'Search company or notes...',
    'filter.status.all': 'All Statuses',
    'input.company.ph': 'Company & Target Role',
    'input.followup.ph': 'Follow-up Date',
    'input.notes.ph': 'Reflection / Concrete actions taken',
    'btn.submit.job': 'Log Application',
    'jobs.empty': 'No applications tracked yet',
    'status.applied': 'Applied',
    'status.interviewing': 'Interviewing',
    'status.waiting': 'Awaiting Result',
    'status.closed': 'Closed',
    'badge.overdue': 'Follow-up Overdue',

    'section.interviews': 'Interviews & Key Dates',
    'input.interview.ph': 'Event (e.g., ABC Ltd - 1st Round)',
    'btn.submit.interview': 'Add to Schedule',
    'interviews.empty': 'No upcoming interviews',

    'default.habit.1': 'Wake up at 08:30 AM to anchor daily rhythm',
    'default.habit.2': 'Cap active job hunt prep at 2 hours max',
    'default.habit.3': 'Take a 30-minute outdoor walk or exercise',

    'edit.title': 'Edit Application Record',
    'label.company': 'Company & Role',
    'label.status': 'Current Status',
    'label.followup': 'Follow-up Date',
    'label.notes': 'Action Reflection',
    'btn.cancel': 'Cancel',
    'btn.save': 'Save Changes',

    'review.title': 'Conversion Funnel & Weekly Audit',
    'review.intro': 'Review objective metrics to shift focus from rejection fatigue to actionable strategy:',
    'stat.total': 'Total Applied',
    'stat.interview_rate': 'Interview Rate',
    'stat.overdue': 'Overdue Follow-ups',
    'review.q1': '1. What high-control actions did I successfully execute this week?',
    'review.q2': '2. If pipeline conversion stalled, do I need resume refactoring or warm referrals?',
    'btn.close': 'Close',
    'confirm.import': 'Importing this backup will overwrite all current local data. Continue?',

    'guide.title': 'PauseWell · Onboarding & Resilience Guide',
    'guide.intro': 'Three steps to restore daily rhythm and reclaim agency in the interlude:',
    'guide.s1.title': '1. Establish Daily Anchors',
    'guide.s1.desc': 'Set steady routines on the left (e.g., wake at 08:30, walk 30 mins). Micro-habits rebuild personal control.',
    'guide.s2.title': '2. Structured Application Tracking',
    'guide.s2.desc': 'Cap job hunt prep at 2 hrs daily. Log applications with follow-up dates to prevent cold-application burnout.',
    'guide.s3.title': '3. Weekly Strategy Audit',
    'guide.s3.desc': 'Open "Weekly Review" to monitor conversion metrics and overdue items. Turn anxiety into actionable tactics.',

    'compliance.title': 'Information Security & Privacy Governance Statement',
    'compliance.intro': 'Designed with strict privacy-by-design standards to ensure uncompromising security:',
    'comp.pdpo': 'Aligned with HK PDPO DPP Principles. 100% In-Memory computing, zero logs, zero cloud leakage.',
    'comp.gdpr': 'Strictly compliant with GDPR Art. 25 (Privacy-by-Design). Zero telemetry, full local data portability.',
    'comp.ai': 'Aligned with EU AI Act & Ethical Frameworks. Free of opaque algorithms; preserves full human agency.',
    'comp.iso': 'Benchmarked against ISO/IEC 27001 & 27701. Hardened by strict CSP sandbox, fully operational offline.'
  }
};

const storedLang = localStorage.getItem(I18N_STORAGE_KEY);
let currentLang = dictionaries[storedLang] ? storedLang : 
  (navigator.language && navigator.language.startsWith('zh') ? 'zh-HK' : 'en');

function t(key, params = {}) {
  let template = dictionaries[currentLang]?.[key] || dictionaries[FALLBACK_LANG]?.[key] || key;
  return template.replace(/\{(\w+)\}/g, (_, k) => params[k] !== undefined ? params[k] : `{${k}}`);
}

function setLanguage(lang) {
  if (!dictionaries[lang]) return;
  currentLang = lang;
  localStorage.setItem(I18N_STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  applyTranslations();
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function toggleLanguage() {
  setLanguage(currentLang === 'zh-HK' ? 'en' : 'zh-HK');
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const rawMappings = el.getAttribute('data-i18n-attr').split(',');
    rawMappings.forEach(mapping => {
      const [attr, key] = mapping.split(':').map(s => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });

  document.title = t('app.title');

  const toggleBtn = document.getElementById('btnLangToggle');
  if (toggleBtn) toggleBtn.textContent = t('lang.label');
}
