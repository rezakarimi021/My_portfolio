import { useState, useCallback } from 'react';
import { useAuth }   from '../context/AuthContext';
import { useLocale } from '../hooks/useLocale';
import { getReviews, addReview, hasReviewed } from '../utils/reviews';
import './Reviews.css';

function StarPicker({ value, onChange, label }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="rv-star-picker" dir="ltr" role="group" aria-label={label}>
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          className={`rv-star-pick ${i <= (hover || value) ? 'on' : ''}`}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
          aria-label={`${i}`}
        >★</button>
      ))}
    </div>
  );
}

function StarDisplay({ rating }) {
  return (
    <span className="rv-stars-disp" dir="ltr" aria-label={`${rating}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? 'rv-s on' : 'rv-s'}>★</span>
      ))}
    </span>
  );
}

export default function Reviews({ productId, productName }) {
  const { user } = useAuth();
  const { t, dir } = useLocale();

  const [open, setOpen]         = useState(false);
  const [reviews, setReviews]   = useState(() => getReviews(productId));
  const [reviewed, setReviewed] = useState(() =>
    user ? hasReviewed(productId, user.username) : false,
  );
  const [rating, setRating] = useState(5);
  const [text, setText]     = useState('');
  const [error, setError]   = useState('');

  const openModal = useCallback(() => {
    const fresh = getReviews(productId);
    setReviews(fresh);
    if (user) setReviewed(hasReviewed(productId, user.username));
    setOpen(true);
  }, [productId, user]);

  const closeModal = useCallback(() => setOpen(false), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) { setError(t('reviews.error')); return; }
    const entry = addReview(productId, {
      username: user.username,
      fullName: user.fullName || user.username,
      rating,
      text: text.trim().slice(0, 500),
    });
    if (entry) {
      setReviews(prev => [entry, ...prev]);
      setReviewed(true);
      setText('');
      setRating(5);
      setError('');
    }
  };

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <>
      <button className="rv-trigger" onClick={openModal}>
        💬 {t('reviews.triggerLabel')}
        <span className="rv-trigger-count">{reviews.length}</span>
      </button>

      {open && (
        <div
          className="rv-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${t('reviews.modalTitle')} · ${productName}`}
          onClick={e => e.target === e.currentTarget && closeModal()}
        >
          <div className="rv-modal" dir={dir}>
            <div className="rv-modal-head">
              <h3 className="rv-modal-title">{t('reviews.modalTitle')} · {productName}</h3>
              <button className="rv-modal-close" onClick={closeModal} aria-label="Close">✕</button>
            </div>

            <div className="rv-modal-body">
              {avg && (
                <div className="rv-summary">
                  <span className="rv-avg">{avg}</span>
                  <StarDisplay rating={parseFloat(avg)} />
                  <span className="rv-avg-label">{t('reviews.reviewCount', { count: reviews.length })}</span>
                </div>
              )}

              {user && !reviewed && (
                <form className="rv-form" onSubmit={handleSubmit}>
                  <p className="rv-form-title">{t('reviews.writeReview')}</p>
                  <StarPicker value={rating} onChange={setRating} label={t('reviews.ratingLabel')} />
                  <textarea
                    className="rv-textarea"
                    value={text}
                    onChange={e => { setText(e.target.value); setError(''); }}
                    placeholder={t('reviews.placeholder', { name: productName })}
                    rows={3}
                    maxLength={500}
                  />
                  <div className="rv-form-row">
                    <span className="rv-char">{text.length}/500</span>
                    {error && <span className="rv-error">{error}</span>}
                    <button type="submit" className="rv-submit" disabled={!text.trim()}>
                      {t('reviews.submit')}
                    </button>
                  </div>
                </form>
              )}

              {user && reviewed && (
                <div className="rv-already">{t('reviews.alreadyReviewed')}</div>
              )}

              {!user && (
                <div className="rv-guest">{t('reviews.loginRequired')}</div>
              )}

              <div className="rv-list">
                {reviews.length === 0 ? (
                  <div className="rv-empty">
                    <span>📝</span>
                    <p>{t('reviews.noReviews')}</p>
                  </div>
                ) : (
                  reviews.map(r => (
                    <div key={r.id} className="rv-item">
                      <div className="rv-item-top">
                        <div className="rv-avatar">{(r.fullName || r.username)[0]}</div>
                        <div className="rv-item-meta">
                          <span className="rv-item-name">{r.fullName || r.username}</span>
                          <StarDisplay rating={r.rating} />
                        </div>
                        <span className="rv-item-date">
                          {new Date(r.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="rv-item-text">{r.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
