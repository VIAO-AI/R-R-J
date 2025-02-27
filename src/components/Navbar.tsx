
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { translations } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-display font-semibold" onClick={closeMenu}>
          El Rincón de Jorgito
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn(
              "menu-item text-sm font-medium",
              isActive("/") ? "text-primary" : "text-foreground/80 hover:text-foreground"
            )}
          >
            {translations.nav.home}
          </Link>
          <Link 
            to="/menu" 
            className={cn(
              "menu-item text-sm font-medium",
              isActive("/menu") ? "text-primary" : "text-foreground/80 hover:text-foreground"
            )}
          >
            {translations.nav.menu}
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "menu-item text-sm font-medium",
              isActive("/about") ? "text-primary" : "text-foreground/80 hover:text-foreground"
            )}
          >
            {translations.nav.about}
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "menu-item text-sm font-medium",
              isActive("/contact") ? "text-primary" : "text-foreground/80 hover:text-foreground"
            )}
          >
            {translations.nav.contact}
          </Link>
          <LanguageToggle />
          <Button asChild size="sm" className="btn-hover">
            <Link to="/contact">{translations.nav.reservation}</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <LanguageToggle />
          <Button variant="ghost" onClick={toggleMenu} className="ml-2">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[60px] z-50 bg-background/95 backdrop-blur-md shadow-md md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container flex flex-col py-4 space-y-4">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium py-2",
              isActive("/") ? "text-primary" : "text-foreground/80"
            )}
            onClick={closeMenu}
          >
            {translations.nav.home}
          </Link>
          <Link 
            to="/menu" 
            className={cn(
              "text-sm font-medium py-2",
              isActive("/menu") ? "text-primary" : "text-foreground/80"
            )}
            onClick={closeMenu}
          >
            {translations.nav.menu}
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-sm font-medium py-2",
              isActive("/about") ? "text-primary" : "text-foreground/80"
            )}
            onClick={closeMenu}
          >
            {translations.nav.about}
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "text-sm font-medium py-2",
              isActive("/contact") ? "text-primary" : "text-foreground/80"
            )}
            onClick={closeMenu}
          >
            {translations.nav.contact}
          </Link>
          <Button asChild size="sm" className="w-full">
            <Link to="/contact" onClick={closeMenu}>{translations.nav.reservation}</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
