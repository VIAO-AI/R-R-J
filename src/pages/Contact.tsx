
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Clock, Phone } from "lucide-react";
import ReservationForm from "@/components/ReservationForm";

export default function Contact() {
  const { translations } = useLanguage();

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

  return (
    <main className="pt-20">
      {/* Welcome section */}
      <div className="bg-muted/50 py-20">
        <div className="container text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium tracking-wider text-primary uppercase">
            {translations.contact.subtitle}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-6">
            {translations.contact.title}
          </h1>
          <p className="text-muted-foreground">
            {translations.contact.description}
          </p>
        </div>
      </div>

      {/* Contact information and map */}
      <section className="py-16 fade-in-section">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact information */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-lg p-6 bg-card shadow-sm">
                <div className="flex">
                  <div className="mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{translations.contact.addressTitle}</h3>
                    <p className="text-muted-foreground">
                      {translations.contact.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6 bg-card shadow-sm">
                <div className="flex">
                  <div className="mr-4">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{translations.contact.hours}</h3>
                    <p className="text-muted-foreground">
                      {translations.contact.weekdays}
                    </p>
                    <p className="text-muted-foreground">
                      {translations.contact.weekend}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6 bg-card shadow-sm">
                <div className="flex">
                  <div className="mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{translations.contact.phoneTitle}</h3>
                    <p className="text-muted-foreground">
                      {translations.contact.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-3">
              <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.9151385546063!2d-122.40148518446359!3d37.76108182037143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e3074a2a2a7%3A0xc296cc5589747f93!2s1850%20Cesar%20Chavez%20St%2C%20San%20Francisco%2C%20CA%2094107%2C%20USA!5e0!3m2!1sen!2s!4v1686952879862!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  title="Restaurant Location">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation form */}
      <section className="py-16 bg-muted/30 fade-in-section">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-semibold mb-4">
              {translations.contact.formTitle}
            </h2>
            <p className="text-muted-foreground">
              {translations.contact.formDescription}
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-8">
            <ReservationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
