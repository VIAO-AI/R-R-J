import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import FoodItem from "@/components/FoodItem";

export default function Menu() {
  const { translations } = useLanguage();

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const sections = document.querySelectorAll(".fade-in-section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const appetizers = [
    {
      name: "Classic Ceviche",
      description:
        "Fresh fish marinated in lime juice with red onions, sweet potato, and Peruvian corn.",
      price: "$22",
      image: "https://images.unsplash.com/photo-1632789395770-20e6f63be806?q=80&w=1924&auto=format&fit=crop",
    },
    {
      name: "Causa Limeña",
      description:
        "Layered potato dish with chicken salad, avocado, and botija olives.",
      price: "$16",
      image: "https://images.unsplash.com/photo-1589816566694-60fccd7c3f30?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Anticuchos de Corazón",
      description: "Grilled beef heart skewers with chimichurri sauce.",
      price: "$18",
      image: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&w=1972&auto=format&fit=crop",
    },
    {
      name: "Papas a la Huancaína",
      description: "Potatoes topped with a creamy, spicy cheese sauce.",
      price: "$14",
      image: "https://images.unsplash.com/photo-1598515214146-dab39da1243d?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const coldDishes = [
    {
      name: "Tiger's Milk of Fish",
      description:
        "Tiger's milk is a citrus-infused marinade made with lime juice, fish juices, red onion, and cilantro. Served with sweet potato, fried fish, squid, shrimp, Peruvian corn, and toasted corn. (Request mild or spicy)",
      price: "$25",
      image: "https://images.unsplash.com/photo-1632789395770-20e6f63be806?q=80&w=1924&auto=format&fit=crop",
    },
    {
      name: "Mixed Tiger's Milk Rincón",
      description:
        "Mixed seafood (white fish, octopus, shrimp, squid, and mussels), onion, Peruvian corn, served with sweet potato and fried fish. (Request mild or spicy)",
      price: "$28",
      image: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&w=1972&auto=format&fit=crop",
    },
    {
      name: "Fish Ceviche",
      description:
        "Fresh white fish marinated in lime juice and Peruvian rocoto chili. Served with sweet potato, Peruvian corn, and toasted corn. (Request mild or spicy)",
      price: "$20",
      image: "https://images.unsplash.com/photo-1598515214146-dab39da1243d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Mixed Ceviche",
      description:
        "Fresh diced white fish, octopus, shrimp, squid, and mussels marinated in lime juice and Peruvian rocoto chili. Served with sweet potato, Peruvian corn, and toasted corn. (Request mild or spicy)",
      price: "$25",
      image: "https://images.unsplash.com/photo-1589816566694-60fccd7c3f30?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Rincón Special Ceviche",
      description:
        "House special ceviche with diced white fish, octopus, shrimp, squid, crab meat, and crab legs marinated in lime juice and Peruvian rocoto chili with a special house sauce. Served with sweet potato, Peruvian corn, and toasted corn. (Request mild or spicy)",
      price: "$40",
      image: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&w=1972&auto=format&fit=crop",
    },
  ];

  const mainCourses = [
    {
      name: "Salchipapa",
      description:
        "Peruvian homemade fries and beef sausage, topped with your choice of sauce.",
      price: "$18",
      image: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&w=1972&auto=format&fit=crop",
    },
    {
      name: "Pollo Broaster",
      description:
        "Fried chicken served with homemade fries, topped with your choice of sauce.",
      price: "$22",
      image: "https://images.unsplash.com/photo-1598515214146-dab39da1243d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Anticucho",
      description:
        "Two grilled beef heart skewers, potatoes, Peruvian corn, and huancaína sauce.",
      price: "$18",
      image: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&w=1972&auto=format&fit=crop",
    },
    {
      name: "Rachi",
      description:
        "Grilled beef stomach with potatoes, Peruvian corn, and huancaína sauce.",
      price: "$20",
      image: "https://images.unsplash.com/photo-1589816566694-60fccd7c3f30?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Anticucho with Rachi",
      description:
        "Two grilled beef heart skewers and grilled beef stomach, served with potatoes, Peruvian corn, and huancaína sauce.",
      price: "$28",
      image: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&w=1972&auto=format&fit=crop",
    },
  ];

  const desserts = [
    {
      name: "Suspiro a la Limeña",
      description: "Caramel custard topped with port-infused meringue.",
      price: "$12",
      image: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&w=1972&auto=format&fit=crop",
    },
    {
      name: "Picarones",
      description:
        "Sweet potato and pumpkin donuts served with fig syrup.",
      price: "$10",
      image: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&w=1972&auto=format&fit=crop",
    },
    {
      name: "Alfajores",
      description: "Delicate sandwich cookies filled with dulce de leche.",
      price: "$8",
      image: "https://images.unsplash.com/photo-1589816566694-60fccd7c3f30?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  const beverages = [
    {
      name: "Chicha Morada (Glass)",
      description: "Peruvian drink made from purple corn, pineapple, cinnamon, and cloves.",
      price: "$5",
      image: "https://images.unsplash.com/photo-1589816566694-60fccd7c3f30?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Chicha Morada (Pitcher)",
      description: "Peruvian drink made from purple corn, pineapple, cinnamon, and cloves.",
      price: "$20",
      image: "https://images.unsplash.com/photo-1589816566694-60fccd7c3f30?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Maracuyá (Glass)",
      description: "Passion fruit drink made with water and sugar.",
      price: "$5",
      image: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&w=1972&auto=format&fit=crop",
    },
    {
      name: "Maracuyá (Pitcher)",
      description: "Passion fruit drink made with water and sugar.",
      price: "$20",
      image: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&w=1972&auto=format&fit=crop",
    },
    {
      name: "Guaraná (Peruvian Soda)",
      description: "Popular Brazilian soda with a fruity flavor.",
      price: "$6",
      image: "https://images.unsplash.com/photo-1589816566694-60fccd7c3f30?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Inca Kola (Peruvian Soda)",
      description: "Peru's famous sweet and fruity soda.",
      price: "$5",
      image: "https://images.unsplash.com/photo-1589816566694-60fccd7c3f30?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  return (
    <div>
      {/* Appetizers Section */}
      <section className="fade-in-section">
        <h2>{translations.appetizers}</h2>
        {appetizers.map((item, index) => (
          <FoodItem key={index} {...item} />
        ))}
      </section>

      {/* Cold Dishes Section */}
      <section className="fade-in-section">
        <h2>{translations.coldDishes}</h2>
        {coldDishes.map((item, index) => (
          <FoodItem key={index} {...item} />
        ))}
      </section>

      {/* Main Courses Section */}
      <section className="fade-in-section">
        <h2>{translations.mainCourses}</h2>
        {mainCourses.map((item, index) => (
          <FoodItem key={index} {...item} />
        ))}
      </section>

      {/* Desserts Section */}
      <section className="fade-in-section">
        <h2>{translations.desserts}</h2>
        {desserts.map((item, index) => (
          <FoodItem key={index} {...item} />
        ))}
      </section>

      {/* Beverages Section */}
      <section className="fade-in-section">
        <h2>{translations.beverages}</h2>
        {beverages.map((item, index) => (
          <FoodItem key={index} {...item} />
        ))}
      </section>
    </div>
  );
}
