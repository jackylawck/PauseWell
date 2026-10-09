/**
 * Application Orchestration with Production Robustness
 */

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, s => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[s]));
}

let state = StorageService.load();
let searchQuery = '';
let filterStatus = 'ALL';
let searchTimer = null;

function saveAndRender() {
  StorageService.save(state);
  render();
}

function formatDateTime(isoString) {
  if (!isoString) return '—';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return '—';

  const formatter = new Intl.DateTimeFormat(currentLang, {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  return formatter.format(d);
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  const target = new Date(dateStr);
  if (isNaN(target.getTime())) return false;
  target.setHours(23, 59, 59, 999);
  return target < new Date();
}

function render() {
  // 1. 守則渲染
  const habitListEl = document.getElementById('habitList');
  if (state.habits.length === 0) {
    habitListEl.innerHTML = `<div class="empty-state">${t('habits.empty')}</div>`;
  } else {
    habitListEl.innerHTML = state.habits.map(h => {
      const displayText = h.isCustom ? escapeHtml(h.text || '') : t(h.key);
      return `
        <li class="item-row">
          <label class="item-label">
            <input type="checkbox" data-action="toggle-habit" data-id="${h.id}" ${h.done ? 'checked' : ''}>
            <span class="${h.done ? 'text-done' : ''}">${displayText}</span>
          </label>
          <button data-action="delete-habit" data-id="${h.id}" class="btn-icon btn-del" title="${t('btn.delete')}" aria-label="${t('btn.delete')}">✕</button>
        </li>
      `;
    }).join('');
  }

  // 2. 求職紀錄渲染
  const jobListEl = document.getElementById('jobList');
  const filteredJobs = state.jobs.filter(j => {
    const comp = (j.company || '').toLowerCase();
    const note = (j.notes || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = comp.includes(query) || note.includes(query);
    const matchesStatus = filterStatus === 'ALL' || j.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (filteredJobs.length === 0) {
    jobListEl.innerHTML = `<div class="empty-state">${t('jobs.empty')}</div>`;
  } else {
    jobListEl.innerHTML = filteredJobs.map(j => {
      const overdue = j.status !== 'status.closed' && isOverdue(j.followUpDate);
      return `
        <div class="item-row item-row-top">
          <div class="item-content">
            <div class="item-title">${escapeHtml(j.company || '')}</div>
            <div class="item-meta">
              <span class="item-badge">${t(j.status)}</span>
              ${j.followUpDate ? `<span>📅 ${escapeHtml(j.followUpDate)}</span>` : ''}
              ${overdue ? `<span class="badge-overdue">${t('badge.overdue')}</span>` : ''}
            </div>
            ${j.notes ? `<div class="item-notes">"${escapeHtml(j.notes)}"</div>` : ''}
          </div>
          <div class="item-actions">
            <button data-action="edit-job" data-id="${j.id}" class="btn-icon" title="${t('btn.edit')}" aria-label="${t('btn.edit')}">✎</button>
            <button data-action="delete-job" data-id="${j.id}" class="btn-icon btn-del" title="${t('btn.delete')}" aria-label="${t('btn.delete')}">✕</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // 3. 面試日程渲染
  const interviewListEl = document.getElementById('interviewList');
  if (state.interviews.length === 0) {
    interviewListEl.innerHTML = `<div class="empty-state">${t('interviews.empty')}</div>`;
  } else {
    interviewListEl.innerHTML = state.interviews.map(i => `
      <div class="item-row interview-card">
        <div class="item-content">
          <div class="item-title">${escapeHtml(i.title || '')}</div>
          <div class="interview-time">${formatDateTime(i.datetime)}</div>
        </div>
        <button data-action="delete-interview" data-id="${i.id}" class="btn-icon btn-del" title="${t('btn.delete')}" aria-label="${t('btn.delete')}">✕</button>
      </div>
    `).join('');
  }

  renderFunnelStats();
}

function renderFunnelStats() {
  const container = document.getElementById('funnelStats');
  if (!container) return;

  const total = state.jobs.length;
  const hadInterviews = state.jobs.filter(j => j.everInterviewed).length;
  const overdueCount = state.jobs.filter(j => j.status !== 'status.closed' && isOverdue(j.followUpDate)).length;
  const conversionRate = total > 0 ? Math.round((hadInterviews / total) * 100) : 0;

  container.innerHTML = `
    <div class="stat-cell">
      <div class="stat-num">${total}</div>
      <div class="stat-desc">${t('stat.total')}</div>
    </div>
    <div class="stat-cell">
      <div class="stat-num">${conversionRate}%</div>
      <div class="stat-desc">${t('stat.interview_rate')}</div>
    </div>
    <div class="stat-cell">
      <div class="stat-num">${overdueCount}</div>
      <div class="stat-desc">${t('stat.overdue')}</div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = currentLang;
  applyTranslations();

  // 搜尋 Debounce
  document.getElementById('jobSearchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuery = e.target.value.trim();
      render();
    }, 120);
  });

  document.getElementById('jobFilterStatus').addEventListener('change', (e) => {
    filterStatus = e.target.value;
    render();
  });

  // 習慣管理
  document.getElementById('btnAddHabit').addEventListener('click', () => {
    const input = document.getElementById('habitInput');
    const text = input.value.trim();
    if (!text) return;
    state.habits.push({ id: generateId(), text, done: false, isCustom: true });
    input.value = '';
    saveAndRender();
  });

  document.getElementById('habitList').addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const { action, id } = target.dataset;
    if (action === 'toggle-habit') {
      const item = state.habits.find(h => h.id === id);
      if (item) item.done = !item.done;
    } else if (action === 'delete-habit') {
      state.habits = state.habits.filter(h => h.id !== id);
    }
    saveAndRender();
  });

  // 申請提交
  document.getElementById('jobForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const st = document.getElementById('jobStatus').value;
    state.jobs.unshift({
      id: generateId(),
      company: document.getElementById('jobCompany').value.trim(),
      status: st,
      everInterviewed: (st === 'status.interviewing' || st === 'status.waiting'),
      followUpDate: document.getElementById('jobFollowUpDate').value,
      notes: document.getElementById('jobNotes').value.trim(),
      createdAt: new Date().toISOString()
    });
    document.getElementById('jobForm').reset();
    saveAndRender();
  });

  // 編輯與刪除
  const editModal = document.getElementById('editJobModal');
  document.getElementById('jobList').addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const { action, id } = target.dataset;

    if (action === 'delete-job') {
      state.jobs = state.jobs.filter(j => j.id !== id);
      saveAndRender();
    } else if (action === 'edit-job') {
      const job = state.jobs.find(j => j.id === id);
      if (job) {
        document.getElementById('editJobId').value = job.id;
        document.getElementById('editJobCompany').value = job.company;
        document.getElementById('editJobStatus').value = job.status;
        document.getElementById('editJobFollowUpDate').value = job.followUpDate || '';
        document.getElementById('editJobNotes').value = job.notes || '';
        editModal.showModal();
      }
    }
  });

  document.getElementById('btnCancelEdit').addEventListener('click', () => editModal.close());
  document.getElementById('editJobForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('editJobId').value;
    const job = state.jobs.find(j => j.id === id);
    if (job) {
      const newStatus = document.getElementById('editJobStatus').value;
      job.company = document.getElementById('editJobCompany').value.trim();
      job.status = newStatus;
      if (newStatus === 'status.interviewing' || newStatus === 'status.waiting') {
        job.everInterviewed = true;
      }
      job.followUpDate = document.getElementById('editJobFollowUpDate').value;
      job.notes = document.getElementById('editJobNotes').value.trim();
      job.updatedAt = new Date().toISOString();
      saveAndRender();
      editModal.close();
    }
  });

  // 面試日程提交與刪除
  document.getElementById('interviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.interviews.push({
      id: generateId(),
      title: document.getElementById('intTitle').value.trim(),
      datetime: document.getElementById('intDateTime').value
    });
    state.interviews.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    document.getElementById('interviewForm').reset();
    saveAndRender();
  });

  document.getElementById('interviewList').addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (target && target.dataset.action === 'delete-interview') {
      state.interviews = state.interviews.filter(i => i.id !== target.dataset.id);
      saveAndRender();
    }
  });

  // 覆盤 Modal
  const reviewModal = document.getElementById('reviewModal');
  document.getElementById('btnWeeklyReview').addEventListener('click', () => {
    renderFunnelStats();
    reviewModal.showModal();
  });
  document.getElementById('btnCloseModal').addEventListener('click', () => reviewModal.close());

  // 使用指引 Modal
  const guideModal = document.getElementById('guideModal');
  document.getElementById('btnGuide').addEventListener('click', () => guideModal.showModal());
  document.getElementById('btnCloseGuide').addEventListener('click', () => guideModal.close());

  // 合規架構 Modal
  const complianceModal = document.getElementById('complianceModal');
  document.getElementById('btnCompliance').addEventListener('click', () => complianceModal.showModal());
  document.getElementById('btnCloseCompliance').addEventListener('click', () => complianceModal.close());

  // 頁尾徽章點擊
  document.querySelectorAll('[data-action="open-compliance"]').forEach(el => {
    el.addEventListener('click', () => complianceModal.showModal());
  });

  // 匯出
  document.getElementById('btnExport').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pausewell_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // 匯入
  const fileImporter = document.getElementById('fileImporter');
  document.getElementById('btnImportTrigger').addEventListener('click', () => fileImporter.click());

  fileImporter.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!confirm(t('confirm.import'))) {
      fileImporter.value = '';
      return;
    }

    if (file.size > MAX_IMPORT_SIZE_BYTES) {
      alert('匯入失敗：檔案過大（上限 1MB）。');
      fileImporter.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const rawJson = JSON.parse(evt.target.result);
        const validatedData = StorageService.validateAndSanitize(rawJson);
        state = validatedData;
        
        searchQuery = '';
        filterStatus = 'ALL';
        document.getElementById('jobSearchInput').value = '';
        document.getElementById('jobFilterStatus').value = 'ALL';

        saveAndRender();
        alert('匯入成功！資料已完整還原。');
      } catch (err) {
        console.error('[Import Error]', err);
        alert('匯入失敗：JSON 格式無效或結構異常。');
      } finally {
        fileImporter.value = '';
      }
    };
    reader.readAsText(file);
  });

  // PWA 安裝攔截
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
  });

  document.getElementById('btnLangToggle').addEventListener('click', toggleLanguage);
  window.addEventListener('languageChanged', render);

  render();
});
