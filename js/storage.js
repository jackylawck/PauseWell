/**
 * Safe Local-First Storage Engine with UUID Fallback & Sanitization
 */
const STORAGE_KEY = 'career_anchor_db_v1';
const CURRENT_SCHEMA_VERSION = 1;
const MAX_IMPORT_SIZE_BYTES = 1024 * 1024; // 1MB

const VALID_STATUSES = ['status.applied', 'status.interviewing', 'status.waiting', 'status.closed'];

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID();
    } catch (_) {
      // 容錯降級
    }
  }
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

function getInitialSeedData() {
  return {
    version: CURRENT_SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    habits: [
      { id: generateId(), key: 'default.habit.1', done: false, isCustom: false },
      { id: generateId(), key: 'default.habit.2', done: false, isCustom: false },
      { id: generateId(), key: 'default.habit.3', done: false, isCustom: false }
    ],
    jobs: [],
    interviews: []
  };
}

const StorageService = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return this.init();
      const parsed = JSON.parse(raw);
      return this.validateAndSanitize(parsed);
    } catch (err) {
      console.error('[StorageService] Read error, resetting to clean state:', err);
      return this.init();
    }
  },

  save(data) {
    try {
      data.version = CURRENT_SCHEMA_VERSION;
      data.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (err) {
      console.error('[StorageService] Save quota exceeded:', err);
      alert('儲存失敗：本機儲存空間不足。');
      return false;
    }
  },

  init() {
    const fresh = getInitialSeedData();
    this.save(fresh);
    return fresh;
  },

  validateAndSanitize(importedJson) {
    if (typeof importedJson !== 'object' || importedJson === null) {
      throw new Error('資料格式必須為 JSON 物件');
    }

    const sanitized = {
      version: CURRENT_SCHEMA_VERSION,
      updatedAt: new Date().toISOString(),
      habits: [],
      jobs: [],
      interviews: []
    };

    if (Array.isArray(importedJson.habits)) {
      sanitized.habits = importedJson.habits.slice(0, 50).map(h => ({
        id: typeof h.id === 'string' && h.id.length > 0 ? h.id.slice(0, 50) : generateId(),
        key: typeof h.key === 'string' ? h.key.slice(0, 50) : '',
        text: typeof h.text === 'string' ? h.text.slice(0, 100) : '',
        done: Boolean(h.done),
        isCustom: Boolean(h.isCustom)
      }));
    }

    if (Array.isArray(importedJson.jobs)) {
      sanitized.jobs = importedJson.jobs.slice(0, 300).map(j => {
        const rawStatus = typeof j.status === 'string' ? j.status : 'status.applied';
        const finalStatus = VALID_STATUSES.includes(rawStatus) ? rawStatus : 'status.applied';
        const hadInterview = Boolean(j.everInterviewed) || finalStatus === 'status.interviewing' || finalStatus === 'status.waiting';

        return {
          id: typeof j.id === 'string' && j.id.length > 0 ? j.id.slice(0, 50) : generateId(),
          company: typeof j.company === 'string' ? j.company.slice(0, 100) : '未命名職位',
          status: finalStatus,
          everInterviewed: hadInterview,
          followUpDate: typeof j.followUpDate === 'string' ? j.followUpDate.slice(0, 10) : '',
          notes: typeof j.notes === 'string' ? j.notes.slice(0, 200) : '',
          createdAt: typeof j.createdAt === 'string' ? j.createdAt : new Date().toISOString()
        };
      });
    }

    if (Array.isArray(importedJson.interviews)) {
      sanitized.interviews = importedJson.interviews.slice(0, 100).map(i => ({
        id: typeof i.id === 'string' && i.id.length > 0 ? i.id.slice(0, 50) : generateId(),
        title: typeof i.title === 'string' ? i.title.slice(0, 100) : '未命名面試',
        datetime: typeof i.datetime === 'string' ? i.datetime.slice(0, 25) : new Date().toISOString()
      }));
    }

    return sanitized;
  }
};
