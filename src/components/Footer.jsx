import './Footer.css';
import { useLocale } from '../hooks/useLocale';

const SOCIALS = [
  { key: 'email',    icon: '📧', href: 'mailto:gh55281393@gmail.com' },
  { key: 'linkedin', icon: '💼', href: '#' },
  { key: 'github',   icon: '🐙', href: '#' },
  { key: 'telegram', icon: '📱', href: '#' },
];

export default function Footer() {
  const { t, dir } = useLocale();
  const year = new Date().getFullYear();

  const QUICK_LINKS = [
    { labelKey: 'footer.links.about',   href: '#about'    },
    { labelKey: 'footer.links.courses', href: '#projects' },
    { labelKey: 'footer.links.books',   href: '#books'    },
    { labelKey: 'footer.links.skills',  href: '#skills'   },
    { labelKey: 'footer.links.contact', href: '#contact'  },
  ];

  const COURSE_LINKS = [
    { labelKey: 'footer.courseLinks.react',   href: '#projects' },
    { labelKey: 'footer.courseLinks.next',    href: '#projects' },
    { labelKey: 'footer.courseLinks.js',      href: '#projects' },
    { labelKey: 'footer.courseLinks.node',    href: '#projects' },
    { labelKey: 'footer.courseLinks.python',  href: '#projects' },
    { labelKey: 'footer.courseLinks.ts',      href: '#projects' },
  ];

  return (
    <footer className="footer" dir={dir}>
      <div className="footer-top-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,30 C480,60 960,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="footer-inner">
        <div className="footer-grid">

          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">⚡</span>
              <div>
                <strong className="footer-logo-name">غلامرضا کریمی‌پور</strong>
                <span className="footer-logo-role">{t('footer.role')}</span>
              </div>
            </div>
            <p className="footer-desc">{t('footer.desc')}</p>
            <div className="footer-socials">
              {SOCIALS.map(s => (
                <a key={s.key} href={s.href} className="footer-social" aria-label={t(`footer.socials.${s.key}`)}
                   target={s.href.startsWith('http') ? '_blank' : undefined}
                   rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.quickLinks')}</h4>
            <ul className="footer-links">
              {QUICK_LINKS.map(l => (
                <li key={l.labelKey}><a href={l.href}>{t(l.labelKey)}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.coursesCol')}</h4>
            <ul className="footer-links">
              {COURSE_LINKS.map(l => (
                <li key={l.labelKey}><a href={l.href}>{t(l.labelKey)}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.contactCol')}</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span>📧</span>
                <a href="mailto:gh55281393@gmail.com">gh55281393@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <span>📍</span>
                <span>{t('footer.location')}</span>
              </div>
              <div className="footer-contact-item">
                <span>🕐</span>
                <span>{t('footer.hours')}</span>
              </div>
            </div>
            <div className="footer-trust-badges">
              <div className="footer-badge">✅ {t('footer.badgeCert')}</div>
              <div className="footer-badge">🔒 {t('footer.badgePayment')}</div>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© {year} {t('footer.copyright')}</span>
          <span className="footer-bottom-sep">·</span>
          <span>{t('footer.madeWith')}</span>
        </div>
      </div>
    </footer>
  );
}
