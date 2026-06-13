import { useState, useEffect } from 'react';
import './Navbar.css';
import { useAuth }   from '../context/AuthContext';
import { useLocale } from '../hooks/useLocale';

const MaleIcon = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="30" r="24"/>
    <rect x="43" y="52" width="14" height="8" rx="4"/>
    <path d="M6 100C6 72 24 56 50 56C76 56 94 72 94 100Z"/>
    <path d="M43 58 L50 68 L57 58" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
  </svg>
);

const FemaleIcon = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 30C26 8 74 8 74 30L76 62C68 54 32 54 24 62Z" opacity="0.7"/>
    <circle cx="50" cy="30" r="22"/>
    <path d="M28 28C28 14 72 14 72 28L70 55C65 50 35 50 30 55Z" opacity="0.88"/>
    <rect x="44" y="50" width="12" height="7" rx="3"/>
    <path d="M18 100C18 76 32 58 50 58C68 58 82 76 82 100Z"/>
    <path d="M30 80L14 100L50 93L86 100L70 80C63 87 37 87 30 80Z" opacity="0.6"/>
  </svg>
);

export default function Navbar({ theme, toggleTheme, cartQty, onCartOpen, onMyCoursesClick, onAdminClick }) {
  const { user, isAdmin, logout } = useAuth();
  const { t, lang, changeLang }   = useLocale();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: t('nav.about'),   id: 'about'    },
    { label: t('nav.skills'),  id: 'skills'   },
    { label: t('nav.courses'), id: 'projects' },
    { label: t('nav.contact'), id: 'contact'  },
  ];

  const userName   = user?.fullName || user?.username || '';
  const userGender = user?.gender || 'male';

  const handleLangToggle = () => {
    changeLang(lang === 'fa' ? 'en' : 'fa');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">GR<span>.</span></a>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l.id}>
            <a href={`#${l.id}`} onClick={() => setMenuOpen(false)}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#projects" className="nav-cta" onClick={() => setMenuOpen(false)}>
            {t('nav.viewCourses')}
          </a>
        </li>
      </ul>

      <div className="nav-end">
        {userName && (
          <div className="nav-user-block">
            <div className={`nav-avatar-frame nav-avatar-frame--${userGender}`}>
              <div className="nav-avatar-inner">
                {userGender === 'female' ? <FemaleIcon /> : <MaleIcon />}
              </div>
            </div>
            <span className="nav-user">
              <span className="nav-user-hi">{t('nav.greeting')}</span> {userName}
            </span>
          </div>
        )}

        {isAdmin && (
          <button className="nav-admin-btn" onClick={onAdminClick} title={t('nav.adminPanel')}>⚙️</button>
        )}

        <button className="nav-mycourses-btn" onClick={onMyCoursesClick} title={t('nav.myCourses')}>🎓</button>

        <button className="logout-btn" onClick={logout} aria-label={t('nav.logout')} title={t('nav.logout')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>

        <button className="cart-btn" onClick={onCartOpen} aria-label={t('nav.cart')}>
          <svg className="cart-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {cartQty > 0 && <span className="cart-badge">{cartQty}</span>}
        </button>

        {/* Language switcher */}
        <button
          className="lang-toggle"
          onClick={handleLangToggle}
          aria-label={lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
          title={lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
        >
          {t('nav.langSwitch')}
        </button>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <span className="icon-default">{theme === 'light' ? '☽' : '☀'}</span>
          <span className="icon-hover">{theme  === 'light' ? '☀' : '☽'}</span>
        </button>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
