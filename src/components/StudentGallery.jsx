import { useState } from 'react';
import './StudentGallery.css';

const PROJECTS = [
  { id:1, title:'فروشگاه آنلاین با React', student:'محمد احمدی', course:'React.js', tags:['React','Context','Stripe'], emoji:'🛒', gradient:'linear-gradient(135deg,#0ea5e9,#6366f1)', likes:234, demo:'#', description:'یک فروشگاه آنلاین کامل با سبد خرید، احراز هویت و پرداخت آنلاین' },
  { id:2, title:'اپ مدیریت تسک', student:'سارا رضایی', course:'TypeScript', tags:['TypeScript','React','LocalStorage'], emoji:'✅', gradient:'linear-gradient(135deg,#6366f1,#8b5cf6)', likes:189, demo:'#', description:'یک todo app کامل با drag & drop، فیلتر و ذخیره محلی' },
  { id:3, title:'داشبورد تحلیل داده', student:'علی موسوی', course:'JavaScript', tags:['Chart.js','API','JavaScript'], emoji:'📊', gradient:'linear-gradient(135deg,#f59e0b,#ef4444)', likes:312, demo:'#', description:'داشبورد تعاملی با نمودارهای پیشرفته و اتصال به API های واقعی' },
  { id:4, title:'سایت خبری با Next.js', student:'فاطمه کریمی', course:'Next.js', tags:['Next.js','SSR','MongoDB'], emoji:'📰', gradient:'linear-gradient(135deg,#3b82f6,#1d4ed8)', likes:156, demo:'#', description:'سایت خبری با SSR، جستجو پیشرفته و پنل مدیریت' },
  { id:5, title:'Chat App آنلاین', student:'حسین نجفی', course:'Node.js', tags:['Socket.io','Node.js','React'], emoji:'💬', gradient:'linear-gradient(135deg,#10b981,#059669)', likes:278, demo:'#', description:'اپ چت آنلاین با پیام‌های لحظه‌ای، اتاق‌های گفتگو و آپلود فایل' },
  { id:6, title:'پورتفولیو شخصی', student:'مریم حسینی', course:'Tailwind CSS', tags:['Tailwind','Framer Motion','React'], emoji:'🎨', gradient:'linear-gradient(135deg,#06b6d4,#0284c7)', likes:198, demo:'#', description:'پورتفولیو حرفه‌ای با انیمیشن‌های زیبا و طراحی مدرن' },
];

const FILTERS = ['همه', 'React.js', 'TypeScript', 'JavaScript', 'Next.js', 'Node.js', 'Tailwind CSS'];

export default function StudentGallery({ onBack }) {
  const [active, setActive] = useState('همه');

  const filtered = active === 'همه' ? PROJECTS : PROJECTS.filter(p => p.course === active);

  return (
    <main className="sg-page" dir="rtl">
      <div className="sg-header">
        <button className="sg-back" onClick={onBack}>← بازگشت</button>
        <h1 className="sg-page-title">گالری پروژه‌های دانشجویان</h1>
        <p className="sg-page-sub">نمونه کارهای واقعی دانشجویانی که دوره‌ها را تمام کرده‌اند</p>
      </div>

      <div className="sg-content">
        <div className="sg-filters">
          {FILTERS.map(f => (
            <button key={f} className={`sg-filter-btn ${active === f ? 'active' : ''}`} onClick={() => setActive(f)}>{f}</button>
          ))}
        </div>

        <div className="sg-grid">
          {filtered.map(proj => (
            <article key={proj.id} className="sg-card glass-card">
              <div className="sg-thumb" style={{ background: proj.gradient }}>
                <span className="sg-emoji">{proj.emoji}</span>
                <div className="sg-tags-overlay">
                  {proj.tags.map(t => <span key={t} className="sg-tag">{t}</span>)}
                </div>
              </div>
              <div className="sg-body">
                <h3 className="sg-title">{proj.title}</h3>
                <p className="sg-desc">{proj.description}</p>
                <div className="sg-footer">
                  <div className="sg-student">
                    <div className="sg-avatar">{proj.student[0]}</div>
                    <div>
                      <p className="sg-student-name">{proj.student}</p>
                      <p className="sg-course">{proj.course}</p>
                    </div>
                  </div>
                  <div className="sg-actions">
                    <span className="sg-likes">❤️ {proj.likes}</span>
                    <a href={proj.demo} className="sg-demo-btn">نمایش زنده</a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
