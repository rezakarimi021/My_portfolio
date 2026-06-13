import './Toast.css';

const ICONS = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

function ToastItem({ id, message, type, onDismiss }) {
  return (
    <div className={`toast-item toast-item--${type}`} role="alert" dir="rtl">
      <span className="toast-icon">{ICONS[type]}</span>
      <span className="toast-msg">{message}</span>
      <button className="toast-close" onClick={() => onDismiss(id)} aria-label="بستن">✕</button>
    </div>
  );
}

export default function ToastContainer({ items, onDismiss }) {
  if (!items?.length) return null;
  return (
    <div className="toast-container" aria-live="polite">
      {items.map(t => <ToastItem key={t.id} {...t} onDismiss={onDismiss} />)}
    </div>
  );
}
