import { useState, useRef } from 'react';
import './Projects.css';
import { useLocale } from '../hooks/useLocale';
import { useScrollReveal } from '../hooks/useScrollReveal';
import DiscountTimer from './DiscountTimer';

export const COURSE_DATA = [
  { id: 1, key: 'c1', emoji: '⚛️', gradient: 'linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%)', levelClass: 'green',  hours: 40, lessons: 72, students: 1240, rating: 4.9, reviews: 318, tags: ['React', 'Hooks', 'Context', 'React Query'], price: 590_000, origPrice: 890_000, badge: 'hot' },
  { id: 2, key: 'c2', emoji: '🔷', gradient: 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)', levelClass: 'amber', hours: 35, lessons: 58, students: 860,  rating: 4.8, reviews: 241, tags: ['Next.js', 'App Router', 'SSR', 'TypeScript'], price: 590_000, origPrice: 790_000, badge: 'new' },
  { id: 3, key: 'c3', emoji: '🟨', gradient: 'linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)', levelClass: 'red',   hours: 45, lessons: 84, students: 1580, rating: 4.9, reviews: 497, tags: ['JavaScript', 'ES6+', 'Async', 'Patterns'], price: 590_000, origPrice: 890_000, badge: 'hot' },
  { id: 4, key: 'c4', emoji: '🟢', gradient: 'linear-gradient(135deg,#10b981 0%,#059669 100%)', levelClass: 'amber', hours: 30, lessons: 52, students: 720,  rating: 4.7, reviews: 183, tags: ['Node.js', 'Express', 'MongoDB', 'JWT'], price: 590_000, origPrice: 790_000, badge: null },
  { id: 5, key: 'c5', emoji: '💙', gradient: 'linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)', levelClass: 'green', hours: 25, lessons: 44, students: 930,  rating: 4.8, reviews: 262, tags: ['TypeScript', 'Generics', 'React', 'Node.js'], price: 590_000, origPrice: 690_000, badge: null },
  { id: 6, key: 'c6', emoji: '🎨', gradient: 'linear-gradient(135deg,#06b6d4 0%,#0284c7 100%)', levelClass: 'green', hours: 20, lessons: 38, students: 1100, rating: 4.9, reviews: 356, tags: ['Tailwind', 'UI Design', 'Responsive', 'React'], price: 590_000, origPrice: 690_000, badge: null },
];

const LEVEL_COLORS = { green: '#10b981', amber: '#f59e0b', red: '#ef4444' };

const Stars = ({ rating }) => {
  const full  = Math.floor(rating);
  const empty = 5 - full;
  return (
    <span className="cc-stars" aria-label={`Rating ${rating} / 5`}>
      {'★'.repeat(full)}{'☆'.repeat(empty)}
    </span>
  );
};

function addRipple(e) {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  circle.className = 'ripple-circle';
  circle.style.cssText = `width:${size}px;height:${size}px;top:${e.clientY - rect.top - size / 2}px;left:${e.clientX - rect.left - size / 2}px;`;
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

function CourseCard({ course, onBuy, onViewDetail, delay }) {
  const { t, dir, fmtNum, fmtPrice } = useLocale();
  const discount    = Math.round((1 - course.price / course.origPrice) * 100);
  const levelColor  = LEVEL_COLORS[course.levelClass];
  const courseT     = t(`projects.courses.${course.key}`);
  const ref         = useScrollReveal({ type: 'up', delay });

  const handleBuyClick = (e) => { addRipple(e); onBuy(); };

  return (
    <article ref={ref} className="cc" dir={dir}>
      <div className="cc-thumb" style={{ background: course.gradient }}>
        <span className="cc-emoji">{course.emoji}</span>
        {course.badge === 'hot' && <span className="cc-badge cc-badge--hot">{t('projects.badgeHot')}</span>}
        {course.badge === 'new' && <span className="cc-badge cc-badge--new">{t('projects.badgeNew')}</span>}
        <span className="cc-discount">−{discount}%</span>
        <div className="cc-thumb-overlay">
          <button className="cc-view-btn" onClick={() => onViewDetail(course.id)}>
            🔍 مشاهده دوره
          </button>
        </div>
      </div>

      <div className="cc-body">
        <h3 className="cc-title">{courseT?.title || course.key}</h3>
        <p className="cc-desc">{courseT?.desc}</p>

        <div className="cc-rating-row">
          <Stars rating={course.rating} />
          <span className="cc-rnum">{course.rating}</span>
          <span className="cc-rmeta">({fmtNum(course.reviews)} {t('common.reviews')})</span>
          <span className="cc-rmeta cc-students">· {fmtNum(course.students)} {t('common.students')}</span>
        </div>

        <div className="cc-meta-row">
          <span className="cc-meta">⏱ {fmtNum(course.hours)} {t('common.hours')}</span>
          <span className="cc-meta">📹 {fmtNum(course.lessons)} {t('common.lessons')}</span>
          <span className="cc-level" style={{ color: levelColor, borderColor: levelColor + '44' }}>
            {courseT?.level}
          </span>
        </div>

        <div className="cc-tags">
          {course.tags.map(tag => <span key={tag} className="cc-tag">{tag}</span>)}
        </div>

        <div className="cc-footer">
          <div className="cc-price-block">
            <span className="cc-price-orig">{fmtPrice(course.origPrice)}</span>
            <span className="cc-price">{fmtPrice(course.price)}</span>
          </div>
          <button className="cc-buy btn-ripple" onClick={handleBuyClick}>
            {t('projects.buyBtn')}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

const DISCOUNT_END = new Date(Date.now() + 18 * 3600 * 1000).toISOString();

export default function Projects({ onBuy, onViewDetail }) {
  const { t, dir } = useLocale();
  const [filter, setFilter] = useState('all');
  const titleRef = useScrollReveal({ type: 'fade' });

  const FILTERS = [
    { key: 'all',   label: t('projects.filterAll') },
    { key: 'green', label: t('projects.filterBeginner') },
    { key: 'amber', label: t('projects.filterIntermediate') },
    { key: 'red',   label: t('projects.filterAdvanced') },
  ];

  const visible = filter === 'all'
    ? COURSE_DATA
    : COURSE_DATA.filter(c => c.levelClass === filter);

  return (
    <section id="projects" className="projects section">
      <div ref={titleRef}>
        <span className="cc-chip">🎓 دوره‌های آموزشی</span>
        <h2 className="section-title">{t('projects.sectionTitle')}</h2>
        <div className="section-divider" />
        <div className="cc-timer-wrap">
          <DiscountTimer endDate={DISCOUNT_END} label="تخفیف ویژه تا پایان:" />
        </div>
      </div>

      <div className="cc-filters" dir={dir}>
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`cc-filter-btn${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="cc-grid">
        {visible.map((c, i) => (
          <CourseCard
            key={c.id}
            course={c}
            onBuy={onBuy}
            onViewDetail={onViewDetail || (() => {})}
            delay={i * 80}
          />
        ))}
      </div>

      <p className="cc-bundle-note" dir={dir}>
        {t('projects.bundleNote').split('<1>')[0]}
        <strong>{t('projects.bundleNote').split('<1>')[1]?.split('</1>')[0]}</strong>
        {t('projects.bundleNote').split('</1>')[1]}
      </p>
    </section>
  );
}
