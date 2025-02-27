
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
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

  return (
    <main className="pt-20">
      <div className="bg-muted/50 py-20">
        <div className="container text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium tracking-wider text-primary uppercase">
            {translations.about.subtitle}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-6">
            {translations.about.title}
          </h1>
          <p className="text-muted-foreground">
            Discover the story behind El Rincón de Jorgito and our passion for authentic Peruvian cuisine.
          </p>
        </div>
      </div>
      
      {/* Restaurant story */}
      <section className="py-16 fade-in-section">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{translations.about.story}</p>
                <p>{translations.about.vision}</p>
                <p>
                  What began as a small family-owned eatery has grown into one of San Francisco's most beloved 
                  destinations for Peruvian cuisine, while still maintaining the warmth and personal touch 
                  that made us special from day one.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" 
                  alt="Restaurant interior" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Chef section */}
      <section className="py-16 bg-muted/30 fade-in-section">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Chef Jorge Mendoza" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full -z-10"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-display text-3xl font-semibold mb-6">{translations.about.chef}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{translations.about.chefDesc}</p>
                <p>
                  Jorge's approach to cooking is deeply rooted in respect for ingredients and 
                  traditional techniques, while embracing innovation that highlights the unique flavors of Peru.
                </p>
                <p>
                  "My greatest joy is seeing diners experience Peruvian cuisine for the first time 
                  and watching their faces light up with each new flavor they discover."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values section */}
      <section className="py-16 fade-in-section">
        <div className="container max-w-5xl">
          <h2 className="font-display text-3xl font-semibold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 14c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"></path>
                  <path d="M16 9v4.17"></path>
                  <path d="M13 7h6"></path>
                  <path d="M19.133 21.15a3.5 3.5 0 0 0-4.433 4.7"></path>
                  <path d="M2.114 18.601a3.5 3.5 0 0 0 4.95.3"></path>
                  <path d="M7.6 13h-.1"></path>
                  <path d="M16.5 13h-.1"></path>
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium mb-3">Authenticity</h3>
              <p className="text-muted-foreground">
                We honor traditional Peruvian recipes and techniques, using authentic ingredients to create genuine flavors.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium mb-3">Quality</h3>
              <p className="text-muted-foreground">
                We source the finest ingredients, partner with local suppliers, and maintain rigorous standards in our kitchen.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                  <path d="m15 5 4 4"></path>
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium mb-3">Creativity</h3>
              <p className="text-muted-foreground">
                While respecting tradition, we embrace innovation to create unique dishes that showcase Peruvian flavors in new ways.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Peru inspiration */}
      <section className="py-16 bg-muted/30 fade-in-section">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold mb-4">Inspired by Peru</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our culinary journey draws inspiration from Peru's diverse regions and culinary traditions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop" 
                alt="Peruvian Andes" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-display text-lg font-medium mb-2">The Andes</h3>
                <p className="text-sm text-muted-foreground">
                  Home to ancient grains, colorful potatoes, and hearty stews that form the backbone of Peruvian cuisine.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?q=80&w=1974&auto=format&fit=crop" 
                alt="Peruvian Coast" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-display text-lg font-medium mb-2">The Coast</h3>
                <p className="text-sm text-muted-foreground">
                  Where fresh seafood is transformed into ceviche and other delicacies influenced by waves of immigration.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1551041777-575d3b3a21ae?q=80&w=2070&auto=format&fit=crop" 
                alt="Peruvian Amazon" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-display text-lg font-medium mb-2">The Amazon</h3>
                <p className="text-sm text-muted-foreground">
                  Rich with exotic fruits, river fish, and unique herbs that add surprising dimensions to our menu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
