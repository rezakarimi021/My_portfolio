import { useTranslation } from 'react-i18next';

export function useLocale() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = i18n.dir();
  const numLocale = lang === 'fa' ? 'fa-IR' : 'en-US';

  const fmtNum = (n) => (n == null ? '' : Number(n).toLocaleString(numLocale));
  const fmtPrice = (n) =>
    n != null ? `${fmtNum(n)} ${t('common.toman')}` : t('common.contactForPrice');
  const fmtPercent = (n) =>
    lang === 'fa' ? `٪${fmtNum(n)}` : `${n}%`;

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18n_lang', newLang);
    document.documentElement.dir  = i18n.dir(newLang);
    document.documentElement.lang = newLang;
  };

  return { t, i18n, lang, dir, fmtNum, fmtPrice, fmtPercent, changeLang };
}
