import './Cart.css';

const COURSE     = { name: 'دوره برنامه‌نویسی غلامرضا' };
const UNIT_PRICE = 590000;
const fmtPrice   = n => n.toLocaleString('fa-IR') + ' تومان';

export default function Cart({ qty, onClose, onIncrease, onDecrease, onCheckout }) {
  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-panel" role="dialog" aria-label="سبد خرید">
        <div className="cart-header">
          <h3>سبد خرید</h3>
          <button className="cart-close" onClick={onClose} aria-label="بستن">✕</button>
        </div>

        {qty === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <p>سبد خرید شما خالی است</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              <div className="cart-item">
                <p className="cart-item-name">{COURSE.name}</p>
                <div className="cart-qty-controls">
                  <button
                    className="cart-qty-btn"
                    onClick={onDecrease}
                    aria-label="کاهش تعداد"
                  >−</button>
                  <span className="cart-qty-value">{qty}</span>
                  <button
                    className="cart-qty-btn"
                    onClick={onIncrease}
                    aria-label="افزایش تعداد"
                  >+</button>
                </div>
              </div>
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <span>تعداد:</span>
                <span>{qty} دوره</span>
              </div>
              <div className="cart-summary cart-summary-total">
                <span>مبلغ کل:</span>
                <span className="cart-total-price">{fmtPrice(qty * UNIT_PRICE)}</span>
              </div>
              <button className="cart-checkout-btn" onClick={onCheckout}>
                💳 پرداخت و خرید
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
