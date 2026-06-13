import { useState } from 'react';
import './Contact.css';
import { useLocale } from '../hooks/useLocale';

export default function Contact() {
  const { t, dir } = useLocale();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent]  = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); setSent(true); };

  return (
    <section id="contact" className="contact section">
      <h2 className="section-title">{t('contact.sectionTitle')}</h2>
      <div className="section-divider" />

      <div className="contact-wrapper">
        <div className="contact-info" dir={dir}>
          <h3>{t('contact.heading')}</h3>
          <p>{t('contact.intro')}</p>
          <ul className="contact-list">
            <li>
              <span className="contact-icon">📧</span>
              <a href="mailto:gh55281393@gmail.com">gh55281393@gmail.com</a>
            </li>
            <li>
              <span className="contact-icon">💼</span>
              <a href="#" target="_blank" rel="noreferrer">{t('contact.linkedin')}</a>
            </li>
            <li>
              <span className="contact-icon">🐙</span>
              <a href="#" target="_blank" rel="noreferrer">{t('contact.github')}</a>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} dir={dir}>
          {sent ? (
            <div className="success-msg">
              <span>✅</span>
              <p>{t('contact.formSuccess')}</p>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="name">{t('contact.formName')}</label>
                <input id="name" name="name" type="text" placeholder={t('contact.formNamePlaceholder')}
                  value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contact.formEmail')}</label>
                <input id="email" name="email" type="email" placeholder="example@email.com"
                  value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">{t('contact.formMessage')}</label>
                <textarea id="message" name="message" rows="5"
                  placeholder={t('contact.formMessagePlaceholder')}
                  value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                {t('contact.formSubmit')}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
