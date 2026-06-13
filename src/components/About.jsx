import { useState, useEffect, useRef } from 'react';
import './About.css';
import profilePhoto from '../assets/photo_2026-06-05_23-04-51.jpg';
import { useLocale } from '../hooks/useLocale';

function AnimCounter({ target, suffix, icon, label, run, numLocale }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!run) return;
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else        setCount(target);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [run, target]);

  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <span className="stat-value">{count.toLocaleString(numLocale)}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function About() {
  const { t, dir, lang } = useLocale();
  const numLocale = lang === 'fa' ? 'fa-IR' : 'en-US';

  const stats = [
    { target: 500, suffix: '+',                        label: t('about.statStudents'),    icon: '👥' },
    { target: 10,  suffix: '+',                        label: t('about.statCourses'),     icon: '📚' },
    { target: 2,   suffix: '+',                        label: t('about.statYears'),       icon: '🏆' },
    { target: 98,  suffix: t('about.statSuffix'),      label: t('about.statSatisfaction'), icon: '⭐' },
  ];

  const statsRef = useRef(null);
  const [countersRun, setCountersRun] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCountersRun(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="about section">
      <h2 className="section-title">{t('about.sectionTitle')}</h2>
      <div className="section-divider" />

      <div className="about-grid">
        <div className="about-avatar">
          <div className="avatar-ring">
            <img src={profilePhoto} alt="غلامرضا کریمی‌پور" className="avatar-photo" />
          </div>
        </div>

        <div className="about-text" dir={dir}>
          <h3>غلامرضا کریمی‌پور</h3>
          <p className="about-role-label">{t('about.role')}</p>
          <p>{t('about.bio1')}</p>
          <p>{t('about.bio2')}</p>
          <div className="about-badges">
            <span className="about-badge">✅ {t('about.badgeCert')}</span>
            <span className="about-badge">💬 {t('about.badgeSupport')}</span>
            <span className="about-badge">♾️ {t('about.badgeLifetime')}</span>
          </div>
          <a href="#projects" className="btn-primary" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
            {t('about.viewCourses')}
          </a>
        </div>
      </div>

      <div className="stats-row" ref={statsRef}>
        {stats.map(s => (
          <AnimCounter key={s.label} {...s} run={countersRun} numLocale={numLocale} />
        ))}
      </div>
    </section>
  );
}
