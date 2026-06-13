import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocale } from '../hooks/useLocale';
import Reviews from './Reviews';
import './Books.css';

export const BOOKS = [
  { id: 'B001', title: 'Python Crash Course',  author: 'Eric Matthes',                 publisher: 'No Starch Press', coverUrl: '/book-python.jfif',   coverBg: '#1a4a6e', price: 280_000, origPrice: 380_000, rating: 4.9, reviews: 142, pages: 544, weight: 700, tags: ['Python', 'Beginner', 'Projects'],          badge: 'best', stock: 15 },
  { id: 'B002', title: 'Eloquent JavaScript',  author: 'Marijn Haverbeke',              publisher: 'No Starch Press', coverUrl: '/book-javascript.jfif',coverBg: '#4a1a1a', price: 250_000, origPrice: 320_000, rating: 4.8, reviews: 98,  pages: 472, weight: 620, tags: ['JavaScript', 'ES6+', 'DOM'],               badge: null,   stock: 20 },
  { id: 'B003', title: 'Learning React',       author: 'Alex Banks & Eve Porcello',    publisher: "O'Reilly Media",  coverUrl: '/book-react.png',      coverBg: '#1a3a5e', price: 260_000, origPrice: 340_000, rating: 4.9, reviews: 175, pages: 350, weight: 580, tags: ['React', 'Hooks', "O'Reilly"],             badge: 'new',  stock: 8  },
  { id: 'B004', title: 'Clean Code',           author: 'Robert C. Martin',              publisher: 'Prentice Hall',   coverUrl: '/book-cleancode.jfif', coverBg: '#1a1a1a', price: 210_000, origPrice: 280_000, rating: 4.7, reviews: 210, pages: 431, weight: 540, tags: ['Clean Code', 'SOLID', 'Uncle Bob'],        badge: null,   stock: 25 },
];

function Stars({ rating }) {
  return (
    <span className="bk-stars" aria-label={`${rating} / 5`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? 'bk-star filled' : 'bk-star'}>★</span>
      ))}
    </span>
  );
}

function RevealWrap({ delay, children }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="sr-hidden bk-card-wrap" style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function BookCard({ book, onOrder }) {
  const { t, dir, fmtNum, fmtPrice } = useLocale();
  const discount = Math.round((1 - book.price / book.origPrice) * 100);
  const subtitle = t(`books.${book.id}.subtitle`);
  const desc     = t(`books.${book.id}.desc`);

  const badgeLabel =
    book.badge === 'best' ? t('books.badgeBest') :
    book.badge === 'new'  ? t('books.badgeNew')  : null;

  const badgeClass =
    book.badge === 'best' ? 'bk-badge--best' :
    book.badge === 'new'  ? 'bk-badge--new'  : '';

  return (
    <article className="bk-card" dir={dir}>
      {badgeLabel && <span className={`bk-badge ${badgeClass}`}>{badgeLabel}</span>}

      <div className="bk-visual-wrap">
        <div className="bk-cover" style={{ background: book.coverBg }}>
          <div className="bk-cover-spine" />
          <img src={book.coverUrl} alt={book.title} className="bk-cover-img" loading="lazy" />
          <div className="bk-cover-sheen" />
        </div>
      </div>

      <div className="bk-body">
        <h3 className="bk-title">{book.title}</h3>
        <p className="bk-subtitle">{subtitle}</p>
        <p className="bk-author">✍️ {book.author} · {book.publisher}</p>

        <div className="bk-rating">
          <Stars rating={book.rating} />
          <span className="bk-rating-num">{book.rating}</span>
          <span className="bk-rating-count">({fmtNum(book.reviews)} {t('common.reviews')})</span>
        </div>

        <p className="bk-desc">{desc}</p>

        <div className="bk-tags">
          {book.tags.map(tag => <span key={tag} className="bk-tag">{tag}</span>)}
        </div>

        <div className="bk-meta">
          <span>📄 {fmtNum(book.pages)} {t('common.pages')}</span>
          <span>⚖️ {book.weight} {t('common.grams')}</span>
          <span className={`bk-stock ${book.stock <= 10 ? 'bk-stock--low' : ''}`}>
            {book.stock <= 10
              ? `⚠️ ${t('common.lowStock', { count: fmtNum(book.stock) })}`
              : `✅ ${t('common.inStock')}`}
          </span>
        </div>

        <div className="bk-price-row">
          <div>
            <span className="bk-orig-price">{fmtPrice(book.origPrice)}</span>
            <span className="bk-discount-pct">{t('common.discountPct', { n: discount })}</span>
            <strong className="bk-price">{fmtPrice(book.price)}</strong>
          </div>
        </div>

        <div className="bk-actions">
          <button className="bk-order-btn" onClick={() => onOrder(book)}>
            {t('books.orderBtn')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <Reviews productId={book.id} productName={book.title} />
        </div>
      </div>
    </article>
  );
}

export default function Books({ onOrder }) {
  const { t } = useLocale();
  const headRef = useScrollReveal();

  return (
    <section id="books" className="books section">
      <div ref={headRef} className="sr-hidden books-head">
        <p className="books-label">{t('books.sectionLabel')}</p>
        <h2 className="section-title">{t('books.sectionTitle')}</h2>
        <div className="section-divider" />
        <p className="books-sub">{t('books.sub')}</p>
      </div>

      <div className="bk-grid">
        {BOOKS.map((book, i) => (
          <RevealWrap key={book.id} delay={i * 0.1}>
            <BookCard book={book} onOrder={onOrder} />
          </RevealWrap>
        ))}
      </div>

      <div className="books-trust">
        <span>🚚 {t('books.trust.shipping')}</span>
        <span>🔒 {t('books.trust.payment')}</span>
        <span>📦 {t('books.trust.packaging')}</span>
        <span>↩️ {t('books.trust.return')}</span>
      </div>
    </section>
  );
}
