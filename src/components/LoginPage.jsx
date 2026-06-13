import { useState, useCallback } from 'react';
import { loginUser, registerUser } from '../utils/auth';
import { useLocale } from '../hooks/useLocale';
import './LoginPage.css';

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const makePhrase = () =>
  Array.from({ length: 6 }, () => CHARSET[Math.floor(Math.random() * CHARSET.length)]).join('');

/* ── Login screen ──────────────────────────────────────── */
function LoginScreen({ onSuccess, onRegister, successMsg }) {
  const { t, dir } = useLocale();
  const [username,     setUsername]     = useState('');
  const [password,     setPassword]     = useState('');
  const [phraseAnswer, setPhraseAnswer] = useState('');
  const [phrase,       setPhrase]       = useState(makePhrase);
  const [error,        setError]        = useState('');

  const refreshPhrase = useCallback(() => {
    setPhrase(makePhrase());
    setPhraseAnswer('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phraseAnswer.toUpperCase() !== phrase) {
      setPhrase(makePhrase());
      setPhraseAnswer('');
      setError(t('login.captchaError'));
      return;
    }
    const result = loginUser(username, password);
    if (result.ok) {
      onSuccess();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="lp-screen" dir={dir}>
      <div className="lp-brand">GR<span>.</span></div>
      <h1 className="lp-title">{t('login.loginTitle')}</h1>
      <p className="lp-subtitle">{t('login.loginSubtitle')}</p>

      {successMsg && <div className="lp-success-msg">{successMsg}</div>}
      {error       && <div className="lp-error-msg">{error}</div>}

      <form className="lp-form" onSubmit={handleSubmit}>
        <div className="lp-field">
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
        <div className="lp-field">
          <label>{t('login.password')}</label>
          <input
            type="password"
            placeholder={t('login.passwordPlaceholder')}
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            required
          />
        </div>

        <div className="lp-field">
          <label>{t('login.captchaLabel')}</label>
          <div className="lp-captcha-row">
            <div className="lp-captcha-box" aria-label={t('login.captchaAriaLabel')}>
              {phrase.split('').map((ch, i) => (
                <span key={i} className="lp-captcha-char" style={{ '--i': i }}>
                  {ch}
                </span>
              ))}
            </div>
            <button type="button" className="lp-captcha-refresh" onClick={refreshPhrase} aria-label={t('login.captchaRefresh')}>
              ↻
            </button>
          </div>
          <input
            type="text"
            placeholder={t('login.captchaPlaceholder')}
            value={phraseAnswer}
            onChange={e => { setPhraseAnswer(e.target.value.toUpperCase()); setError(''); }}
            required
            maxLength={6}
            className="lp-captcha-input"
            autoComplete="off"
          />
        </div>

        <button type="submit" className="lp-btn-primary">{t('login.loginBtn')}</button>
      </form>

      <p className="lp-prompt">
        {t('login.noAccount')}{' '}
        <button className="lp-link" onClick={onRegister}>{t('login.registerLink')}</button>
      </p>
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
    <div className="lp-screen" dir={dir}>
      <div className="lp-brand">GR<span>.</span></div>
      <h1 className="lp-title">{t('login.registerTitle')}</h1>
      <p className="lp-subtitle">{t('login.registerSubtitle')}</p>

      {error && <div className="lp-error-msg">{error}</div>}

      <form className="lp-form" onSubmit={handleSubmit}>
        <div className="lp-field">
          <label>{t('login.fullName')}</label>
          <input
            type="text"
            placeholder={t('login.fullNamePlaceholder')}
            value={fullName}
            onChange={e => { setFullName(e.target.value); setError(''); }}
            required
            autoFocus
          />
        </div>
        <div className="lp-field">
          <label>{t('login.username')}</label>
          <input
            type="text"
            placeholder={t('login.usernamePlaceholder2')}
            value={username}
            onChange={e => { setUsername(e.target.value); setError(''); }}
            required
          />
        </div>
        <div className="lp-field">
          <label>{t('login.password')}</label>
          <input
            type="password"
            placeholder={t('login.passwordStrong')}
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            required
          />
        </div>
        <div className="lp-field">
          <label>{t('login.confirmPassword')}</label>
          <input
            type="password"
            placeholder={t('login.confirmPasswordPlaceholder')}
            value={confirm}
            onChange={e => { setConfirm(e.target.value); setError(''); }}
            required
          />
        </div>
        <div className="lp-field">
          <label>{t('login.gender')}</label>
          <div className="lp-gender-options">
            <label className={`lp-gender-opt ${gender === 'male' ? 'selected' : ''}`}>
              <input type="radio" name="gender" value="male"
                checked={gender === 'male'} onChange={() => setGender('male')} />
              <span>{t('login.male')}</span>
            </label>
            <label className={`lp-gender-opt ${gender === 'female' ? 'selected' : ''}`}>
              <input type="radio" name="gender" value="female"
                checked={gender === 'female'} onChange={() => setGender('female')} />
              <span>{t('login.female')}</span>
            </label>
          </div>
        </div>
        <button type="submit" className="lp-btn-primary">{t('login.registerBtn')}</button>
      </form>

      <p className="lp-prompt">
        {t('login.alreadyHaveAccount')}{' '}
        <button className="lp-link" onClick={() => onBack('')}>{t('login.loginLink')}</button>
      </p>
    </div>
  );
}

/* ── Root ──────────────────────────────────────────────── */
export default function LoginPage({ onLogin }) {
  const [screen,     setScreen]     = useState('login');
  const [successMsg, setSuccessMsg] = useState('');

  return (
    <div className="login-page">
      <div className="lp-bg" />
      <div className="lp-card">
        <div className="lp-card-bar" />
        {screen === 'login' ? (
          <LoginScreen
            onSuccess={onLogin}
            onRegister={() => { setSuccessMsg(''); setScreen('register'); }}
            successMsg={successMsg}
          />
        ) : (
          <RegisterScreen
            onBack={(msg) => { setSuccessMsg(msg); setScreen('login'); }}
          />
        )}
      </div>
    </div>
  );
}
