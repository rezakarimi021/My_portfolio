import { useState } from 'react';
import './AdminStatsBar.css';
import { getUsers, getPurchases } from '../utils/auth';

const STATS_KEY  = 'site_stats';
const UNIT_PRICE = 590_000;

const loadManual = () => {
  try { return JSON.parse(localStorage.getItem(STATS_KEY) || '{}'); }
  catch { return {}; }
};
const saveManual = (obj) => localStorage.setItem(STATS_KEY, JSON.stringify(obj));

const fa       = (n) => Number(n).toLocaleString('fa-IR');
const currency = (n) => fa(n) + ' تومان';
const pct      = (a, b) => b > 0 ? ((a / b) * 100).toFixed(1) : '۰.۰';

function EditableCell({ value, field, manual, setManual, unit = '' }) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState('');

  const commit = (raw) => {
    const n = parseInt(raw, 10);
    const next = { ...manual, [field]: isNaN(n) ? 0 : n };
    setManual(next);
    saveManual(next);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        className="asb-input"
        autoFocus
        type="number"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={e  => commit(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter')  commit(draft);
          if (e.key === 'Escape') setEditing(false);
        }}
      />
    );
  }
  return (
    <button
      className="asb-editable"
      onClick={() => { setEditing(true); setDraft(String(value)); }}
      title="کلیک برای ویرایش"
    >
      {fa(value)}{unit && <span className="asb-unit"> {unit}</span>}
      <span className="asb-pencil">✏</span>
    </button>
  );
}

function BarRow({ label, count, total, color }) {
  const w = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="asb-bar-row">
      <span className="asb-bar-label">{label}</span>
      <div className="asb-bar-track">
        <div className="asb-bar-fill" style={{ width: `${w}%`, background: color }} />
      </div>
      <span className="asb-bar-count">{fa(count)}</span>
      <span className="asb-bar-pct">({pct(count, total)}٪)</span>
    </div>
  );
}

