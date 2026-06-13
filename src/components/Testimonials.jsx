import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocale } from '../hooks/useLocale';
import './Testimonials.css';

const AVATAR_COLORS = ['#6d28d9', '#db2777', '#0891b2', '#059669', '#b45309', '#7c3aed'];
const INITIALS      = ['ع م', 'س ا', 'ر ک', 'ن ر', 'ا ت', 'م ص'];

function Stars({ count }) {
  return (
    <span className="tm-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? 'tm-star tm-star--on' : 'tm-star'}>★</span>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const { t, dir } = useLocale();
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const headRef  = useScrollReveal();

  const items = t('testimonials.items');
  const testimonials = Array.isArray(items) ? items : [];
  const total = testimonials.length;

  const resetTimer = () => {
    clearInterval(timerRef.current);
    if (total > 0) {
      timerRef.current = setInterval(() => setActive(a => (a + 1) % total), 5000);
    }
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const goto = (i) => { setActive(i); resetTimer(); };
  const prev = () => goto((active - 1 + total) % total);
  const next = () => goto((active + 1) % total);

  if (total === 0) return null;

  const visible = [
    (active - 1 + total) % total,
    active,
    (active + 1) % total,
  ];

  return (
    <section className="testimonials">
      <div ref={headRef} className="sr-hidden tm-head">
        <p className="tm-label">{t('testimonials.label')}</p>
        <h2 className="tm-title">{t('testimonials.title')}</h2>
        <div className="tm-divider" />
        <p className="tm-sub">{t('testimonials.sub')}</p>
      </div>

      <div className="tm-carousel">
        {visible.map((idx, pos) => {
          const item     = testimonials[idx];
          const isCenter = pos === 1;
          return (
            <article
              key={idx}
              className={`tm-card ${isCenter ? 'tm-card--center' : 'tm-card--side'}`}
              dir={dir}
              onClick={() => !isCenter && goto(idx)}
            >
              <div className="tm-card-top">
                <div className="tm-avatar" style={{ background: AVATAR_COLORS[idx] }}>
                  {INITIALS[idx]}
                </div>
                <div className="tm-user">
                  <strong className="tm-name">{item.name}</strong>
                  <span className="tm-job">{item.job}</span>
                </div>
                <span className="tm-verified" title={t('common.verified')}>✓</span>
              </div>
              <Stars count={5} />
              <p className="tm-text">{item.text}</p>
              <div className="tm-footer">
                <span className="tm-course">{item.course}</span>
                <span className="tm-date">{item.date}</span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="tm-controls">
        <button className="tm-arrow" onClick={prev} aria-label={t('slider.prevSlide')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="tm-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`tm-dot ${i === active ? 'tm-dot--active' : ''}`}
                    onClick={() => goto(i)} aria-label={`${i + 1}`} />
          ))}
        </div>
        <button className="tm-arrow" onClick={next} aria-label={t('slider.nextSlide')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </section>
  );
}
