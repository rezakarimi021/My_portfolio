import { useLocale } from '../hooks/useLocale';
import Reviews from './Reviews';
import './Course.css';

export default function Course({ onBuy }) {
  const { t, dir } = useLocale();

  return (
    <section id="course" className="course section">
      <h2 className="section-title">{t('course.title')}</h2>
      <div className="section-divider" />

      <div className="course-container">
        <div className="course-silver-box">
          <div className="course-shine" />
          <div className="course-inner" dir={dir}>
            <span className="course-badge">{t('course.badge')}</span>
            <h3 className="course-title">{t('course.title')}</h3>
            <p className="course-desc">{t('course.desc')}</p>
            <div className="course-features">
              <span>✓ {t('course.feat1')}</span>
              <span>✓ {t('course.feat2')}</span>
              <span>✓ {t('course.feat3')}</span>
            </div>
          </div>
        </div>

        <button className="course-buy-btn" onClick={onBuy}>
          {t('course.buyBtn')}
        </button>

        <div className="course-reviews-wrap">
          <Reviews productId="COURSE" productName={t('course.title')} />
        </div>
      </div>
    </section>
  );
}
