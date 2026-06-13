import { useState } from 'react';
import './AdminPanel.css';
import { getUsers, getPurchases, updatePurchaseStatus } from '../utils/auth';

const fmtDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fa-IR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

const fmtPrice = (n) => (n || 0).toLocaleString('fa-IR') + ' تومان';

const STATUS_LABEL = {
  pending:   { label: 'در انتظار',   color: '#f59e0b' },
  confirmed: { label: 'تأیید شده',   color: '#22c55e' },
  rejected:  { label: 'رد شده',      color: '#ef4444' },
};

export default function AdminPanel({ onClose }) {
  const [tab,    setTab]    = useState('users');    // 'users' | 'purchases'
  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState('all');
  const [, forceUpdate] = useState(0);

  const refresh = () => forceUpdate(n => n + 1);

  const users     = getUsers().filter(u => !u.isAdmin);
  const purchases = getPurchases();

  const filteredUsers = users.filter(u =>
    u.fullName?.includes(search) || u.username?.includes(search)
  );

  const filteredPurchases = purchases.filter(p => {
    const matchStatus = statusF === 'all' || p.status === statusF;
    const matchSearch = !search || p.username?.includes(search) || p.courseName?.includes(search);
    return matchStatus && matchSearch;
  });

  const totalRevenue = purchases
    .filter(p => p.status === 'confirmed')
    .reduce((s, p) => s + (p.amount || 0), 0);

  const handleStatus = (id, status) => {
    updatePurchaseStatus(id, status);
    refresh();
  };

  return (
    <main className="ap-page" dir="rtl">
      {/* Header */}
      <div className="ap-header">
        <div>
          <h1 className="ap-title">پنل مدیریت</h1>
          <p className="ap-sub">داشبورد آکادمی برنامه‌نویسی</p>
        </div>
        <button className="ap-close-btn" onClick={onClose}>← بازگشت به سایت</button>
      </div>

      {/* Stat cards */}
      <div className="ap-stats">
        <div className="ap-stat">
          <span className="ap-stat-icon">👥</span>
          <span className="ap-stat-val">{users.length}</span>
          <span className="ap-stat-lbl">کاربران ثبت‌نام شده</span>
        </div>
        <div className="ap-stat">
          <span className="ap-stat-icon">🛒</span>
          <span className="ap-stat-val">{purchases.length}</span>
          <span className="ap-stat-lbl">کل خریدها</span>
        </div>
        <div className="ap-stat">
          <span className="ap-stat-icon">⏳</span>
          <span className="ap-stat-val">{purchases.filter(p => p.status === 'pending').length}</span>
          <span className="ap-stat-lbl">در انتظار تأیید</span>
        </div>
        <div className="ap-stat ap-stat--green">
          <span className="ap-stat-icon">💰</span>
          <span className="ap-stat-val">{fmtPrice(totalRevenue)}</span>
          <span className="ap-stat-lbl">درآمد تأیید شده</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="ap-tabs">
        <button className={`ap-tab ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>
          👥 کاربران
        </button>
        <button className={`ap-tab ${tab === 'purchases' ? 'active' : ''}`} onClick={() => setTab('purchases')}>
          🛒 خریدها و پرداخت‌ها
        </button>
      </div>

      {/* Filters */}
      <div className="ap-filters">
        <input
          className="ap-search"
          type="text"
          placeholder="جستجو بر اساس نام یا نام کاربری..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {tab === 'purchases' && (
          <select className="ap-select" value={statusF} onChange={e => setStatusF(e.target.value)}>
            <option value="all">همه وضعیت‌ها</option>
            <option value="pending">در انتظار تأیید</option>
            <option value="confirmed">تأیید شده</option>
            <option value="rejected">رد شده</option>
          </select>
        )}
      </div>

      {/* Users table */}
      {tab === 'users' && (
        <div className="ap-table-wrap">
          <table className="ap-table">
            <thead>
              <tr>
                <th>#</th>
                <th>نام کامل</th>
                <th>نام کاربری</th>
                <th>جنسیت</th>
                <th>تاریخ ثبت‌نام</th>
                <th>تعداد خرید</th>
                <th>مجموع پرداختی</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr><td colSpan="7" className="ap-empty-row">کاربری یافت نشد</td></tr>
              ) : filteredUsers.map((u, i) => {
                const uPurchases = purchases.filter(p => p.username === u.username);
                const total = uPurchases.reduce((s, p) => s + (p.amount || 0), 0);
                return (
                  <tr key={u.username}>
                    <td>{i + 1}</td>
                    <td className="ap-name">{u.fullName || '—'}</td>
                    <td><code>{u.username}</code></td>
                    <td>{u.gender === 'female' ? '👩 زن' : '👨 مرد'}</td>
                    <td>{fmtDate(u.registeredAt)}</td>
                    <td>
                      <span className="ap-badge ap-badge--blue">{uPurchases.length} خرید</span>
                    </td>
                    <td className="ap-amount">{uPurchases.length ? fmtPrice(total) : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Purchases table */}
      {tab === 'purchases' && (
        <div className="ap-table-wrap">
          <table className="ap-table">
            <thead>
              <tr>
                <th>#</th>
                <th>کاربر</th>
                <th>دوره</th>
                <th>مبلغ</th>
                <th>روش پرداخت</th>
                <th>کد پیگیری</th>
                <th>تاریخ</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.length === 0 ? (
                <tr><td colSpan="9" className="ap-empty-row">خریدی یافت نشد</td></tr>
              ) : filteredPurchases.map((p, i) => {
                const st = STATUS_LABEL[p.status] || STATUS_LABEL.pending;
                return (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td><code>{p.username}</code></td>
                    <td className="ap-course-name">{p.courseName}</td>
                    <td className="ap-amount">{fmtPrice(p.amount)}</td>
                    <td>{p.paymentMethod === 'online' ? '🔒 درگاه آنلاین' : '💳 کارت به کارت'}</td>
                    <td><code className="ap-refid">{p.refId || '—'}</code></td>
                    <td>{fmtDate(p.purchasedAt)}</td>
                    <td>
                      <span className="ap-status-badge" style={{ color: st.color, borderColor: st.color }}>
                        {st.label}
                      </span>
                    </td>
                    <td>
                      <div className="ap-actions">
                        {p.status !== 'confirmed' && (
                          <button className="ap-act ap-act--green" onClick={() => handleStatus(p.id, 'confirmed')}>
                            تأیید
                          </button>
                        )}
                        {p.status !== 'rejected' && (
                          <button className="ap-act ap-act--red" onClick={() => handleStatus(p.id, 'rejected')}>
                            رد
                          </button>
                        )}
                        {p.status !== 'pending' && (
                          <button className="ap-act ap-act--gray" onClick={() => handleStatus(p.id, 'pending')}>
                            بازگشت
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