export default function AdminStatsBar() {
  const [open,   setOpen]   = useState(false);
  const [manual, setManual] = useState(loadManual);

  // ── Auto-calculated ────────────────────────────────────────
  const allUsers   = getUsers();
  const regUsers   = allUsers.filter(u => !u.isAdmin);
  const purchases  = getPurchases();
  const confirmed  = purchases.filter(p => p.status === 'confirmed');
  const pending    = purchases.filter(p => p.status === 'pending');
  const rejected   = purchases.filter(p => p.status === 'rejected');

  const confRevenue  = confirmed.reduce((s, p) => s + (p.amount || UNIT_PRICE), 0);
  const pendRevenue  = pending.reduce((s, p)   => s + (p.amount || UNIT_PRICE), 0);
  const avgOrder     = confirmed.length > 0 ? Math.round(confRevenue / confirmed.length) : 0;
  const uniqueBuyers = new Set(confirmed.map(p => p.username)).size;
  const conversion   = pct(uniqueBuyers, regUsers.length);
  const revPerUser   = regUsers.length > 0 ? Math.round(confRevenue / regUsers.length) : 0;

  const now       = new Date();
  const newThisMo = regUsers.filter(u => {
    const d = new Date(u.registeredAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  // ── Manual fields ──────────────────────────────────────────
  const visitors   = manual.visitors    ?? 0;
  const pageViews  = manual.pageViews   ?? 0;
  const activeUsr  = manual.activeUsers ?? 0;
  const bounceRate = manual.bounceRate  ?? 0;
  const avgSession = manual.avgSession  ?? 0;

  const updatedAt = new Date().toLocaleString('fa-IR', {
    hour: '2-digit', minute: '2-digit',
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <>
      {/* Backdrop */}
      {open && <div className="asb-backdrop" onClick={() => setOpen(false)} />}

      {/* Trigger button */}
      <button
        className={`asb-fab${open ? ' asb-fab--active' : ''}`}
        onClick={() => setOpen(o => !o)}
        title="داشبورد آمار سایت"
        aria-label="آمار"
      >
        <span className="asb-fab-icon">{open ? '✕' : '📊'}</span>
        {!open && <span className="asb-fab-label">آمار</span>}
      </button>

      {/* Drawer */}
      <div className={`asb-drawer${open ? ' asb-drawer--open' : ''}`} dir="rtl">
        {/* Drawer header */}
        <div className="asb-dh">
          <div>
            <h2 className="asb-dh-title">داشبورد مدیریت</h2>
            <p className="asb-dh-sub">آخرین به‌روزرسانی: {updatedAt}</p>
          </div>
          <button className="asb-close" onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="asb-scroll">

          {/* ── Section: Revenue ──────────────────────────── */}
          <section className="asb-section">
            <h3 className="asb-sh">💰 درآمد فروش دوره‌ها</h3>
            <div className="asb-kpi-row">
              <div className="asb-kpi asb-kpi--green">
                <span className="asb-kpi-val">{currency(confRevenue)}</span>
                <span className="asb-kpi-lbl">درآمد تأییدشده</span>
                <span className="asb-kpi-badge">✅ پرداخت‌شده</span>
              </div>
              <div className="asb-kpi asb-kpi--amber">
                <span className="asb-kpi-val">{currency(pendRevenue)}</span>
                <span className="asb-kpi-lbl">درآمد در انتظار</span>
                <span className="asb-kpi-badge">🕐 بررسی می‌شود</span>
              </div>
            </div>
            <div className="asb-kpi-row asb-kpi-row--3">
              <div className="asb-mini">
                <span className="asb-mini-val">{currency(avgOrder)}</span>
                <span className="asb-mini-lbl">میانگین هر سفارش</span>
              </div>
              <div className="asb-mini">
                <span className="asb-mini-val">{currency(revPerUser)}</span>
                <span className="asb-mini-lbl">درآمد به‌ازای هر کاربر</span>
              </div>
              <div className="asb-mini">
                <span className="asb-mini-val">{currency(confRevenue + pendRevenue)}</span>
                <span className="asb-mini-lbl">مجموع کل (تأیید + معلق)</span>
              </div>
            </div>
          </section>

          {/* ── Section: Sales ────────────────────────────── */}
          <section className="asb-section">
            <h3 className="asb-sh">🛒 وضعیت فروش</h3>
            <div className="asb-sale-meta">
              <span>کل خریدها: <strong>{fa(purchases.length)}</strong></span>
              <span>خریداران یکتا: <strong>{fa(uniqueBuyers)}</strong></span>
              <span>نرخ تبدیل: <strong>{conversion}٪</strong></span>
            </div>
            <div className="asb-bars">
              <BarRow label="تأییدشده"  count={confirmed.length} total={purchases.length} color="var(--asb-green)" />
              <BarRow label="در انتظار" count={pending.length}   total={purchases.length} color="var(--asb-amber)" />
              <BarRow label="ردشده"     count={rejected.length}  total={purchases.length} color="var(--asb-red)"   />
            </div>
          </section>

          {/* ── Section: Users ────────────────────────────── */}
          <section className="asb-section">
            <h3 className="asb-sh">👥 کاربران</h3>
            <div className="asb-kpi-row asb-kpi-row--3">
              <div className="asb-mini asb-mini--auto">
                <span className="asb-mini-val">{fa(regUsers.length)}</span>
                <span className="asb-mini-lbl">کل کاربران</span>
              </div>
              <div className="asb-mini asb-mini--auto">
                <span className="asb-mini-val">{fa(newThisMo)}</span>
                <span className="asb-mini-lbl">ثبت‌نام این ماه</span>
              </div>
              <div className="asb-mini asb-mini--edit">
                <EditableCell value={activeUsr} field="activeUsers" manual={manual} setManual={setManual} />
                <span className="asb-mini-lbl">کاربران آنلاین</span>
              </div>
            </div>
          </section>

          {/* ── Section: Traffic ──────────────────────────── */}
          <section className="asb-section">
            <h3 className="asb-sh">🌐 ترافیک سایت <span className="asb-manual-tag">وارد کنید</span></h3>
            <div className="asb-traffic-grid">
              <div className="asb-traffic-cell">
                <EditableCell value={visitors}   field="visitors"   manual={manual} setManual={setManual} />
                <span className="asb-traffic-lbl">بازدیدکنندگان</span>
              </div>
              <div className="asb-traffic-cell">
                <EditableCell value={pageViews}  field="pageViews"  manual={manual} setManual={setManual} />
                <span className="asb-traffic-lbl">پیج‌ویو</span>
              </div>
              <div className="asb-traffic-cell">
                <EditableCell value={bounceRate} field="bounceRate" manual={manual} setManual={setManual} unit="٪" />
                <span className="asb-traffic-lbl">نرخ خروج سریع</span>
              </div>
              <div className="asb-traffic-cell">
                <EditableCell value={avgSession} field="avgSession" manual={manual} setManual={setManual} unit="دقیقه" />
                <span className="asb-traffic-lbl">میانگین زمان بازدید</span>
              </div>
            </div>
          </section>

          <p className="asb-footer-note">
            مقادیر با آیکن ✏ قابل ویرایش هستند — روی عدد کلیک کنید.
          </p>
        </div>
      </div>
    </>
  );
}
