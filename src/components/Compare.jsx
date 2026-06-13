import { useState } from 'react';
import { useLocale } from '../hooks/useLocale';
import './Compare.css';

const BOOK_IDS = ['B001', 'B002', 'B003', 'B004'];
const BOOK_META = {
  B001: { emoji: '🐍', label: 'Python Crash Course', price: 280_000, origPrice: 380_000, rating: 4.9, ratingCount: 142, publisher: 'Eric Matthes · No Starch Press', support: '—', cert: '—', link: '#books' },
  B002: { emoji: '⚡', label: 'Eloquent JavaScript',  price: 250_000, origPrice: 320_000, rating: 4.8, ratingCount: 98,  publisher: 'Marijn Haverbeke · No Starch Press', support: '—', cert: '—', link: '#books' },
  B003: { emoji: '⚛️', label: 'Learning React',        price: 260_000, origPrice: 340_000, rating: 4.9, ratingCount: 175, publisher: "Alex Banks · O'Reilly Media", support: '—', cert: '—', link: '#books' },
  B004: { emoji: '✨', label: 'Clean Code',             price: 210_000, origPrice: 280_000, rating: 4.7, ratingCount: 210, publisher: 'Robert C. Martin · Prentice Hall', support: '—', cert: '—', link: '#books' },
  COURSE: { emoji: '🎓', price: null, origPrice: null, rating: null, ratingCount: null, publisher: 'غلامرضا کریمی‌پور', link: '#course' },
};

const ROW_KEYS = ['type','price','topic','learningContent','level','format','support','cert','rating','publisher','careers'];

function getBetter(key, pA, pB) {
  if (key === 'price') {
    if (pA.price === null && pB.price !== null) return 'B';
    if (pB.price === null && pA.price !== null) return 'A';
    if (pA.price === null && pB.price === null) return 'both';
    return pA.price < pB.price ? 'A' : pB.price < pA.price ? 'B' : 'both';
  }
  if (key === 'rating') {
    if (!pA.rating && pB.rating) return 'B';
    if (pA.rating && !pB.rating) return 'A';
    if (!pA.rating && !pB.rating) return 'none';
    return pA.rating > pB.rating ? 'A' : pB.rating > pA.rating ? 'B' : 'both';
  }
  if (key === 'support' || key === 'cert') {
    const ha = pA[key]?.includes('✓'), hb = pB[key]?.includes('✓');
    return ha && !hb ? 'A' : hb && !ha ? 'B' : ha && hb ? 'both' : 'none';
  }
  return 'none';
}

function getCellValue(key, product, t, fmtNum, fmtPrice) {
  if (key === 'price')  return fmtPrice(product.price);
  if (key === 'rating') return product.rating
    ? `${product.rating} ⭐ (${fmtNum(product.ratingCount)} ${t('common.reviews')})`
    : t('common.na');
  if (key === 'publisher') return product.publisher;
  if (key === 'support') return product.support || '—';
  if (key === 'cert')    return product.cert    || '—';
  return product.t_data?.[key] || '—';
}

export default function Compare() {
  const { t, dir, fmtNum, fmtPrice } = useLocale();
  const [selA, setSelA] = useState('B001');
  const [selB, setSelB] = useState('COURSE');
  const [result, setResult] = useState(null);

  const ALL_IDS = [...BOOK_IDS, 'COURSE'];

  const buildProduct = (id) => {
    const meta  = BOOK_META[id];
    const tData = t(`compare.products.${id}`);
    return { id, ...meta, label: tData?.label || meta.label || id, t_data: tData };
  };

  const handleCompare = () => {
    setResult({ pA: buildProduct(selA), pB: buildProduct(selB) });
  };

  const getLabel = (id) => {
    const tData = t(`compare.products.${id}`);
    return `${BOOK_META[id].emoji} ${tData?.label || BOOK_META[id]?.label || id}`;
  };

  const pA = result?.pA;
  const pB = result?.pB;

  return (
    <section id="compare" className="cmp-section section" dir={dir}>
      <p className="cmp-label">{t('compare.sectionLabel')}</p>
      <h2 className="section-title">{t('compare.sectionTitle')}</h2>
      <div className="section-divider" />
      <p className="cmp-sub">{t('compare.sub')}</p>

      <div className="cmp-selectors">
        <div className="cmp-sel-wrap">
          <label className="cmp-sel-label">{t('compare.productA')}</label>
          <select className="cmp-select" value={selA}
            onChange={e => { setSelA(e.target.value); setResult(null); }}>
            {ALL_IDS.map(id => (
              <option key={id} value={id}>{getLabel(id)}</option>
            ))}
          </select>
        </div>

        <div className="cmp-vs">VS</div>

        <div className="cmp-sel-wrap">
          <label className="cmp-sel-label">{t('compare.productB')}</label>
          <select className="cmp-select" value={selB}
            onChange={e => { setSelB(e.target.value); setResult(null); }}>
            {ALL_IDS.map(id => (
              <option key={id} value={id}>{getLabel(id)}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="cmp-btn" onClick={handleCompare}>
        {t('compare.compareBtn')}
        <span className="cmp-btn-icon">⇄</span>
      </button>

      {result && (
        <div className="cmp-result">
          <div className="cmp-table-wrap">
            <table className="cmp-table">
              <thead>
                <tr>
                  <th className="cmp-th-attr">{/* attribute col */}</th>
                  <th className="cmp-th-prod">
                    <div className="cmp-prod-head">
                      <span className="cmp-prod-emoji">{pA.emoji}</span>
                      <span>{pA.label}</span>
                    </div>
                    <a href={pA.link} className="cmp-prod-link">{t('compare.viewBtn')}</a>
                  </th>
                  <th className="cmp-th-prod">
                    <div className="cmp-prod-head">
                      <span className="cmp-prod-emoji">{pB.emoji}</span>
                      <span>{pB.label}</span>
                    </div>
                    <a href={pB.link} className="cmp-prod-link">{t('compare.viewBtn')}</a>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROW_KEYS.map(key => {
                  const better = getBetter(key, pA, pB);
                  return (
                    <tr key={key} className="cmp-tr">
                      <td className="cmp-td-label">{t(`compare.rows.${key}`)}</td>
                      <td className={`cmp-td ${better === 'A' || better === 'both' ? 'cmp-td--win' : ''}`}>
                        {getCellValue(key, pA, t, fmtNum, fmtPrice)}
                      </td>
                      <td className={`cmp-td ${better === 'B' || better === 'both' ? 'cmp-td--win' : ''}`}>
                        {getCellValue(key, pB, t, fmtNum, fmtPrice)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cmp-ctas">
            <a href={pA.link} className="btn-primary">
              {pA.id === 'COURSE' ? t('compare.viewCourse') : t('compare.orderBook')} — {pA.emoji} {pA.label}
            </a>
            <a href={pB.link} className="btn-secondary">
              {pB.id === 'COURSE' ? t('compare.viewCourse') : t('compare.orderBook')} — {pB.emoji} {pB.label}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
