import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();
export const LANGUAGE_KEY = 'portfolio-language';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'nl'; }
    catch { return 'nl'; }
  });
  const text = translations[language];
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = text.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', text.meta.description);
    const metadata = {
      'og:title': text.meta.title, 'og:description': text.meta.description,
      'og:locale': text.meta.locale, 'og:locale:alternate': text.meta.alternateLocale,
      'og:image': text.meta.image, 'og:image:alt': text.meta.imageAlt,
      'twitter:title': text.meta.title, 'twitter:description': text.meta.description,
      'twitter:image': text.meta.image, 'twitter:image:alt': text.meta.imageAlt,
    };
    Object.entries(metadata).forEach(([name, content]) => {
      document.querySelector(`meta[property="${name}"], meta[name="${name}"]`)?.setAttribute('content', content);
    });
    try { localStorage.setItem(LANGUAGE_KEY, language); } catch { /* The switch also works without storage. */ }
  }, [language, text]);
  const value = useMemo(() => ({ language, text, toggleLanguage: () => setLanguage(current => current === 'en' ? 'nl' : 'en') }), [language, text]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
