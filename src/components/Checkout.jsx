import { useState } from 'react';
import './Checkout.css';
import { savePurchase, getCurrentUser } from '../utils/auth';

const CARD_NUMBER  = '6219861816266943';
const CARD_BANK    = 'بانک ملت';
const CARD_HOLDER  = 'غلامرضا کریمی‌پور';
const UNIT_PRICE   = 590_000;

const fmtPrice = n => n.toLocaleString('fa-IR') + ' تومان';
const fmtCard  = n => n.match(/.{1,4}/g).join('  –  ');
const fmtDate  = () => new Date().toLocaleString('fa-IR', {
  year:'numeric', month:'long', day:'numeric',
  hour:'2-digit', minute:'2-digit',
});

const FIELDS = [
  { name:'name',  label:'نام پرداخت‌کننده', type:'text',  placeholder:'نام و نام خانوادگی',       dir:'rtl' },
  { name:'phone', label:'شماره موبایل',      type:'tel',   placeholder:'۰۹۱۲۳۴۵۶۷۸۹',            dir:'ltr' },
  { name:'refId', label:'کد پیگیری تراکنش', type:'text',  placeholder:'کد رهگیری بانک',           dir:'ltr' },
];

export default function Checkout({ qty, onClose, onSuccess }) {
  const [tab,     setTab]     = useState('card');
  const [step,    setStep]    = useState('pay');
  const [copied,  setCopied]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [receipt, setReceipt] = useState(null);
  const [form,    setForm]    = useState({ name: '', phone: '', refId: '' });

  const total = qty * UNIT_PRICE;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CARD_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const validateCard = () => {
    if (!form.name.trim())  return 'لطفاً نام پرداخت‌کننده را وارد کنید.';
    if (!form.phone.trim()) return 'لطفاً شماره موبایل را وارد کنید.';
    if (!/^09\d{9}$/.test(form.phone.replace(/\s/g, '')))
      return 'شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹).';
    if (!form.refId.trim()) return 'لطفاً کد پیگیری تراکنش را وارد کنید.';
    return null;
  };

  const handleSubmitCard = e => {
    e.preventDefault();
    const err = validateCard();
    if (err) return setError(err);
    setError('');
    const p = savePurchase({
      username: getCurrentUser()?.username,
      courseName: 'بسته کامل دوره‌های برنامه‌نویسی',
      amount: total, qty, paymentMethod: 'card',
      refId: form.refId, payerName: form.name, payerPhone: form.phone,
    });
    setReceipt(p);
    setStep('success');
  };

  const handleGateway = () => {
    setLoading(true);
    setTimeout(() => {
      const p = savePurchase({
        username: getCurrentUser()?.username,
        courseName: 'بسته کامل دوره‌های برنامه‌نویسی',
        amount: total, qty, paymentMethod: 'online',
        refId: 'ZP-' + Date.now(),
      });
      setReceipt(p);
      setLoading(false);
      setStep('success');
    }, 2400);
  };

  /* ── Success screen ─────────────────────────────────────── */
  if (step === 'success') {
    return (
      <div className="checkout-overlay">
        <div className="checkout-box checkout-success-box" dir="rtl">
          <div className="cks-icon">✅</div>
          <h2 className="cks-title">
            {tab === 'card' ? 'اطلاعات پرداخت ثبت شد' : 'پرداخت آنلاین موفق بود'}
          </h2>
          <p className="cks-msg">
            {tab === 'card'
              ? 'پس از تأیید واریز توسط مدرس، دسترسی فوری به همه دوره‌ها فعال می‌شود.'
              : 'دسترسی شما به همه ۶ دوره هم‌اکنون فعال است. موفق باشید! 🎓'}
          </p>

          <div className="cks-receipt">
            <div className="cks-row">
              <span>شناسه سفارش</span>
              <strong dir="ltr">#{receipt?.id?.slice(-8)}</strong>
            </div>
            <div className="cks-row">
              <span>تاریخ پرداخت</span>
              <strong>{fmtDate()}</strong>
            </div>
            <div className="cks-row">
              <span>مبلغ پرداختی</span>
              <strong>{fmtPrice(total)}</strong>
            </div>
            <div className="cks-row">
              <span>وضعیت</span>
              <strong className={`cks-status cks-status--${tab === 'online' ? 'ok' : 'pending'}`}>
                {tab === 'online' ? '✅ تأییدشده' : '⏳ در انتظار تأیید'}
              </strong>
            </div>
          </div>

          <div className="cks-actions">
            <button className="checkout-btn-primary" onClick={onSuccess}>
              🎓 مشاهده دوره‌های من
            </button>
            <button className="checkout-btn-secondary" onClick={() => window.print()}>
              🖨️ چاپ رسید
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Payment form ───────────────────────────────────────── */
  return (
    <div className="checkout-overlay" dir="rtl">
      <div className="checkout-box">

        {/* Header */}
        <div className="checkout-header">
          <div>
            <h2>پرداخت امن</h2>
            <p className="checkout-header-sub">محافظت‌شده با رمزنگاری SSL</p>
          </div>
          <button className="checkout-close" onClick={onClose} aria-label="بستن">✕</button>
        </div>

        {/* Order summary */}
        <div className="checkout-summary">
          <div className="checkout-summary-row">
            <span>🎓 بسته کامل دوره‌های برنامه‌نویسی</span>
            <strong>{qty} دوره</strong>
          </div>
          <div className="checkout-summary-row">
            <span>قیمت واحد</span>
            <strong>{fmtPrice(UNIT_PRICE)}</strong>
          </div>
          {qty > 1 && (
            <div className="checkout-summary-row">
              <span>تعداد</span>
              <strong>× {qty}</strong>
            </div>
          )}
          <div className="checkout-summary-row checkout-summary-total">
            <span>مبلغ قابل پرداخت</span>
            <strong className="checkout-total-price">{fmtPrice(total)}</strong>
          </div>
        </div>

        {/* Tabs */}
        <div className="checkout-tabs">
          <button className={`checkout-tab${tab === 'card'   ? ' active' : ''}`} onClick={() => setTab('card')}>
            💳 کارت به کارت
          </button>
          <button className={`checkout-tab${tab === 'online' ? ' active' : ''}`} onClick={() => setTab('online')}>
            🔒 درگاه زرین‌پال
          </button>
        </div>

        {/* ── Card-to-card ── */}
        {tab === 'card' && (
          <div className="checkout-tab-body">
            <p className="checkout-instruction">
              مبلغ <strong>{fmtPrice(total)}</strong> را به شماره کارت زیر واریز کرده و فرم را تکمیل کنید.
            </p>

            <div className="checkout-card">
              <div className="checkout-card-chip" />
              <div className="checkout-card-number">{fmtCard(CARD_NUMBER)}</div>
              <div className="checkout-card-meta">
                <div>
                  <p className="checkout-card-label">صاحب حساب</p>
                  <p className="checkout-card-value">{CARD_HOLDER}</p>
                </div>
                <div>
                  <p className="checkout-card-label">بانک</p>
                  <p className="checkout-card-value">{CARD_BANK}</p>
                </div>
              </div>
              <button className={`checkout-copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
                {copied ? '✓ کپی شد!' : '📋 کپی شماره کارت'}
              </button>
            </div>

            <form className="checkout-form" onSubmit={handleSubmitCard} noValidate>
              {FIELDS.map(f => (
                <div key={f.name} className="checkout-field">
                  <label htmlFor={f.name}>{f.label}</label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    dir={f.dir}
                    value={form[f.name]}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
              ))}
              {error && <p className="checkout-error" role="alert">⚠️ {error}</p>}
              <button type="submit" className="checkout-btn-primary">
                ✅ ثبت اطلاعات پرداخت
              </button>
            </form>
          </div>
        )}

        {/* ── Online gateway (ZarinPal) ── */}
        {tab === 'online' && (
          <div className="checkout-tab-body">
            <p className="checkout-instruction">
              پس از کلیک روی دکمه زیر به صفحه پرداخت امن منتقل می‌شوید.
            </p>

            <div className="checkout-zp-box">
              <div className="checkout-zp-logo">
                <span className="checkout-zp-z">Z</span>
                <span className="checkout-zp-text">ZarinPal</span>
              </div>
              <div className="checkout-zp-divider" />
              <p className="checkout-zp-amount">{fmtPrice(total)}</p>
              <div className="checkout-zp-features">
                <span>🔒 SSL رمزنگاری‌شده</span>
                <span>🏦 همه بانک‌های ایران</span>
                <span>💳 شتاب و سیبا</span>
              </div>
            </div>

            <button
              className={`checkout-btn-primary checkout-btn-zp${loading ? ' loading' : ''}`}
              onClick={handleGateway}
              disabled={loading}
            >
              {loading
                ? <><span className="checkout-spinner" /> در حال انتقال به درگاه...</>
                : '🔒 پرداخت از طریق زرین‌پال'}
            </button>

            <p className="checkout-gateway-hint">
              <strong>راه‌اندازی درگاه واقعی:</strong> برای فعال‌سازی پرداخت آنلاین واقعی،
              نیاز به دریافت Merchant ID از{' '}
              <a href="https://www.zarinpal.com" target="_blank" rel="noopener noreferrer">
                پنل زرین‌پال
              </a>
              {' '}و ثبت آن در بک‌اند سایت دارید.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
