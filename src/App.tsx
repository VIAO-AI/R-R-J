import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from "@/components/ui/toaster"
import Admin from './pages/Admin';
import { LanguageContext } from './contexts/LanguageContext';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

function App() {
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <div className="App">
      <Router>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </LanguageContext.Provider>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
