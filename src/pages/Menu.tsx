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
threshold: 0.1
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
name: "Ceviche Rincón",
description: "House Special Ceviche with diced white fish, octopus, shrimp, calamari, crab meat and crab legs, marinated in lime juice and Peruvian rocoto pepper with House Special Sauce. Served with yam, Peruvian corn and toasted corn. (Request mild or spicy)",
price: "$40",
image: "https://images.unsplash.com/photo-1741125564840-304ebe16f2cb?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
name: "Fish Leche De Tigre",
description: "Tiger's milk is a citrus-infused marinade crafted from lime juice, fish juices, red onions, and cilantro. White fish Leche de Tigre served with yam, fried fish, calamari and shrimp, Peruvian corn and toasted corn. (Request mild or spicy).",
price: "$25",
image: "https://images.unsplash.com/photo-1741127988909-0baca005723f?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  name: "Pasta Pesto with Steak",
description: "Peruvian Pasta Pesto (white cheese, spinach and basil leaves) Served with Steak",
price: "$32",
image: "https://images.unsplash.com/photo-1741128836932-600a0c52a5e3?q=80&w=1719&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
name: "Mariscos a la Chálala",
description: "Mixed seafood with Peruvian corn served with lemon juice and a touch of rocoto.",
price: "$18",
image: "https://images.unsplash.com/photo-1741130464258-c4cd58ec7d41?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
}
];

const mainCourses = [
{
name: "Lomo Saltado",
description: "Stir-fried beef with onions, tomatoes, and french fries, served with rice.",
price: "$24",
image: "https://images.unsplash.com/photo-1662116765994-1e4200c43589?q=80&amp;w=1974&amp;auto=format&amp;fit=crop" 
},
{
name: "Ají de Gallina",
description: "Creamy chicken stew with Peruvian yellow peppers, served over rice with boiled potatoes and olives.",
price: "$20"
},
{
name: "Arroz con Mariscos",
description: "Peruvian-style seafood rice with a mix of shellfish and fish.",
price: "$26"
},
{
  name: "Seco de Cordero",
description: "Slow-cooked lamb stew with cilantro sauce, served with beans and rice.",
price: "$28",
image: "https://images.unsplash.com/photo-1598515214146-dab39da1243d?q=80&amp;w=2070&amp;auto=format&amp;fit=crop "
},
{
name: "Tacu Tacu con Lomo",
description: "Traditional rice and bean pancake topped with stir-fried beef and a fried egg.",
price: "$22"
}
];

const desserts = [
{
  name: "Suspiro a la Limeña",
description: "Caramel custard topped with port-infused meringue.",
price: "$12"
},
{
name: "Picarones",
description: "Sweet potato and pumpkin donuts served with fig syrup.",
price: "$10",
image: "https://images.unsplash.com/photo-1630939927113-21ef47d756db?q=80&amp;w=1972&amp;auto=format&amp;fit=crop "
},
{
name: "Alfajores",
description: "Delicate sandwich cookies filled with dulce de leche.",
price: "$8"
}
  ];

const beverages = [
{
name: "Pisco Sour",
description: "Peru's signature cocktail made with pisco, lime juice, simple syrup, egg white, and bitters.",
price: "$14"
},
{
name: "Chicha Morada",
description: "Traditional Peruvian purple corn drink with pineapple, cinnamon, and cloves.",
price: "$6",
image: "https://images.unsplash.com/photo-1589816566694-60fccd7c3f30?q=80&amp;w=1974&amp;auto=format&amp;fit=crop "
},
{
  name: "Inca Kola",
description: "Peru's popular sweet, fruity soda.",
price: "$4"
},
{
name: "Peruvian Coffee",
description: "Rich, smooth coffee from Peru's high-altitude growing regions.",
price: "$5"
}
];

return (
<main className="pt-20">
<div className="bg-muted/50 py-20">
<div className="container text-center max-w-3xl mx-auto">
<p className="text-sm font-medium tracking-wider text-primary uppercase">
{translations.menu.subtitle}
  </p>
<h1 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-6">
{translations.menu.title}
</h1>
<p className="text-muted-foreground">
Our menu combines traditional Peruvian techniques with locally sourced ingredients.
Each dish represents the rich culinary heritage that Peru is famous for worldwide.
</p>
</div>
</div>

{/* Appetizers */}
<section className="py-16 fade-in-section">
<div className="container max-w-5xl">
<h2 className="font-display text-2xl font-semibold mb-8 pb-2 border-b">
{translations.menu.starters}
</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{appetizers.map((item, index) => (
<FoodItem
key={index}
name={item.name}
description={item.description}
price={item.price}
image={item.image}
/>
))}
</div>
</div>
</section>
  {/* Main Courses */}
<section className="py-16 bg-muted/30 fade-in-section">
<div className="container max-w-5xl">
<h2 className="font-display text-2xl font-semibold mb-8 pb-2 border-b">
{translations.menu.mains}
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{mainCourses.map((item, index) => (
<FoodItem
key={index}
name={item.name}
description={item.description}
price={item.price}
image={item.image}
/>
  ))}
</div>
</div>
</section>

{/* Desserts */}
<section className="py-16 fade-in-section">
<div className="container max-w-5xl">
<h2 className="font-display text-2xl font-semibold mb-8 pb-2 border-b">
{translations.menu.desserts}
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{desserts.map((item, index) => (
<FoodItem
key={index}
  name={item.name}
description={item.description}
price={item.price}
image={item.image}
/>
))}
</div>
</div>
</section>
  {/* Beverages */}
<section className="py-16 bg-muted/30 fade-in-section">
<div className="container max-w-5xl">
<h2 className="font-display text-2xl font-semibold mb-8 pb-2 border-b">
{translations.menu.drinks}
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{beverages.map((item, index) => (
<FoodItem
key={index}
name={item.name}
description={item.description}
price={item.price}
image={item.image}
/>
))}
</div>
  </div>
</section>
</main>
);
}
