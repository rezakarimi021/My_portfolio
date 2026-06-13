import { useState, useEffect, useRef } from 'react';
import { BOOKS } from './Books';
import { COURSE_DATA } from './Projects';
import { useLocale } from '../hooks/useLocale';
import './ProductSlider.css';

/* ── Per-panel vertical-ticker hook ────────────────────────── */
function useTicker(count, interval = 2500, startDelay = 0) {
  const [current, setCurrent]   = useState(0);
  const [nextItem, setNextItem] = useState(null);
  const currentRef  = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => { currentRef.current = current; }, [current]);

  useEffect(() => {
    if (count <= 1) return;
    const delayId = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setNextItem((currentRef.current + 1) % count);
      }, interval);
    }, startDelay);
    return () => {
      clearTimeout(delayId);
      clearInterval(intervalRef.current);
    };
  }, [count, interval, startDelay]);

  // Commit the transition after animation completes
  useEffect(() => {
    if (nextItem === null) return;
    const id = setTimeout(() => {
      currentRef.current = nextItem;
      setCurrent(nextItem);
      setNextItem(null);
    }, 440);
    return () => clearTimeout(id);
  }, [nextItem]);

  return { current, next: nextItem };
}

/* ── Compact book card ─────────────────────────────────────── */
function BookSlide({ book, t, fmtPrice, dir }) {
  const discount   = Math.round((1 - book.price / book.origPrice) * 100);
  const badgeLabel =
    book.badge === 'best' ? t('books.badgeBest') :
    book.badge === 'new'  ? t('books.badgeNew')  : null;

  return (
    <div className="psl-book" dir={dir}>
      <div className="psl-book-thumb" style={{ background: book.coverBg }}>
        <img src={book.coverUrl} alt={book.title} className="psl-book-img" loading="lazy" />
        {badgeLabel && <span className="psl-book-badge">{badgeLabel}</span>}
        <span className="psl-book-disc">−{discount}%</span>
      </div>
      <div className="psl-book-info">
        <h3 className="psl-book-title">{book.title}</h3>
        <p className="psl-book-author">{book.author}</p>
        <div className="psl-book-rating">
          <span className="psl-stars">
            {'★'.repeat(Math.round(book.rating))}{'☆'.repeat(5 - Math.round(book.rating))}
          </span>
          <span className="psl-rating-num">{book.rating}</span>
        </div>
        <div className="psl-book-price" dir="ltr">
          <s className="psl-orig">{fmtPrice(book.origPrice)}</s>
          <strong className="psl-price">{fmtPrice(book.price)}</strong>
        </div>
        <a href="#books" className="psl-cta-btn">{t('slider.orderBook')}</a>
      </div>
    </div>
  );
}

/* ── Compact course card ───────────────────────────────────── */
function CourseSlide({ course, t, fmtPrice, dir }) {
  const discount = Math.round((1 - course.price / course.origPrice) * 100);
  const courseT  = t(`projects.courses.${course.key}`);

  return (
    <div className="psl-course" dir={dir}>
      <div className="psl-course-thumb" style={{ background: course.gradient }}>
        <span className="psl-course-emoji">{course.emoji}</span>
        {course.badge === 'hot' && <span className="psl-course-badge">{t('projects.badgeHot')}</span>}
        {course.badge === 'new' && <span className="psl-course-badge psl-course-badge--new">{t('projects.badgeNew')}</span>}
        <span className="psl-course-disc">−{discount}%</span>
      </div>
      <div className="psl-course-info">
        <h3 className="psl-course-title">{courseT?.title || course.key}</h3>
        <div className="psl-course-meta">
          <span className="psl-level">{courseT?.level}</span>
          <span className="psl-c-rating">★ {course.rating}</span>
        </div>
        <div className="psl-course-price" dir="ltr">
          <s className="psl-orig">{fmtPrice(course.origPrice)}</s>
          <strong className="psl-price">{fmtPrice(course.price)}</strong>
        </div>
        <a href="#course" className="psl-cta-btn">{t('slider.viewCourse')}</a>
      </div>
    </div>
  );
}

/* ── Panel with independent vertical-slide ticker ──────────── */
function Panel({ items, renderSlide, icon, label, delay }) {
  const { current, next } = useTicker(items.length, 2500, delay);
  const animating = next !== null;

  return (
    <div className="psl-panel">
      <div className="psl-panel-head">
        <span className="psl-panel-icon">{icon}</span>
        <span className="psl-panel-label">{label}</span>
        <div className="psl-panel-dots">
          {items.map((_, i) => (
            <span key={i} className={`psl-pdot${i === current ? ' psl-pdot--on' : ''}`} />
          ))}
        </div>
      </div>

      <div className="psl-panel-body">
        {/* Exiting item */}
        <div key={current} className={`psl-panel-item${animating ? ' psl-panel-item--out' : ''}`}>
          {renderSlide(items[current])}
        </div>

        {/* Entering item */}
        {animating && (
          <div key={next} className="psl-panel-item psl-panel-item--in">
            {renderSlide(items[next])}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Root ──────────────────────────────────────────────────── */
export default function ProductSlider() {
  const { t, dir, fmtPrice } = useLocale();

  const renderBook   = (book)   => <BookSlide   book={book}     t={t} fmtPrice={fmtPrice} dir={dir} />;
  const renderCourse = (course) => <CourseSlide course={course} t={t} fmtPrice={fmtPrice} dir={dir} />;

  return (
    <section className="psl-section">
      <div className="psl-head" dir={dir}>
        <p className="psl-section-label">{t('slider.sectionLabel')}</p>
        <h2 className="psl-section-title">{t('slider.sectionTitle')}</h2>
        <div className="psl-divider" />
      </div>

      <div className="psl-panels">
        <Panel
          items={BOOKS.slice(0, 2)}
          icon="📚"
          label={t('slider.booksPanel1')}
          renderSlide={renderBook}
          delay={0}
        />
        <Panel
          items={BOOKS.slice(2, 4)}
          icon="📖"
          label={t('slider.booksPanel2')}
          renderSlide={renderBook}
          delay={800}
        />
        <Panel
          items={COURSE_DATA}
          icon="🎓"
          label={t('slider.coursesPanel')}
          renderSlide={renderCourse}
          delay={1600}
        />
      </div>
    </section>
  );
}
