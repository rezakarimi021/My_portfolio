import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './style.css';
import i18n from './i18n/index.js';
import App from './App.jsx';

// Apply direction before first render so there's no flash
const initLang = i18n.language;
document.documentElement.dir  = i18n.dir(initLang);
document.documentElement.lang = initLang;
import { AuthProvider }  from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
