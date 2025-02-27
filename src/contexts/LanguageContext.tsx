
import React, { createContext, useState, useContext, ReactNode } from "react";

// English translations
const enTranslations = {
  nav: {
    home: "Home",
    menu: "Menu",
    about: "About Us",
    contact: "Contact",
    reservation: "Reserve a Table"
  },
  hero: {
    subtitle: "Authentic Peruvian Cuisine",
    title: "El Rincón de Jorgito",
    description: "Experience the genuine flavors of Peru in the heart of San Francisco. Our carefully crafted dishes bring the essence of Peruvian culinary tradition to your table.",
    cta: "Reserve a Table"
  },
  about: {
    subtitle: "Our Story",
    title: "A Taste of Peru in San Francisco",
    story: "El Rincón de Jorgito began with a simple vision: to share the rich culinary heritage of Peru with San Francisco. Founded by Jorge Mendoza in 2015, our restaurant combines traditional techniques with locally sourced ingredients to create an authentic yet innovative dining experience.",
    vision: "Every dish tells a story of Peru's diverse cultural influences – from indigenous Andean traditions to Spanish, African, Chinese, and Japanese cuisines that have shaped Peru's gastronomic landscape.",
    chef: "About the Chef",
    chefDesc: "Chef Jorge Mendoza brings over 20 years of experience, having trained in Lima's finest restaurants before bringing his expertise to California. His passion for Peruvian flavors and dedication to culinary excellence defines every aspect of El Rincón de Jorgito."
  },
  menu: {
    subtitle: "Our Offerings",
    title: "Menu",
    starters: "Starters",
    mains: "Main Courses",
    desserts: "Desserts",
    drinks: "Beverages"
  },
  contact: {
    subtitle: "Get in Touch",
    title: "Visit Us",
    address: "1850 Cesar Chavez St, San Francisco, CA 94107",
    hours: "Opening Hours",
    weekdays: "Monday - Thursday: 11:30am - 10pm",
    weekend: "Friday - Sunday: 11:30am - 11pm",
    phone: "Phone",
    phoneNumber: "(415) 555-0123",
    email: "Email",
    emailAddress: "info@rinconjorgito.com",
    formTitle: "Make a Reservation",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    dateLabel: "Date",
    timeLabel: "Time",
    guestsLabel: "Number of Guests",
    messageLabel: "Special Requests",
    submitButton: "Reserve Now"
  },
  payment: {
    title: "Payment Methods",
    desc: "We accept various payment methods for your convenience",
    applePay: "Apple Pay",
    creditCard: "Credit Card",
    cash: "Cash"
  },
  footer: {
    rights: "All Rights Reserved",
    privacy: "Privacy Policy",
    terms: "Terms of Service"
  }
};

// Spanish translations
const esTranslations = {
  nav: {
    home: "Inicio",
    menu: "Menú",
    about: "Nosotros",
    contact: "Contacto",
    reservation: "Reservar Mesa"
  },
  hero: {
    subtitle: "Auténtica Cocina Peruana",
    title: "El Rincón de Jorgito",
    description: "Experimenta los auténticos sabores de Perú en el corazón de San Francisco. Nuestros platos cuidadosamente elaborados traen la esencia de la tradición culinaria peruana a tu mesa.",
    cta: "Reservar Mesa"
  },
  about: {
    subtitle: "Nuestra Historia",
    title: "Un Sabor de Perú en San Francisco",
    story: "El Rincón de Jorgito comenzó con una visión simple: compartir la rica herencia culinaria de Perú con San Francisco. Fundado por Jorge Mendoza en 2015, nuestro restaurante combina técnicas tradicionales con ingredientes locales para crear una experiencia gastronómica auténtica e innovadora.",
    vision: "Cada plato cuenta una historia de las diversas influencias culturales de Perú – desde las tradiciones andinas indígenas hasta las cocinas española, africana, china y japonesa que han dado forma al panorama gastronómico de Perú.",
    chef: "Sobre el Chef",
    chefDesc: "El Chef Jorge Mendoza aporta más de 20 años de experiencia, habiéndose formado en los mejores restaurantes de Lima antes de traer su experiencia a California. Su pasión por los sabores peruanos y su dedicación a la excelencia culinaria define cada aspecto de El Rincón de Jorgito."
  },
  menu: {
    subtitle: "Nuestras Opciones",
    title: "Menú",
    starters: "Entradas",
    mains: "Platos Principales",
    desserts: "Postres",
    drinks: "Bebidas"
  },
  contact: {
    subtitle: "Contáctanos",
    title: "Visítanos",
    address: "1850 Cesar Chavez St, San Francisco, CA 94107",
    hours: "Horario de Apertura",
    weekdays: "Lunes - Jueves: 11:30am - 10pm",
    weekend: "Viernes - Domingo: 11:30am - 11pm",
    phone: "Teléfono",
    phoneNumber: "(415) 555-0123",
    email: "Correo Electrónico",
    emailAddress: "info@rinconjorgito.com",
    formTitle: "Hacer una Reserva",
    nameLabel: "Nombre Completo",
    emailLabel: "Correo Electrónico",
    dateLabel: "Fecha",
    timeLabel: "Hora",
    guestsLabel: "Número de Invitados",
    messageLabel: "Peticiones Especiales",
    submitButton: "Reservar Ahora"
  },
  payment: {
    title: "Métodos de Pago",
    desc: "Aceptamos varios métodos de pago para tu conveniencia",
    applePay: "Apple Pay",
    creditCard: "Tarjeta de Crédito",
    cash: "Efectivo"
  },
  footer: {
    rights: "Todos los Derechos Reservados",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio"
  }
};

type Language = "en" | "es";
type Translations = typeof enTranslations;

interface LanguageContextType {
  language: Language;
  translations: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  
  const translations = language === "en" ? enTranslations : esTranslations;
  
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === "en" ? "es" : "en");
  };
  
  return (
    <LanguageContext.Provider value={{ language, translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
