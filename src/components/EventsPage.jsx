import { useState } from 'react';
import './EventsPage.css';

const EVENTS = [
  { id:1, title:'وبینار رایگان: معرفی React 19', date:'۱۴۰۳/۰۴/۰۱', time:'ساعت ۲۱:۰۰', type:'webinar', seats:150, registered:127, instructor:'غلامرضا کریمی‌پور', emoji:'⚛️', gradient:'linear-gradient(135deg,#0ea5e9,#6366f1)', free:true, recorded:false },
  { id:2, title:'کارگاه عملی: ساخت اپ با Next.js', date:'۱۴۰۳/۰۴/۱۰', time:'ساعت ۲۰:۰۰', type:'workshop', seats:50, registered:48, instructor:'غلامرضا کریمی‌پور', emoji:'🔷', gradient:'linear-gradient(135deg,#6366f1,#8b5cf6)', free:false, recorded:false },
  { id:3, title:'وبینار: JavaScript Tips & Tricks', date:'۱۴۰۳/۰۴/۱۸', time:'ساعت ۲۱:۳۰', type:'webinar', seats:200, registered:89, instructor:'غلامرضا کریمی‌پور', emoji:'🟨', gradient:'linear-gradient(135deg,#f59e0b,#ef4444)', free:true, recorded:false },
];

const PAST_EVENTS = [
  { id:10, title:'وبینار: شروع با TypeScript', date:'۱۴۰۳/۰۲/۱۵', emoji:'💙', gradient:'linear-gradient(135deg,#3b82f6,#1d4ed8)', views:3200 },
  { id:11, title:'کارگاه: Node.js برای مبتدیان', date:'۱۴۰۳/۰۱/۲۵', emoji:'🟢', gradient:'linear-gradient(135deg,#10b981,#059669)', views:2800 },
  { id:12, title:'وبینار: Tailwind CSS پیشرفته', date:'۱۴۰۲/۱۲/۲۰', emoji:'🎨', gradient:'linear-gradient(135deg,#06b6d4,#0284c7)', views:1950 },
];

function EventCard({ event }) {
  const pct = Math.round((event.registered / event.seats) * 100);
  return (
    <div className="ev-card glass-card">
      <div className="ev-thumb" style={{ background: event.gradient }}>
        <span className="ev-emoji">{event.emoji}</span>
        <span className={`ev-type-badge ${event.type}`}>{event.type === 'webinar' ? 'وبینار' : 'کارگاه'}</span>
        {event.free && <span className="ev-free-badge">رایگان</span>}
      </div>
      <div className="ev-body">
        <h3 className="ev-title">{event.title}</h3>
        <div className="ev-meta">
          <span>📅 {event.date}</span>
          <span>🕐 {event.time}</span>
          <span>👤 {event.instructor}</span>
        </div>
        <div className="ev-seats">
          <div className="ev-seats-label">
            <span>{event.registered} نفر ثبت‌نام کرده</span>
            <span>{event.seats - event.registered} جای خالی</span>
          </div>
          <div className="ev-seats-bar">
            <div className="ev-seats-fill" style={{ width: `${pct}%`, background: pct > 85 ? '#ef4444' : '#10b981' }} />
          </div>
        </div>
        <button className="ev-register-btn btn-ripple">
          {event.free ? '✅ ثبت‌نام رایگان' : '💳 ثبت‌نام'}
        </button>
      </div>
    </div>
  );
}

export default function EventsPage({ onBack }) {
  const [tab, setTab] = useState('upcoming');
  return (
    <main className="ev-page" dir="rtl">
      <div className="ev-header">
        <button className="ev-back" onClick={onBack}>← بازگشت</button>
        <h1 className="ev-page-title">رویدادها و وبینارها</h1>
        <p className="ev-page-sub">وبینارهای رایگان و کارگاه‌های آموزشی لایو</p>
      </div>

      <div className="ev-content">
        <div className="ev-tabs">
          <button className={`ev-tab ${tab === 'upcoming' ? 'active' : ''}`} onClick={() => setTab('upcoming')}>رویدادهای آینده</button>
          <button className={`ev-tab ${tab === 'past' ? 'active' : ''}`} onClick={() => setTab('past')}>ضبط‌شده‌ها</button>
        </div>

        {tab === 'upcoming' && (
          <div className="ev-grid">
            {EVENTS.map(e => <EventCard key={e.id} event={e} />)}
          </div>
        )}

        {tab === 'past' && (
          <div className="ev-past-grid">
            {PAST_EVENTS.map(e => (
              <div key={e.id} className="ev-past-card glass-card">
                <div className="ev-past-thumb" style={{ background: e.gradient }}>
                  <span>{e.emoji}</span>
                </div>
                <div className="ev-past-info">
                  <h4>{e.title}</h4>
                  <p>📅 {e.date} · 👁 {e.views.toLocaleString('fa-IR')} بازدید</p>
                </div>
                <button className="ev-watch-btn">▶ تماشا</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
