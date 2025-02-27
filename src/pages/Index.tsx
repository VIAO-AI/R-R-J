import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Hero from "@/components/Hero";
import PaymentMethods from "@/components/PaymentMethods";
import FoodItem from "@/components/FoodItem";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export default function Index() {
  const {
    translations
  } = useLanguage();
  const aboutRef = useRef<HTMLDivElement>(null);
  const specialsRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, {
      threshold: 0.1
    });
    const sections = document.querySelectorAll(".fade-in-section");
    sections.forEach(section => {
      observer.observe(section);
    });
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  const featuredItems = [{
    name: "Lomo Saltado",
    description: "Stir-fried beef with onions, tomatoes, and french fries, served with rice.",
    price: "$24",
    image: "https://images.unsplash.com/photo-1662116765994-1e4200c43589?q=80&w=1974&auto=format&fit=crop",
    category: "Signature",
    featured: true
  }, {
    name: "Ceviche Clásico",
    description: "Fresh fish marinated in lime juice with red onions, sweet potato, and Peruvian corn.",
    price: "$22",
    image: "https://images.unsplash.com/photo-1632789395770-20e6f63be806?q=80&w=1924&auto=format&fit=crop",
    category: "Popular",
    featured: true
  }, {
    name: "Ají de Gallina",
    description: "Creamy chicken stew with Peruvian yellow peppers, served over rice with boiled potatoes and olives.",
    price: "$20",
    image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1974&auto=format&fit=crop",
    featured: true
  }];
  return <main>
      <Hero />
      
      {/* About section */}
      <section ref={aboutRef} className="py-20 fade-in-section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <p className="text-sm font-medium tracking-wider text-primary uppercase">
                {translations.about.subtitle}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
                {translations.about.title}
              </h2>
              <p className="text-muted-foreground">
                {translations.about.story}
              </p>
              <p className="text-muted-foreground">
                {translations.about.vision}
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/about">
                  {translations.about.chef}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative lg:order-2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img alt="Restaurant interior" src="/lovable-uploads/c1fd1132-3aa9-4e9d-aac6-8f24ce901894.jpg" className="w-full h-auto object-none" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-full -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured menu items */}
      <section ref={specialsRef} className="py-20 bg-muted/30 fade-in-section">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-medium tracking-wider text-primary uppercase">
              Chef's Specials
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 mb-6">
              Our Signature Dishes
            </h2>
            <p className="text-muted-foreground">
              Experience the authentic taste of Peru with our chef's carefully crafted signature dishes,
              featuring traditional recipes with modern presentations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {featuredItems.map((item, index) => <FoodItem key={index} name={item.name} description={item.description} price={item.price} image={item.image} category={item.category} featured={item.featured} />)}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/menu">
                View Full Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials section */}
      <section className="py-20 fade-in-section">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-wider text-primary uppercase">
              Testimonials
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
              What Our Guests Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="font-display font-bold text-xl">S</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Sarah L.</h4>
                  <p className="text-sm text-muted-foreground">San Francisco</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "El Rincón de Jorgito transported me back to my travels in Peru. The ceviche was as fresh and vibrant as what I had in Lima. Such an authentic experience!"
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="font-display font-bold text-xl">M</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Michael T.</h4>
                  <p className="text-sm text-muted-foreground">Berkeley</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "The Lomo Saltado here is incredible. Perfect balance of flavors and the meat was so tender. The staff was knowledgeable and friendly. Will definitely be back!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Payment Methods */}
      <PaymentMethods />
    </main>;
}