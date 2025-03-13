
import React, { createContext, useState, useContext, useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en.json';
import esTranslation from '../locales/es.json';

// Initialize i18next
i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation
    },
    es: {
      translation: esTranslation
    }
  },
  lng: 'es', // Default language
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false
  }
});

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  toggleLanguage: () => void;
  translations: any;
}

const defaultContext: LanguageContextType = {
  language: 'es',
  setLanguage: () => {},
  toggleLanguage: () => {},
  translations: esTranslation // Initialize with esTranslation to avoid undefined
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('es');
  const [translations, setTranslations] = useState(esTranslation);

  // Add toggleLanguage function to switch between 'en' and 'es'
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'es' : 'en');
  };

  useEffect(() => {
    // Change language in i18next when language state changes
    i18next.changeLanguage(language);
    
    // Update translations state
    setTranslations(language === 'en' ? enTranslation : esTranslation);
    
    // Save preference to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  // Load saved language on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Make sure translations is never undefined
  const safeTranslations = translations || (language === 'en' ? enTranslation : esTranslation);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      toggleLanguage, 
      translations: safeTranslations 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
