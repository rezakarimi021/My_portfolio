import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fa from './locales/fa.json';
import en from './locales/en.json';

const savedLang = localStorage.getItem('i18n_lang') || 'fa';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fa: { translation: fa },
      en: { translation: en },
    },
    lng: savedLang,
    fallbackLng: 'fa',
    interpolation: { escapeValue: false },
    returnObjects: true,
  });

export default i18n;
