import { useState, useEffect } from 'react';
import './Navbar.css';
import { useAuth }   from '../context/AuthContext';
import { useLocale } from '../hooks/useLocale';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const CoursesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const AdminIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

export default function Navbar({
  theme, toggleTheme, cartQty, onCartOpen,
  onSearchOpen, onBlogClick, onEventsClick,
}) {
  const { isAdmin } = useAuth();
  const { t, lang, changeLang }   = useLocale();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeAll = () => setMenuOpen(false);

  const navLinks = [
    { label: t('nav.about'),   href: '#about',   type: 'anchor' },
    { label: 'وبلاگ',          href: null,        type: 'btn', action: onBlogClick   },
    { label: 'رویدادها',       href: null,        type: 'btn', action: onEventsClick },
    { label: 'تماس با ما',     href: '#contact',  type: 'anchor' },
  ];

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>

      {/* ── Logo ── */}
      <a href="#hero" className="nav-logo" onClick={closeAll}>
        GR<span>.</span>
      </a>

      {/* ── Centre nav ── */}
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {navLinks.map((l) => (
          <li key={l.label}>
            {l.type === 'anchor' ? (
              <a href={l.href} onClick={closeAll}>{l.label}</a>
            ) : (
              <button
                className="nav-page-link"
                onClick={() => { l.action?.(); closeAll(); }}
              >
                {l.label}
              </button>
            )}
          </li>
        ))}

        {/* Separator + CTA */}
        <li className="nav-sep" aria-hidden="true" />
        <li>
          <a href="#projects" className="nav-cta" onClick={closeAll}>
            {t('nav.viewCourses')}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </a>
        </li>
      </ul>

      {/* ── Right actions ── */}
      <div className="nav-end">

        {/* Search — always visible */}
        <button className="nav-icon-btn" onClick={onSearchOpen} aria-label="جستجو" title="جستجو">
          <SearchIcon />
        </button>

        {/* Cart */}
        <button className="nav-icon-btn nav-cart-btn" onClick={onCartOpen} aria-label={t('nav.cart')} title={t('nav.cart')}>
          <CartIcon />
          {cartQty > 0 && <span className="nav-badge">{cartQty}</span>}
        </button>

        {/* Theme */}
        <button className="nav-icon-btn nav-theme-btn" onClick={toggleTheme} aria-label="تغییر تم">
          {theme === 'light' ? '☽' : '☀'}
        </button>

        {/* Language */}
        <button className="nav-lang-btn" onClick={() => changeLang(lang === 'fa' ? 'en' : 'fa')} aria-label="زبان">
          {t('nav.langSwitch')}
        </button>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="منو"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
