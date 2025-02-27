
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const { translations } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroElement = heroRef.current;
      
      if (heroElement) {
        // Create parallax effect
        heroElement.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1516697602668-7b188f598c9f?q=80&w=2400&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/60"></div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 max-w-5xl mx-auto text-center text-white">
        <div className="animate-fade-in">
          <p className="inline-block bg-primary/90 px-4 py-1.5 text-white text-sm tracking-wider rounded-full mb-6">
            {translations.hero.subtitle}
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {translations.hero.title}
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-white/90 mb-10">
            {translations.hero.description}
          </p>
          <Button asChild size="lg" className="btn-hover bg-primary hover:bg-primary/90 text-white rounded-full">
            <Link to="/contact">
              {translations.hero.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
}
