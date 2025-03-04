import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react"; // Eliminamos Twitter
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
              {/* Facebook link */}
              <a
                href="https://www.facebook.com/share/1JjGcxvpwM"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              {/* Instagram link */}
              <a
                href="https://www.instagram.com/restaurantrincondejorgito?igsh=cHNhbmhvMHNlb205"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
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
              {/* Updated phone number */}
              <p>(415) 609-5160</p>
              {/* Updated email address */}
              <p>info@restaurantrincondejorgito.com</p>
              <div className="space-y-1">
                <p className="font-medium text-foreground">{translations.contact.hours}</p>
                {/* Updated opening hours */}
                <p>Sun 12:00 pm - 7:00 pm</p>
                <p>Tue 11:00 am - 8:00 pm</p>
                <p>Wed 11:00 am - 8:00 pm</p>
                <p>Thu 11:00 am - 10:00 pm</p>
                <p>Fri 11:00 am - 10:00 pm</p>
                <p>Sat 12:00 pm - 10:00 pm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and attribution */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          {/* Left side: Copyright */}
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            &copy; {currentYear} El Rincón de Jorgito. {translations.footer.rights}.
          </p>

          {/* Center: Attribution */}
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            ❤️ Designed and developed by Angel Nerozzi ❤️
          </p>

          {/* Right side: Privacy and Terms */}
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
