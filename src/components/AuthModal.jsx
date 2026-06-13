import { useState } from 'react';
import { loginUser, registerUser } from '../utils/auth';
import { useLocale } from '../hooks/useLocale';
import './AuthModal.css';

/* ── Login screen ──────────────────────────────────────── */
function LoginScreen({ onSuccess, onRegister, onForgot, successMsg }) {
  const { t, dir } = useLocale();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginUser(username, password);
    if (result.ok) {
      onSuccess();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-screen" dir={dir}>
      <div className="auth-brand">GR<span>.</span></div>
      <h2 className="auth-title">{t('auth.title')}</h2>
      <p className="auth-subtitle">{t('auth.subtitle')}</p>

      {successMsg && <div className="auth-success-msg">{successMsg}</div>}
      {error       && <div className="auth-error-msg">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label>{t('login.username')}</label>
          <input
            type="text"
            placeholder={t('login.usernamePlaceholder')}
            value={username}
            onChange={e => { setUsername(e.target.value); setError(''); }}
            required
            autoFocus
          />
        </div>
        <div className="auth-field">
          <label>{t('login.password')}</label>
          <input
            type="password"
            placeholder={t('login.passwordPlaceholder')}
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            required
          />
        </div>
        <button type="submit" className="auth-btn-primary">{t('auth.loginBtn')}</button>
      </form>

      <div className="auth-divider"><span>{t('auth.divider')}</span></div>

      <div className="auth-links">
        <button className="auth-link" onClick={onRegister}>{t('auth.register')}</button>
        <span className="auth-sep" />
        <button className="auth-link" onClick={onForgot}>{t('auth.forgotPassword')}</button>
      </div>
    </div>
  );
}

/* ── Register screen ───────────────────────────────────── */
function RegisterScreen({ onBack }) {
  const { t, dir } = useLocale();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [gender,   setGender]   = useState('male');
  const [error,    setError]    = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) { setError(t('login.passwordMismatch')); return; }
    const result = registerUser(fullName, username, password, gender);
    if (result.ok) {
      onBack(t('login.registerSuccess', { username }));
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-screen" dir={dir}>
      <button className="auth-back" onClick={() => onBack('')}>{t('auth.back')}</button>
      <h2 className="auth-title">{t('login.registerTitle')}</h2>
      <p className="auth-subtitle">{t('login.registerSubtitle')}</p>

      {error && <div className="auth-error-msg">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label>{t('login.fullName')}</label>
          <input type="text" placeholder={t('login.fullNamePlaceholder')}
            value={fullName} onChange={e => { setFullName(e.target.value); setError(''); }} required autoFocus />
        </div>
        <div className="auth-field">
          <label>{t('login.username')}</label>
          <input type="text" placeholder={t('login.usernamePlaceholder2')}
            value={username} onChange={e => { setUsername(e.target.value); setError(''); }} required />
        </div>
        <div className="auth-field">
          <label>{t('login.password')}</label>
          <input type="password" placeholder={t('login.passwordStrong')}
            value={password} onChange={e => { setPassword(e.target.value); setError(''); }} required />
        </div>
        <div className="auth-field">
          <label>{t('login.confirmPassword')}</label>
          <input type="password" placeholder={t('login.confirmPasswordPlaceholder')}
            value={confirm} onChange={e => { setConfirm(e.target.value); setError(''); }} required />
        </div>
        <div className="auth-field">
          <label>{t('login.gender')}</label>
          <div className="auth-gender-options">
            <label className={`auth-gender-opt ${gender === 'male' ? 'selected' : ''}`}>
              <input type="radio" name="auth-gender" value="male"
                checked={gender === 'male'} onChange={() => setGender('male')} />
              <span>{t('login.male')}</span>
            </label>
            <label className={`auth-gender-opt ${gender === 'female' ? 'selected' : ''}`}>
              <input type="radio" name="auth-gender" value="female"
                checked={gender === 'female'} onChange={() => setGender('female')} />
              <span>{t('login.female')}</span>
            </label>
          </div>
        </div>
        <button type="submit" className="auth-btn-primary">{t('login.registerBtn')}</button>
      </form>
    </div>
  );
}

/* ── Forgot-password screen ────────────────────────────── */
function ForgotScreen({ onBack }) {
  const { t, dir } = useLocale();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="auth-screen auth-result" dir={dir}>
        <div className="auth-result-icon auth-result-icon--mail">✉</div>
        <h2>{t('auth.linkSentTitle')}</h2>
        <p>{t('auth.linkSentBody')}</p>
        <button className="auth-btn-secondary" onClick={() => onBack('')}>{t('auth.backToLogin')}</button>
      </div>
    );
  }

  return (
    <div className="auth-screen" dir={dir}>
      <button className="auth-back" onClick={() => onBack('')}>{t('auth.back')}</button>
      <h2 className="auth-title">{t('auth.forgotTitle')}</h2>
      <p className="auth-subtitle">{t('auth.forgotSubtitle')}</p>
      <form className="auth-form" onSubmit={e => { e.preventDefault(); setDone(true); }}>
        <div className="auth-field">
          <label>{t('auth.emailOrUsername')}</label>
          <input type="text" placeholder={t('auth.emailOrUsernamePlaceholder')} required autoFocus />
        </div>
        <button type="submit" className="auth-btn-primary">{t('auth.sendLink')}</button>
      </form>
    </div>
  );
}

/* ── Root modal ────────────────────────────────────────── */
export default function AuthModal({ onClose, onLoginSuccess }) {
  const { t } = useLocale();
  const [screen,     setScreen]     = useState('login');
  const [successMsg, setSuccessMsg] = useState('');

  return (
    <>
      <div className="auth-overlay" onClick={onClose} />
      <div className="auth-modal" role="dialog" aria-modal="true">
        <div className="auth-top-bar" />
        <button className="auth-close" onClick={onClose} aria-label={t('auth.close')}>✕</button>

        {screen === 'login' && (
          <LoginScreen
            onSuccess={onLoginSuccess}
            onRegister={() => { setSuccessMsg(''); setScreen('register'); }}
            onForgot={() => { setSuccessMsg(''); setScreen('forgot'); }}
            successMsg={successMsg}
          />
        )}
        {screen === 'register' && (
          <RegisterScreen onBack={(msg) => { setSuccessMsg(msg); setScreen('login'); }} />
        )}
        {screen === 'forgot' && (
          <ForgotScreen onBack={(msg) => { setSuccessMsg(msg); setScreen('login'); }} />
        )}
      </div>
    </>
  );
}
