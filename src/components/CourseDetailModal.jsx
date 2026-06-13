import { useEffect } from 'react';
import { COURSE_DATA } from './Projects';
import './CourseDetailModal.css';

const SYLLABUS = {
  c1: [
    { title: 'مقدمات React', lessons: ['معرفی و نصب','JSX','کامپوننت‌ها'] },
    { title: 'مدیریت State', lessons: ['useState','useEffect','Context API','React Query'] },
    { title: 'پیشرفته', lessons: ['Custom Hooks','Optimization','Testing'] },
  ],
  c2: [
    { title: 'شروع با Next.js 14', lessons: ['نصب و راه‌اندازی','App Router','Layouts'] },
    { title: 'Server Components', lessons: ['RSC','SSR','SSG','ISR'] },
    { title: 'دپلوی و Performance', lessons: ['Vercel Deploy','Edge Functions','TypeScript'] },
  ],
};

const RELATED = {
  c1: [2, 5, 6],
  c2: [1, 5, 3],
  c3: [1, 5, 4],
  c4: [1, 2, 5],
  c5: [1, 2, 3],
  c6: [1, 2, 5],
};

const LEVEL_LABEL = { green: 'مبتدی تا متوسط', amber: 'متوسط تا پیشرفته', red: 'پیشرفته' };
const LEVEL_COLOR = { green: '#10b981', amber: '#f59e0b', red: '#ef4444' };

export default function CourseDetailModal({ courseId, onClose, onBuy }) {
  const course = COURSE_DATA.find(c => c.id === courseId);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose]);

  if (!course) return null;

  const syllabus = SYLLABUS[course.key] || [];
  const related = (RELATED[course.key] || []).map(id => COURSE_DATA.find(c => c.id === id)).filter(Boolean);
  const discount = Math.round((1 - course.price / course.origPrice) * 100);

  const formatPrice = (n) => new Intl.NumberFormat('fa-IR').format(n) + ' تومان';

  return (
    <div className="cdm-overlay" onClick={onClose}>
      <div className="cdm-box" onClick={e => e.stopPropagation()} dir="rtl">
        <button className="cdm-close" onClick={onClose}>✕</button>

        {/* Hero */}
        <div className="cdm-hero" style={{ background: course.gradient }}>
          <span className="cdm-hero-emoji">{course.emoji}</span>
          <div className="cdm-hero-info">
            {course.badge === 'hot' && <span className="cdm-badge-hot">🔥 پرفروش</span>}
            {course.badge === 'new' && <span className="cdm-badge-new">✨ جدید</span>}
            <h2 className="cdm-title">{course.key}</h2>
            <div className="cdm-meta-row">
              <span>⭐ {course.rating} ({new Intl.NumberFormat('fa-IR').format(course.reviews)} نظر)</span>
              <span>· {new Intl.NumberFormat('fa-IR').format(course.students)} دانشجو</span>
              <span>· ⏱ {new Intl.NumberFormat('fa-IR').format(course.hours)} ساعت</span>
            </div>
          </div>
        </div>

        <div className="cdm-body">
          {/* Left column */}
          <div className="cdm-main">
            {/* Tags */}
            <div className="cdm-tags">
              {course.tags.map(t => <span key={t} className="cdm-tag">{t}</span>)}
              <span className="cdm-level" style={{ color: LEVEL_COLOR[course.levelClass], borderColor: LEVEL_COLOR[course.levelClass] + '44' }}>
                {LEVEL_LABEL[course.levelClass]}
              </span>
            </div>

            {/* What you'll learn */}
            <div className="cdm-section">
              <h4 className="cdm-section-title">چه چیزی یاد می‌گیری؟</h4>
              <div className="cdm-learn-grid">
                {course.tags.map((t, i) => (
                  <div key={i} className="cdm-learn-item">✅ تسلط کامل بر {t}</div>
                ))}
                <div className="cdm-learn-item">✅ ساخت پروژه‌های واقعی</div>
                <div className="cdm-learn-item">✅ دریافت گواهینامه</div>
              </div>
            </div>

            {/* Syllabus */}
            {syllabus.length > 0 && (
              <div className="cdm-section">
                <h4 className="cdm-section-title">سرفصل دوره</h4>
                {syllabus.map((ch, i) => (
                  <div key={i} className="cdm-chapter">
                    <div className="cdm-chapter-head">
                      <span className="cdm-ch-num">{i + 1}</span>
                      <span className="cdm-ch-title">{ch.title}</span>
                      <span className="cdm-ch-count">{ch.lessons.length} درس</span>
                    </div>
                    <ul className="cdm-ch-lessons">
                      {ch.lessons.map((l, j) => (
                        <li key={j}>
                          <span className={j < 2 ? 'cdm-free-lesson' : 'cdm-locked-lesson'}>
                            {j < 2 ? '▶' : '🔒'} {l}
                            {j < 2 && <span className="cdm-free-label">رایگان</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Instructor */}
            <div className="cdm-section">
              <h4 className="cdm-section-title">مدرس دوره</h4>
              <div className="cdm-instructor">
                <div className="cdm-inst-avatar">GK</div>
                <div>
                  <p className="cdm-inst-name">غلامرضا کریمی‌پور</p>
                  <p className="cdm-inst-role">مدرس ارشد React.js و JavaScript</p>
                  <p className="cdm-inst-bio">بیش از ۲ سال تجربه تدریس | ۵۰۰+ دانشجو | ۴.۹ امتیاز</p>
                </div>
              </div>
            </div>

            {/* Recommended */}
            {related.length > 0 && (
              <div className="cdm-section">
                <h4 className="cdm-section-title">دوره‌های مرتبط</h4>
                <div className="cdm-related">
                  {related.map(r => (
                    <div key={r.id} className="cdm-related-card">
                      <div className="cdm-rel-thumb" style={{ background: r.gradient }}>
                        <span>{r.emoji}</span>
                      </div>
                      <div className="cdm-rel-info">
                        <p className="cdm-rel-title">{r.key}</p>
                        <p className="cdm-rel-price">{formatPrice(r.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="cdm-sidebar">
            <div className="cdm-price-card glass-card">
              <div className="cdm-price-discount">−{discount}٪ تخفیف</div>
              <div className="cdm-price">{formatPrice(course.price)}</div>
              <div className="cdm-price-orig">{formatPrice(course.origPrice)}</div>
              <button className="cdm-buy-btn btn-ripple" onClick={() => { onBuy(); onClose(); }}>
                🛒 خرید دوره
              </button>
              <ul className="cdm-include">
                <li>✅ دسترسی مادام‌العمر</li>
                <li>✅ گواهینامه معتبر</li>
                <li>✅ پشتیبانی آنلاین</li>
                <li>✅ آپدیت رایگان</li>
                <li>✅ {new Intl.NumberFormat('fa-IR').format(course.lessons)} درس ویدیویی</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
