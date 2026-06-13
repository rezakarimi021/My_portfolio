import { useState } from 'react';
import './ProfilePage.css';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage({ onBack }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    bio: '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const CERTIFICATES = [
    { id:1, title:'دوره جامع React.js', date:'۱۴۰۳/۰۱/۱۵', emoji:'⚛️', gradient:'linear-gradient(135deg,#0ea5e9,#6366f1)' },
    { id:2, title:'JavaScript پیشرفته', date:'۱۴۰۳/۰۲/۲۰', emoji:'🟨', gradient:'linear-gradient(135deg,#f59e0b,#ef4444)' },
  ];

  return (
    <main className="pp-page" dir="rtl">
      <div className="pp-header">
        <button className="pp-back" onClick={onBack}>← بازگشت</button>
        <div className="pp-avatar-wrap">
          <div className="pp-avatar">
            {(user?.fullName || user?.username || 'U')[0].toUpperCase()}
          </div>
          <div>
            <h1 className="pp-username">{user?.fullName || user?.username}</h1>
            <p className="pp-join">عضو از ۱۴۰۳/۰۱/۰۱</p>
          </div>
        </div>
      </div>

      <div className="pp-content">
        <div className="pp-tabs">
          <button className={`pp-tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>اطلاعات شخصی</button>
          <button className={`pp-tab ${activeTab === 'certs' ? 'active' : ''}`} onClick={() => setActiveTab('certs')}>گواهینامه‌ها</button>
          <button className={`pp-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>امنیت</button>
        </div>

        {activeTab === 'info' && (
          <div className="pp-form glass-card">
            <h3 className="pp-form-title">ویرایش پروفایل</h3>
            <div className="pp-fields">
              <div className="pp-field">
                <label>نام و نام خانوادگی</label>
                <input
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="نام کامل خود را وارد کنید"
                />
              </div>
              <div className="pp-field">
                <label>ایمیل</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  dir="ltr"
                />
              </div>
              <div className="pp-field">
                <label>شماره موبایل</label>
                <input
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  dir="ltr"
                />
              </div>
              <div className="pp-field pp-field--full">
                <label>درباره من</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="خود را معرفی کنید…"
                />
              </div>
            </div>
            <button className="pp-save-btn" onClick={handleSave}>
              {saved ? '✅ ذخیره شد!' : 'ذخیره تغییرات'}
            </button>
          </div>
        )}

        {activeTab === 'certs' && (
          <div className="pp-certs">
            <h3 className="pp-section-title">گواهینامه‌های دریافتی</h3>
            {CERTIFICATES.length === 0 ? (
              <div className="pp-empty">هنوز گواهینامه‌ای دریافت نکرده‌اید 🎓</div>
            ) : (
              <div className="pp-cert-grid">
                {CERTIFICATES.map(cert => (
                  <div key={cert.id} className="pp-cert glass-card">
                    <div className="pp-cert-thumb" style={{ background: cert.gradient }}>
                      <span>{cert.emoji}</span>
                    </div>
                    <div className="pp-cert-info">
                      <h4>{cert.title}</h4>
                      <p>تاریخ صدور: {cert.date}</p>
                    </div>
                    <button className="pp-cert-dl">دانلود</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="pp-form glass-card">
            <h3 className="pp-form-title">تغییر رمز عبور</h3>
            <div className="pp-fields">
              <div className="pp-field">
                <label>رمز عبور فعلی</label>
                <input type="password" placeholder="••••••••" dir="ltr" />
              </div>
              <div className="pp-field">
                <label>رمز عبور جدید</label>
                <input type="password" placeholder="••••••••" dir="ltr" />
              </div>
              <div className="pp-field">
                <label>تکرار رمز عبور جدید</label>
                <input type="password" placeholder="••••••••" dir="ltr" />
              </div>
            </div>
            <button className="pp-save-btn">تغییر رمز عبور</button>
          </div>
        )}
      </div>
    </main>
  );
}
