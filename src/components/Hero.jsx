import { useState, useEffect, useRef } from 'react';
import './Hero.css';
import profilePhoto from '../assets/photo_2026-06-05_23-04-51.jpg';
import { useLocale } from '../hooks/useLocale';

const CODE_SYMS = [
  { s: '</>', x: 5,  delay: 0.0, dur: 14, size: 1.3 },
  { s: '{}',  x: 12, delay: 2.1, dur: 18, size: 1.0 },
  { s: '=>',  x: 21, delay: 0.7, dur: 12, size: 1.5 },
  { s: '()',  x: 30, delay: 3.4, dur: 16, size: 1.1 },
  { s: '01',  x: 39, delay: 1.2, dur: 20, size: 1.0 },
  { s: ';',   x: 47, delay: 0.4, dur: 11, size: 1.8 },
  { s: '[]',  x: 55, delay: 2.8, dur: 15, size: 1.2 },
  { s: '##',  x: 63, delay: 1.6, dur: 17, size: 1.0 },
  { s: '&&',  x: 72, delay: 0.9, dur: 13, size: 1.1 },
  { s: '!=',  x: 82, delay: 3.0, dur: 19, size: 1.0 },
  { s: '++',  x: 90, delay: 1.5, dur: 14, size: 1.3 },
];

function useTypewriter(words) {
  const [text, setText] = useState('');
  const stateRef = useRef({ wordIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    stateRef.current = { wordIdx: 0, charIdx: 0, deleting: false };
    setText('');
    let timer;
    const tick = () => {
      const s = stateRef.current;
      const word = words[s.wordIdx];
      if (!s.deleting) {
        if (s.charIdx < word.length) {
          s.charIdx++;
          setText(word.slice(0, s.charIdx));
          timer = setTimeout(tick, 88);
        } else {
          timer = setTimeout(() => { s.deleting = true; tick(); }, 2000);
        }
      } else {
        if (s.charIdx > 0) {
          s.charIdx--;
          setText(word.slice(0, s.charIdx));
          timer = setTimeout(tick, 45);
        } else {
          s.deleting = false;
          s.wordIdx = (s.wordIdx + 1) % words.length;
          timer = setTimeout(tick, 400);
        }
      }
    };
    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  // words identity changes on lang switch → effect re-runs → typewriter restarts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words.join('|')]);

  return text;
}

export default function Hero() {
  const { t, dir, fmtNum } = useLocale();

  const typedWords = t('hero.typedWords');
  const typedText  = useTypewriter(Array.isArray(typedWords) ? typedWords : []);

  const STATS = [
    { icon: '👨‍🎓', value: fmtNum(500) + '+', label: t('hero.statStudents') },
    { icon: '📚',  value: fmtNum(6),           label: t('hero.statCourses')  },
    { icon: '📖',  value: fmtNum(4),            label: t('hero.statBooks')    },
    { icon: '⭐',  value: t('hero.ratingVal'),  label: t('hero.statRating')   },
  ];

  return (
    <section id="hero" className="hero">
      <div className="hero-code-bg" aria-hidden="true">
        {CODE_SYMS.map((s, i) => (
          <span key={i} className="hcb-sym" style={{
            left: `${s.x}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
            fontSize: `${s.size}rem`,
          }}>
            {s.s}
          </span>
        ))}
      </div>

      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />

      <div className="hero-split">
        <div className="hero-photo-col">
          <div className="hero-photo-frame">
            <img src={profilePhoto} alt="غلامرضا کریمی‌پور" className="hero-photo-img" />
            <div className="hero-photo-ring" />
          </div>

          <div className="hfb hfb-1" aria-hidden="true">
            <span className="hfb-icon">⭐</span>
            <div>
              <div className="hfb-val">4.9</div>
              <div className="hfb-lbl">{t('hero.badgeRating')}</div>
            </div>
          </div>
          <div className="hfb hfb-2" aria-hidden="true">
            <span className="hfb-icon">👨‍🎓</span>
            <div>
              <div className="hfb-val">{fmtNum(500)}+</div>
              <div className="hfb-lbl">{t('hero.badgeStudents')}</div>
            </div>
          </div>
          <div className="hfb hfb-3" aria-hidden="true">
            <span className="hfb-icon">⚛️</span>
            <div className="hfb-val">React Expert</div>
          </div>
        </div>

        <div className="hero-text-col" dir={dir}>
          <div className="hero-chip">{t('hero.chip')}</div>

          <h1 className="hero-name">
            غلامرضا<br />
            <span className="hero-name-accent">کریمی‌پور</span>
          </h1>

          <div className="hero-typed-row">
            <span className="hero-typed-prefix">{t('hero.instructorPrefix')}</span>
            <span className="hero-typed-text">{typedText}<span className="hero-cursor">|</span></span>
          </div>

          <div className="hero-rating">
            <span className="hero-stars">★★★★★</span>
            <span className="hero-rating-val">{t('hero.ratingVal')}</span>
            <span className="hero-rating-sep">·</span>
            <span className="hero-rating-sub">{t('hero.ratingReviews')}</span>
          </div>

          <div className="hero-trust">
            <span>✅ {t('hero.trustCert')}</span>
            <span>💬 {t('hero.trustSupport')}</span>
            <span>♾️ {t('hero.trustLifetime')}</span>
          </div>

          <div className="hero-actions">
            <a href="#projects" className="hero-btn-primary">
              {t('hero.btnCourses')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#books" className="hero-btn-secondary">
              {t('hero.btnBooks')}
            </a>
          </div>
        </div>
      </div>

      <div className="hero-stats" dir={dir}>
        {STATS.map(s => (
          <div key={s.label} className="hero-stat">
            <span className="hero-stat-icon">{s.icon}</span>
            <strong className="hero-stat-val">{s.value}</strong>
            <span className="hero-stat-lbl">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path fill="#f8f9ff" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
