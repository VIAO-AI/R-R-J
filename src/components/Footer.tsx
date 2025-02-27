
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { translations } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo and brief description */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold">El Rincón de Jorgito</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Authentic Peruvian cuisine serving the finest traditional dishes with modern presentations.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                {translations.nav.home}
              </Link>
              <Link to="/menu" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                {translations.nav.menu}
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                {translations.nav.about}
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                {translations.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Contact information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>{translations.contact.address}</p>
              <p>{translations.contact.phoneNumber}</p>
              <p>{translations.contact.emailAddress}</p>
              <div className="space-y-1">
                <p className="font-medium text-foreground">{translations.contact.hours}</p>
                <p>{translations.contact.weekdays}</p>
                <p>{translations.contact.weekend}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            &copy; {currentYear} El Rincón de Jorgito. {translations.footer.rights}.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {translations.footer.privacy}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {translations.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
