import { useState, useEffect } from 'react';
import './ExitIntentModal.css';

export default function ExitIntentModal({ onBuy }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const triggered = sessionStorage.getItem('exit_intent_shown');
    if (triggered) return;

    const handle = (e) => {
      if (e.clientY < 20 && !dismissed) {
        setVisible(true);
        sessionStorage.setItem('exit_intent_shown', '1');
      }
    };
    document.addEventListener('mouseleave', handle);
    return () => document.removeEventListener('mouseleave', handle);
  }, [dismissed]);

  const close = () => { setVisible(false); setDismissed(true); };

  const handleBuy = () => { close(); onBuy?.(); };

  if (!visible) return null;

  return (
    <div className="eim-overlay" onClick={close}>
      <div className="eim-box" onClick={e => e.stopPropagation()}>
        <button className="eim-close" onClick={close}>✕</button>
        <div className="eim-emoji">🎁</div>
        <h2 className="eim-title">صبر کن! ۱۰٪ تخفیف برای تو داریم</h2>
        <p className="eim-desc">
          فقط امروز با کد تخفیف <strong>FIRST10</strong> روی اولین خریدت ۱۰٪ تخفیف بگیر.
          این پیشنهاد در ۲۴ ساعت منقضی می‌شود.
        </p>
        <div className="eim-code">
          <span>FIRST10</span>
        </div>
        <button className="eim-btn" onClick={handleBuy}>
          از تخفیف استفاده می‌کنم
        </button>
        <button className="eim-skip" onClick={close}>نه ممنون، می‌رم</button>
      </div>
    </div>
  );
}
