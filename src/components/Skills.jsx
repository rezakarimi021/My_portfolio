import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocale } from '../hooks/useLocale';
import './Skills.css';

const TECH_STACK = [
  { icon: '⚛️',  label: 'React',      color: '#61dafb' },
  { icon: '▲',   label: 'Next.js',    color: '#ffffff' },
  { icon: '🟨',  label: 'JavaScript', color: '#f0db4f' },
  { icon: '🔷',  label: 'TypeScript', color: '#3178c6' },
  { icon: '🐍',  label: 'Python',     color: '#3572A5' },
  { icon: '🟢',  label: 'Node.js',    color: '#68a063' },
  { icon: '🎨',  label: 'Tailwind',   color: '#06b6d4' },
  { icon: '🐙',  label: 'Git',        color: '#f05032' },
  { icon: '🐳',  label: 'Docker',     color: '#2496ed' },
  { icon: '🍃',  label: 'MongoDB',    color: '#47a248' },
  { icon: '🐘',  label: 'PostgreSQL', color: '#336791' },
  { icon: '⚡',  label: 'Vite',       color: '#bd34fe' },
];

const SKILL_DATA = [
  {
    icon: '🎨',
    titleKey: 'skills.catFrontend',
    skills: [
      { name: 'React.js',        level: 90 },
      { name: 'Next.js',         level: 85 },
      { name: 'Tailwind CSS',    level: 88 },
      { name: 'Redux / Zustand', level: 75 },
    ],
  },
  {
    icon: '⚙️',
    titleKey: 'skills.catBackend',
    skills: [
      { name: 'JavaScript ES6+',  level: 92 },
      { name: 'TypeScript',        level: 78 },
      { name: 'Node.js / Express', level: 80 },
      { name: 'Python / Django',   level: 75 },
    ],
  },
  {
    icon: '🛠️',
    titleKey: 'skills.catTools',
    skills: [
      { name: 'Git & GitHub',   level: 88 },
      { name: 'HTML5 & CSS3',   level: 95 },
      { name: 'Docker / Linux', level: 65 },
      { name: 'REST / GraphQL', level: 80 },
    ],
  },
];

function AnimatedBar({ name, level }) {
  const barRef  = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.style.width = `${level}%`; return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        requestAnimationFrame(() => { el.style.width = `${level}%`; });
        obs.unobserve(el.parentElement);
      }
    }, { threshold: 0.3 });
    obs.observe(el.parentElement);
    return () => obs.disconnect();
  }, [level]);

  return (
    <div className="sk-item">
      <div className="sk-item-meta">
        <span className="sk-item-name">{name}</span>
        <span className="sk-item-pct">{level}%</span>
      </div>
      <div className="sk-bar-bg">
        <div ref={barRef} className="sk-bar-fill" style={{ width: '0%' }} />
      </div>
    </div>
  );
}

function RevealCategory({ cat, delay }) {
  const ref = useScrollReveal();
  const { t, dir } = useLocale();
  return (
    <div ref={ref} className="sk-category sr-hidden" style={{ transitionDelay: `${delay}s` }} dir={dir}>
      <div className="sk-cat-header">
        <span className="sk-cat-icon">{cat.icon}</span>
        <h3 className="sk-cat-title">{t(cat.titleKey)}</h3>
      </div>
      {cat.skills.map(s => <AnimatedBar key={s.name} {...s} />)}
    </div>
  );
}

export default function Skills() {
  const { t } = useLocale();
  const headRef  = useScrollReveal();
  const stackRef = useScrollReveal(0.1);

  return (
    <section id="skills" className="skills section">
      <div ref={headRef} className="sr-hidden">
        <p className="sk-label">{t('skills.label')}</p>
        <h2 className="section-title">{t('skills.sectionTitle')}</h2>
        <div className="section-divider" />
        <p className="sk-sub">{t('skills.sub')}</p>
      </div>

      <div ref={stackRef} className="sk-stack sr-hidden">
        {TECH_STACK.map((tech, i) => (
          <div key={tech.label} className="sk-tech" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="sk-tech-icon">{tech.icon}</div>
            <span className="sk-tech-label">{tech.label}</span>
          </div>
        ))}
      </div>

      <div className="sk-grid">
        {SKILL_DATA.map((cat, i) => (
          <RevealCategory key={cat.titleKey} cat={cat} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}
