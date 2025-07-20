'use client';

import * as React from 'react';
import { translations, Language, TranslationKey } from '@/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = React.createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>('en');

  const t = React.useCallback((key: TranslationKey): string => {
    return translations[language][key] || key;
  }, [language]);

  const contextValue = React.useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}