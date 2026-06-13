const USERS_KEY     = 'auth_users';
const SESSION_KEY   = 'auth_session';
const PURCHASES_KEY = 'auth_purchases';
const ATTEMPTS_KEY  = 'login_attempts';

const MAX_ATTEMPTS   = 5;
const LOCKOUT_MS     = 15 * 60 * 1000; // 15 minutes

// ── Persistence helpers ────────────────────────────────────
const saveUsers   = (u)  => localStorage.setItem(USERS_KEY,     JSON.stringify(u));
const saveSession = (un) => localStorage.setItem(SESSION_KEY,   un);

export const getUsers     = () => JSON.parse(localStorage.getItem(USERS_KEY)     || '[]');
export const getSession   = () => localStorage.getItem(SESSION_KEY);
export const clearSession = () => localStorage.removeItem(SESSION_KEY);

export const getCurrentUser = () => {
  const un = getSession();
  if (!un) return null;
  return getUsers().find(u => u.username === un) || null;
};

// ── Input sanitization ─────────────────────────────────────
const sanitize = (s) => String(s ?? '').trim().replace(/[<>"']/g, '');

// ── Password validation ────────────────────────────────────
export const validatePassword = (password) => {
  if (!password || password.length < 8)
    return 'رمز عبور باید حداقل ۸ کاراکتر باشد.';
  if (!/[A-Z]/.test(password))
    return 'رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد.';
  if (!/[0-9]/.test(password))
    return 'رمز عبور باید حداقل یک عدد داشته باشد.';
  return null;
};

// ── Rate limiting ──────────────────────────────────────────
const _getAttempts = (username) => {
  try {
    const all = JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '{}');
    return all[username] || { count: 0, since: 0 };
  } catch { return { count: 0, since: 0 }; }
};

const _recordAttempt = (username, success) => {
  try {
    const all = JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '{}');
    if (success) {
      delete all[username];
    } else {
      const now  = Date.now();
      const prev = all[username] || { count: 0, since: now };
      const resetted = (now - prev.since) > LOCKOUT_MS;
      all[username] = { count: resetted ? 1 : prev.count + 1, since: resetted ? now : prev.since };
    }
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(all));
  } catch {}
};

// ── Auth operations ────────────────────────────────────────
export const loginUser = (username, password) => {
  const u = sanitize(username);
  const p = String(password ?? '');

  const attempts = _getAttempts(u);
  const now      = Date.now();

  if (attempts.count >= MAX_ATTEMPTS && (now - attempts.since) < LOCKOUT_MS) {
    const remaining = Math.ceil((LOCKOUT_MS - (now - attempts.since)) / 60000);
    return { ok: false, error: `حساب موقتاً قفل شده است. ${remaining} دقیقه دیگر تلاش کنید.` };
  }

  const users = getUsers();
  const match = users.find(usr => usr.username === u && usr.password === p);

  if (match) {
    _recordAttempt(u, true);
    saveSession(u);
    return { ok: true };
  }

  _recordAttempt(u, false);
  const updatedAttempts = _getAttempts(u);
  const left = MAX_ATTEMPTS - updatedAttempts.count;

  const exists = users.some(usr => usr.username === u);
  if (!exists) return { ok: false, error: 'نام کاربری یافت نشد. لطفاً ابتدا ثبت‌نام کنید.' };
  if (left > 0) return { ok: false, error: `رمز عبور اشتباه است. ${left} تلاش باقی‌مانده.` };
  return { ok: false, error: 'حساب موقتاً قفل شد. ۱۵ دقیقه دیگر تلاش کنید.' };
};

export const registerUser = (fullName, username, password, gender = 'male') => {
  const un = sanitize(username);
  const fn = sanitize(fullName);

  if (!fn)  return { ok: false, error: 'نام کامل الزامی است.' };
  if (!un)  return { ok: false, error: 'نام کاربری الزامی است.' };
  if (un.length < 3) return { ok: false, error: 'نام کاربری باید حداقل ۳ کاراکتر باشد.' };
  if (!/^[a-zA-Z0-9_]+$/.test(un))
    return { ok: false, error: 'نام کاربری فقط می‌تواند شامل حروف انگلیسی، عدد و _ باشد.' };

  const pwErr = validatePassword(password);
  if (pwErr) return { ok: false, error: pwErr };

  const users = getUsers();
  if (users.some(u => u.username === un))
    return { ok: false, error: 'این نام کاربری قبلاً استفاده شده است.' };

  saveUsers([...users, {
    fullName: fn, username: un, password, gender,
    registeredAt: new Date().toISOString(),
  }]);
  return { ok: true };
};

export const ensureAdminExists = () => {
  const users = getUsers();
  if (!users.find(u => u.isAdmin)) {
    saveUsers([...users, {
      fullName:     'غلامرضا کریمی‌پور',
      username:     'admin',
      password:     'Admin@1234',
      gender:       'male',
      registeredAt: new Date().toISOString(),
      isAdmin:      true,
    }]);
  }
};

// ── Purchases ──────────────────────────────────────────────
export const getPurchases = () => JSON.parse(localStorage.getItem(PURCHASES_KEY) || '[]');

export const savePurchase = (data) => {
  const purchases = getPurchases();
  const p = {
    id:          Date.now().toString(),
    ...data,
    status:      data.paymentMethod === 'online' ? 'confirmed' : 'pending',
    purchasedAt: new Date().toISOString(),
  };
  localStorage.setItem(PURCHASES_KEY, JSON.stringify([...purchases, p]));
  return p;
};

export const getUserPurchases = (username) =>
  getPurchases().filter(p => p.username === username);

export const updatePurchaseStatus = (id, status) => {
  const updated = getPurchases().map(p => p.id === id ? { ...p, status } : p);
  localStorage.setItem(PURCHASES_KEY, JSON.stringify(updated));
};
