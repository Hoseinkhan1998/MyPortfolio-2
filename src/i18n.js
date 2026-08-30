import { createI18n } from 'vue-i18n';
import en from './locales/en.js';
import fa from './locales/fa.js';

// Define default locale
const defaultLocale = 'en';

// Try to get saved locale from localStorage
const getSavedLocale = () => {
  const saved = localStorage.getItem('user-locale');
  if (saved && (saved === 'en' || saved === 'fa')) {
    return saved;
  }
  return defaultLocale;
};

const i18n = createI18n({
  legacy: false, // use Composition API
  locale: getSavedLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    fa
  }
});

// Update document direction on locale change
export const setDocumentDirection = (locale) => {
  document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.lang = locale;
};

// Initialize direction based on current locale
setDocumentDirection(i18n.global.locale.value);

export default i18n;
