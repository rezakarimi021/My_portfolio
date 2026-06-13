import { useState, useEffect } from 'react';
import './DiscountTimer.css';

function pad(n) { return String(n).padStart(2, '0'); }

export default function DiscountTimer({ endDate, label = 'تخفیف تا پایان:' }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0, expired: false });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(endDate) - Date.now();
      if (diff <= 0) { setTimeLeft({ h: 0, m: 0, s: 0, expired: true }); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s, expired: false });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  if (timeLeft.expired) return null;

  return (
    <div className="dtimer" dir="rtl">
      <span className="dtimer-label">🔥 {label}</span>
      <div className="dtimer-blocks">
        <div className="dtimer-block">
          <span className="dtimer-num">{pad(timeLeft.h)}</span>
          <span className="dtimer-unit">ساعت</span>
        </div>
        <span className="dtimer-colon">:</span>
        <div className="dtimer-block">
          <span className="dtimer-num">{pad(timeLeft.m)}</span>
          <span className="dtimer-unit">دقیقه</span>
        </div>
        <span className="dtimer-colon">:</span>
        <div className="dtimer-block">
          <span className="dtimer-num">{pad(timeLeft.s)}</span>
          <span className="dtimer-unit">ثانیه</span>
        </div>
      </div>
    </div>
  );
}
