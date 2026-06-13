import { useState } from 'react';
import './BookCheckout.css';
import { PROVINCES, PROVINCE_CITIES, calcShipping, DELIVERY_DAYS, saveBookOrder } from '../utils/shipping';
import { getCurrentUser } from '../utils/auth';

const CARD_NUMBER = '6219861816266943';
const CARD_BANK   = 'بانک ملت';
const CARD_HOLDER = 'غلامرضا کریمی‌پور';

const fmt = n => n.toLocaleString('fa-IR') + ' تومان';

const fmtDate = () => new Date().toLocaleString('fa-IR', {
  year: 'numeric', month: 'long', day: 'numeric',
  hour: '2-digit', minute: '2-digit',
});

const STEPS = ['آدرس تحویل', 'روش ارسال', 'پرداخت'];

export default function BookCheckout({ book, onClose, onSuccess }) {
  const [step,    setStep]    = useState(0);
  const [method,  setMethod]  = useState('standard');
  const [payTab,  setPayTab]  = useState('card');
  const [copied,  setCopied]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [receipt, setReceipt] = useState(null);
  const [done,    setDone]    = useState(false);

  const [addr, setAddr] = useState({
    name: '', phone: '', province: '', city: '', address: '', postalCode: '', refId: '',
  });

  const ship = addr.province
    ? calcShipping(addr.province, book.weight, method)
    : null;

  const total = book.price + (ship?.cost ?? 0);

  const handleAddr = e => {
    const { name, value } = e.target;
    setAddr(a => ({
      ...a,
      [name]: value,
      ...(name === 'province' ? { city: '' } : {}),
    }));
  };

  const cities = PROVINCE_CITIES[addr.province] ?? [];

  const validateStep0 = () => {
    if (!addr.name.trim())     return 'لطفاً نام گیرنده را وارد کنید.';
    if (!addr.phone.trim())    return 'لطفاً شماره موبایل را وارد کنید.';
    if (!/^09\d{9}$/.test(addr.phone.replace(/\s/g,''))) return 'شماره موبایل معتبر نیست.';
    if (!addr.province)        return 'لطفاً استان را انتخاب کنید.';
    if (!addr.city)            return 'لطفاً شهر را انتخاب کنید.';
    if (!addr.address.trim())  return 'لطفاً آدرس کامل را وارد کنید.';
    return null;
  };

  const handleNext = () => {
    setError('');
    if (step === 0) {
      const err = validateStep0();
      if (err) return setError(err);
    }
    setStep(s => s + 1);
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(CARD_NUMBER); setCopied(true); setTimeout(() => setCopied(false), 2200); }
    catch {}
  };

  const submitOrder = (payMethod) => {
    const order = saveBookOrder({
      bookId: book.id, bookTitle: book.title,
      bookPrice: book.price, shippingCost: ship?.cost ?? 0, total,
      paymentMethod: payMethod,
      refId: payMethod === 'card' ? addr.refId : 'ZP-' + Date.now(),
      shipping: {
        name: addr.name, phone: addr.phone,
        province: addr.province, city: addr.city,
        address: addr.address, postalCode: addr.postalCode,
        method, zone: ship?.zone, days: ship?.days,
      },
      buyer: getCurrentUser()?.username,
    });
    setReceipt(order);
    setDone(true);
  };

  const handleCardSubmit = e => {
    e.preventDefault();
    if (!addr.refId.trim()) return setError('لطفاً کد پیگیری تراکنش را وارد کنید.');
    setError('');
    submitOrder('card');
  };

  const handleOnline = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); submitOrder('online'); }, 2400);
  };

  /* ── Success ── */
  if (done) {
    return (
      <div className="bco-overlay">
        <div className="bco-box bco-box--success" dir="rtl">
          <div className="bco-success-icon">✅</div>
          <h2 className="bco-success-title">سفارش ثبت شد!</h2>
          <p className="bco-success-msg">
            {payTab === 'card'
              ? 'پس از تأیید پرداخت، کتاب در اسرع وقت ارسال می‌شود.'
              : 'پرداخت تأیید شد. کتاب به زودی ارسال خواهد شد 📦'}
          </p>
          <div className="bco-receipt">
            <div className="bco-row"><span>شناسه سفارش</span><strong dir="ltr">#{receipt?.id?.slice(-8)}</strong></div>
            <div className="bco-row"><span>کتاب</span><strong>{book.title}</strong></div>
            <div className="bco-row"><span>استان مقصد</span><strong>{addr.province}</strong></div>
            <div className="bco-row"><span>روش ارسال</span><strong>{method === 'standard' ? 'پست عادی' : 'پست پیشتاز'}</strong></div>
            <div className="bco-row"><span>هزینه ارسال</span><strong>{fmt(ship?.cost ?? 0)}</strong></div>
            <div className="bco-row"><span>مبلغ کل</span><strong className="bco-total">{fmt(total)}</strong></div>
            <div className="bco-row"><span>تاریخ ثبت</span><strong>{fmtDate()}</strong></div>
            <div className="bco-row">
              <span>وضعیت</span>
              <strong className={`bco-status ${payTab === 'online' ? 'bco-status--ok' : 'bco-status--pending'}`}>
                {payTab === 'online' ? '✅ تأییدشده' : '⏳ در انتظار تأیید'}
              </strong>
            </div>
          </div>
          <button className="bco-btn-primary" onClick={onSuccess}>بستن</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bco-overlay" dir="rtl">
      <div className="bco-box">

        {/* Header */}
        <div className="bco-header">
          <div>
            <h2 className="bco-header-title">سفارش کتاب</h2>
            <p className="bco-header-book">{book.title}</p>
          </div>
          <button className="bco-close" onClick={onClose} aria-label="بستن">✕</button>
        </div>

        {/* Step indicator */}
        <div className="bco-steps">
          {STEPS.map((s, i) => (
            <div key={s} className={`bco-step ${i <= step ? 'bco-step--active' : ''} ${i < step ? 'bco-step--done' : ''}`}>
              <div className="bco-step-circle">
                {i < step ? '✓' : i + 1}
              </div>
              <span className="bco-step-label">{s}</span>
            </div>
          ))}
        </div>

        {/* ── Step 0: Address ── */}
        {step === 0 && (
          <div className="bco-body">
            <p className="bco-step-hint">اطلاعات ارسال را وارد کنید</p>
            <div className="bco-form-grid">
              <div className="bco-field">
                <label>نام گیرنده</label>
                <input name="name" value={addr.name} onChange={handleAddr}
                       placeholder="نام و نام خانوادگی" dir="rtl" />
              </div>
              <div className="bco-field">
                <label>شماره موبایل</label>
                <input name="phone" value={addr.phone} onChange={handleAddr}
                       placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" type="tel" />
              </div>
              <div className="bco-field">
                <label>استان</label>
                <select name="province" value={addr.province} onChange={handleAddr}>
                  <option value="">انتخاب استان…</option>
                  {PROVINCES.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="bco-field">
                <label>شهر</label>
                <select name="city" value={addr.city} onChange={handleAddr}
                        disabled={!addr.province}>
                  <option value="">
                    {addr.province ? 'انتخاب شهر…' : 'ابتدا استان را انتخاب کنید'}
                  </option>
                  {cities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="bco-field bco-field--full">
                <label>آدرس کامل</label>
                <textarea name="address" value={addr.address} onChange={handleAddr}
                          placeholder="خیابان، کوچه، پلاک، واحد" dir="rtl" rows={3} />
              </div>
              <div className="bco-field">
                <label>کد پستی <span className="bco-optional">(اختیاری)</span></label>
                <input name="postalCode" value={addr.postalCode} onChange={handleAddr}
                       placeholder="۱۲۳۴۵۶۷۸۹۰" dir="ltr" maxLength={10} />
              </div>
            </div>
            {error && <p className="bco-error" role="alert">⚠️ {error}</p>}
            <button className="bco-btn-primary" onClick={handleNext}>مرحله بعد ← </button>
          </div>
        )}

        {/* ── Step 1: Shipping ── */}
        {step === 1 && ship && (
          <div className="bco-body">
            <p className="bco-step-hint">روش ارسال خود را انتخاب کنید</p>

            <div className="bco-zone-info">
              <span className="bco-zone-badge">منطقه {ship.zone}</span>
              <span>{ship.label}</span>
              <span className="bco-zone-dist">({ship.distance})</span>
            </div>

            <div className="bco-ship-opts">
              {(['standard', 'express']).map(m => {
                const s = calcShipping(addr.province, book.weight, m);
                const days = DELIVERY_DAYS[m][s.zone];
                return (
                  <label key={m} className={`bco-ship-opt ${method === m ? 'bco-ship-opt--active' : ''}`}>
                    <input type="radio" name="method" value={m}
                           checked={method === m} onChange={() => setMethod(m)} />
                    <div className="bco-ship-opt-body">
                      <div className="bco-ship-opt-name">
                        {m === 'standard' ? '📦 پست عادی' : '🚀 پست پیشتاز'}
                      </div>
                      <div className="bco-ship-opt-days">{days} روز کاری</div>
                    </div>
                    <div className="bco-ship-opt-price">{fmt(s.cost)}</div>
                  </label>
                );
              })}
            </div>

            <div className="bco-cost-summary">
              <div className="bco-cost-row"><span>قیمت کتاب</span><strong>{fmt(book.price)}</strong></div>
              <div className="bco-cost-row"><span>هزینه ارسال ({method === 'standard' ? 'عادی' : 'پیشتاز'})</span><strong>{fmt(ship.cost)}</strong></div>
              <div className="bco-cost-row bco-cost-total"><span>مبلغ قابل پرداخت</span><strong className="bco-total-price">{fmt(total)}</strong></div>
            </div>

            <div className="bco-nav">
              <button className="bco-btn-secondary" onClick={() => setStep(0)}>← برگشت</button>
              <button className="bco-btn-primary" onClick={handleNext}>ادامه به پرداخت ←</button>
            </div>
          </div>
        )}

        {/* ── Step 2: Payment ── */}
        {step === 2 && (
          <div className="bco-body">
            <div className="bco-pay-tabs">
              <button className={`bco-pay-tab ${payTab === 'card' ? 'active' : ''}`} onClick={() => setPayTab('card')}>
                💳 کارت به کارت
              </button>
              <button className={`bco-pay-tab ${payTab === 'online' ? 'active' : ''}`} onClick={() => setPayTab('online')}>
                🔒 درگاه زرین‌پال
              </button>
            </div>

            {payTab === 'card' && (
              <form onSubmit={handleCardSubmit} noValidate>
                <p className="bco-step-hint">
                  مبلغ <strong>{fmt(total)}</strong> را به شماره کارت زیر واریز کنید
                </p>
                <div className="bco-card-display">
                  <div className="bco-card-chip" />
                  <div className="bco-card-num" dir="ltr">
                    {CARD_NUMBER.match(/.{1,4}/g).join('  –  ')}
                  </div>
                  <div className="bco-card-meta">
                    <span>{CARD_HOLDER}</span>
                    <span>{CARD_BANK}</span>
                  </div>
                  <button type="button"
                          className={`bco-copy-btn ${copied ? 'copied' : ''}`}
                          onClick={handleCopy}>
                    {copied ? '✓ کپی شد' : '📋 کپی شماره کارت'}
                  </button>
                </div>
                <div className="bco-field">
                  <label>کد پیگیری تراکنش</label>
                  <input name="refId" value={addr.refId} onChange={handleAddr}
                         placeholder="کد رهگیری بانک" dir="ltr" />
                </div>
                {error && <p className="bco-error" role="alert">⚠️ {error}</p>}
                <div className="bco-nav">
                  <button type="button" className="bco-btn-secondary" onClick={() => setStep(1)}>← برگشت</button>
                  <button type="submit" className="bco-btn-primary">✅ ثبت سفارش</button>
                </div>
              </form>
            )}

            {payTab === 'online' && (
              <div>
                <p className="bco-step-hint">پرداخت از طریق درگاه امن زرین‌پال</p>
                <div className="bco-zp-box">
                  <div className="bco-zp-logo"><span className="bco-zp-z">Z</span> ZarinPal</div>
                  <div className="bco-zp-amount">{fmt(total)}</div>
                  <div className="bco-zp-feats">
                    <span>🔒 SSL</span>
                    <span>🏦 همه بانک‌ها</span>
                    <span>💳 شتاب</span>
                  </div>
                </div>
                <div className="bco-nav">
                  <button className="bco-btn-secondary" onClick={() => setStep(1)}>← برگشت</button>
                  <button
                    className={`bco-btn-primary bco-btn-zp ${loading ? 'loading' : ''}`}
                    onClick={handleOnline} disabled={loading}
                  >
                    {loading
                      ? <><span className="bco-spinner" /> در حال انتقال…</>
                      : '🔒 پرداخت آنلاین'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
