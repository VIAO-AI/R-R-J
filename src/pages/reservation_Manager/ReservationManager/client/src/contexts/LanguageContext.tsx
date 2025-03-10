import React, { createContext, useContext, useState } from 'react';

interface Translations {
  contact: {
    title: string;
    subtitle: string;
    address: string;
    hours: string;
    weekdays: string;
    weekend: string;
    phone: string;
    phoneNumber: string;
    formTitle: string;
  };
}

const defaultTranslations: Translations = {
  contact: {
    title: "Contact Us",
    subtitle: "Get in Touch",
    address: "1850 Cesar Chavez St, San Francisco, CA 94107, USA",
    hours: "Opening Hours",
    weekdays: "Monday - Friday: 11:00 AM - 10:00 PM",
    weekend: "Saturday - Sunday: 10:00 AM - 11:00 PM",
    phone: "Phone",
    phoneNumber: "+1 (555) 123-4567",
    formTitle: "Make a Reservation",
  },
};

const LanguageContext = createContext<{
  translations: Translations;
}>({
  translations: defaultTranslations,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [translations] = useState<Translations>(defaultTranslations);

  return (
    <LanguageContext.Provider value={{ translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
