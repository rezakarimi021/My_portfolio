import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './FreeTrialSection.css';

const FREE_COURSES = [
  {
    id: 'react', emoji: '⚛️', gradient: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
    title: 'دوره جامع React.js',
    lessons: [
      { id: 1, title: 'معرفی React و نصب محیط توسعه', duration: '۱۸:۴۵', free: true },
      { id: 2, title: 'JSX و ساختار کامپوننت‌ها',      duration: '۲۵:۱۲', free: true },
      { id: 3, title: 'State و هوک useState',            duration: '۳۲:۰۵', free: true },
      { id: 4, title: 'Props و انتقال داده',              duration: '۲۸:۳۵', free: false },
      { id: 5, title: 'useEffect و HTTP Requests',       duration: '۳۸:۵۰', free: false },
    ],
  },
  {
    id: 'js', emoji: '🟨', gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    title: 'JavaScript پیشرفته',
    lessons: [
      { id: 1, title: 'ES6+ و قابلیت‌های مدرن',     duration: '۳۵:۲۰', free: true },
      { id: 2, title: 'Closure و Scope',              duration: '۲۸:۴۵', free: true },
      { id: 3, title: 'Async/Await و Promise',        duration: '۴۰:۱۵', free: true },
      { id: 4, title: 'Prototype و OOP',               duration: '۳۸:۳۰', free: false },
      { id: 5, title: 'الگوهای طراحی',                duration: '۴۵:۱۰', free: false },
    ],
  },
  {
    id: 'nextjs', emoji: '🔷', gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
    title: 'آموزش Next.js 14',
    lessons: [
      { id: 1, title: 'معرفی Next.js و App Router',     duration: '۲۰:۳۰', free: true },
      { id: 2, title: 'Server و Client Components',     duration: '۳۵:۰۸', free: true },
      { id: 3, title: 'Routing و Layout',               duration: '۲۸:۴۵', free: true },
      { id: 4, title: 'SSR و SSG',                      duration: '۴۲:۲۰', free: false },
      { id: 5, title: 'API Routes',                     duration: '۳۱:۱۵', free: false },
    ],
  },
];

function LessonRow({ lesson }) {
  return (
    <div className={`ft-lesson ${lesson.free ? 'ft-lesson--free' : 'ft-lesson--locked'}`}>
      <span className="ft-lesson-icon">{lesson.free ? '▶' : '🔒'}</span>
      <span className="ft-lesson-title">{lesson.title}</span>
      <span className="ft-lesson-dur">{lesson.duration}</span>
      {lesson.free && <span className="ft-free-tag">رایگان</span>}
    </div>
  );
}

function CourseTrialCard({ course, delay, onBuy }) {
  const [open, setOpen] = useState(false);
  const ref = useScrollReveal({ type: 'up', delay });
  return (
    <div ref={ref} className="ft-card glass-card">
      <div className="ft-card-head" style={{ background: course.gradient }}>
        <span className="ft-emoji">{course.emoji}</span>
        <div>
          <h3 className="ft-card-title">{course.title}</h3>
          <span className="ft-free-note">۳ درس اول رایگان</span>
        </div>
      </div>
      <div className="ft-card-body">
        {(open ? course.lessons : course.lessons.slice(0, 3)).map(l =>
          <LessonRow key={l.id} lesson={l} />
        )}
        {!open && course.lessons.length > 3 && (
          <button className="ft-show-more" onClick={() => setOpen(true)}>
            + {course.lessons.length - 3} درس دیگر
          </button>
        )}
      </div>
      <div className="ft-card-footer">
        <button className="ft-buy-btn btn-ripple" onClick={onBuy}>
          خرید دوره کامل
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
}

export default function FreeTrialSection({ onBuy }) {
  const titleRef = useScrollReveal({ type: 'fade' });
  return (
    <section id="free-trial" className="free-trial section">
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span className="ft-chip">🎁 مشاهده رایگان</span>
        <h2 className="section-title">قبل از خرید امتحان کن!</h2>
        <div className="section-divider" />
        <p className="ft-sub">۳ درس اول هر دوره کاملاً رایگان — بدون نیاز به پرداخت</p>
      </div>
      <div className="ft-grid">
        {FREE_COURSES.map((c, i) => (
          <CourseTrialCard key={c.id} course={c} delay={i * 120} onBuy={onBuy} />
        ))}
      </div>
    </section>
  );
}
