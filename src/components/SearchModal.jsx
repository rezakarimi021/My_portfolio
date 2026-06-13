import { useState, useEffect, useRef } from 'react';
import { COURSE_DATA } from './Projects';
import './SearchModal.css';

export default function SearchModal({ onClose, onBuy }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const LEVEL_LABEL = { green: 'مبتدی', amber: 'متوسط', red: 'پیشرفته' };

  const results = query.trim().length < 1
    ? COURSE_DATA.slice(0, 4)
    : COURSE_DATA.filter(c => {
        const q = query.toLowerCase();
        return (
          c.tags.some(t => t.toLowerCase().includes(q)) ||
          c.key.toLowerCase().includes(q)
        );
      });

  const formatPrice = (n) =>
    new Intl.NumberFormat('fa-IR').format(n) + ' تومان';

  return (
    <div className="sm-overlay" onClick={onClose}>
      <div className="sm-box" onClick={e => e.stopPropagation()}>
        <div className="sm-search-wrap" dir="rtl">
          <svg className="sm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            ref={inputRef}
            className="sm-input"
            placeholder="جستجو در دوره‌ها… (React, JavaScript, …)"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="sm-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="sm-results" dir="rtl">
          {results.length === 0 && (
            <div className="sm-empty">هیچ دوره‌ای پیدا نشد 🔍</div>
          )}
          {results.map(c => (
            <div key={c.id} className="sm-result-item">
              <div className="sm-result-thumb" style={{ background: c.gradient }}>
                <span>{c.emoji}</span>
              </div>
              <div className="sm-result-info">
                <p className="sm-result-title">{c.key}</p>
                <div className="sm-result-meta">
                  <span>{c.hours}h</span>
                  <span>·</span>
                  <span>{LEVEL_LABEL[c.levelClass]}</span>
                  <span>·</span>
                  <span>{formatPrice(c.price)}</span>
                </div>
                <div className="sm-tags">
                  {c.tags.slice(0, 3).map(t => <span key={t} className="sm-tag">{t}</span>)}
                </div>
              </div>
              <button className="sm-buy-btn" onClick={() => { onBuy(); onClose(); }}>
                خرید
              </button>
            </div>
          ))}
        </div>

        {query.trim().length === 0 && (
          <p className="sm-hint">دوره‌های پرطرفدار نمایش داده می‌شوند</p>
        )}
      </div>
    </div>
  );
}
