import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import FoodItem from "@/components/FoodItem";

// Hook personalizado para Intersection Observer
function useIntersectionObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }),
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".fade-in-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
}

export default function Menu() {
  const { translations } = useLanguage();
  useIntersectionObserver();

  // Función para crear platillos de forma dinámica
  const createMenuItem = (category, items) =>
    items.map((item, index) => (
      <FoodItem key={`${category}-${index}`} {...item} />
    ));

  // Constantes para URLs de imágenes repetidas
  const IMAGE_URLS = {
    ceviche: "https://images.unsplash.com/photo-1632789395770-20e6f63be806?q=80&w=1924&auto=format&fit=crop",
    causa: "https://images.unsplash.com/photo-1589816566694-60fccd7c3f30?q=80&w=1974&auto=format&fit=crop",
    anticucho: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&w=1972&auto=format&fit=crop",
    papasHuancaína: "https://images.unsplash.com/photo-1598515214146-dab39da1243d?q=80&w=2070&auto=format&fit=crop",
  };

  // Datos del menú agrupados por categorías
  const menuData = [
    {
      category: "appetizers",
      items: [
        {
          name: "Classic Ceviche",
          description:
            "Fresh fish marinated in lime juice with red onions, sweet potato, and Peruvian corn.",
          price: "$22",
          image: IMAGE_URLS.ceviche,
        },
        {
          name: "Causa Limeña",
          description:
            "Layered potato dish with chicken salad, avocado, and botija olives.",
          price: "$16",
          image: IMAGE_URLS.causa,
        },
        {
          name: "Anticuchos de Corazón",
          description: "Grilled beef heart skewers with chimichurri sauce.",
          price: "$18",
          image: IMAGE_URLS.anticucho,
        },
        {
          name: "Papas a la Huancaína",
          description: "Potatoes topped with a creamy, spicy cheese sauce.",
          price: "$14",
          image: IMAGE_URLS.papasHuancaína,
        },
      ],
    },
    {
      category: "coldDishes",
      items: [
        {
          name: "Tiger's Milk of Fish",
          description:
            "Tiger's milk is a citrus-infused marinade made with lime juice, fish juices, red onion, and cilantro. Served with sweet potato, fried fish, squid, shrimp, Peruvian corn, and toasted corn. (Request mild or spicy)",
          price: "$25",
          image: IMAGE_URLS.ceviche,
        },
        // ... otros platos fríos
      ],
    },
    // ... otras categorías (mainCourses, desserts, beverages)
  ];

  return (
    <div className="menu-container">
      {menuData.map(({ category, items }) => (
        <section key={category} className="fade-in-section">
          <h2>{translations[category]}</h2>
          {createMenuItem(category, items)}
        </section>
      ))}
    </div>
  );
}
