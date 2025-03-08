import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export default function Contact() {
  const { translations } = useLanguage();

  // Estado para el formulario de reserva
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Configuración de Resend
    const resendApiKey = "re_FaTtpd3V_CSH8uzReGEeP5bWjPebNMxnb"; // Tu API Key de Resend
    const resendEndpoint = "https://api.resend.com/emails";

    // Plantilla de correo
    const emailContent = `
      <h1>Nueva Reserva</h1>
      <p><strong>Nombre:</strong> ${formData.name}</p>
      <p><strong>Correo:</strong> ${formData.email}</p>
      <p><strong>Fecha:</strong> ${formData.date}</p>
      <p><strong>Hora:</strong> ${formData.time}</p>
      <p><strong>Invitados:</strong> ${formData.guests}</p>
      <p><strong>Mensaje:</strong> ${formData.message}</p>
    `;

    try {
      // Enviar el correo usando Resend
      const response = await fetch(resendEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "El Rincón de Jorgito <restaurantdejorgitoadm@gmail.com>", // Remitente fijo
          to: formData.email, // Destinatario dinámico (correo del usuario)
          subject: "Confirmación de Reserva", // Asunto del correo
          html: emailContent, // Contenido del correo en HTML
        }),
      });

      if (response.ok) {
        // Notificar al usuario que el envío fue exitoso
        alert("Reservation submitted successfully! We'll contact you shortly.");

        // Resetear el formulario
        setFormData({
          name: "",
          email: "",
          date: "",
          time: "",
          guests: "",
          message: "",
        });
      } else {
        throw new Error("Failed to submit reservation.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit reservation. Please try again.");
    }
  };

  // Intersection Observer para animaciones
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

  return (
    <main className="pt-20">
      {/* Sección de bienvenida */}
      <div className="bg-muted/50 py-20">
        <div className="container text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium tracking-wider text-primary uppercase">
            {translations.contact.subtitle}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-6">
            {translations.contact.title}
          </h1>
          <p className="text-muted-foreground">
            We'd love to welcome you to El Rincón de Jorgito. Make a reservation,
            find our location, or get in touch with any questions.
          </p>
        </div>
      </div>

      {/* Información de contacto y mapa */}
      <section className="py-16 fade-in-section">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Información de contacto */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-lg p-6 bg-card shadow-sm">
                <div className="flex">
                  <div className="mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Address</h3>
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
                    <h3 className="font-medium mb-2">{translations.contact.phone}</h3>
                    <p className="text-muted-foreground">
                      {translations.contact.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6 bg-card shadow-sm">
                <div className="flex">
                  <div className="mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                   
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="lg:col-span-3">
              <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.9151385546063!2d-122.40148518446359!3d37.76108182037143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e3074a2a2a7%3A0xc296cc5589747f93!2s1850%20Cesar%20Chavez%20St%2C%20San%20Francisco%2C%20CA%2094107%2C%20USA!5e0!3m2!1sen!2s!4v1686952879862!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Restaurant Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de reserva */}
      <section className="py-16 bg-muted/30 fade-in-section">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-semibold mb-4">
              {translations.contact.formTitle}
            </h2>
            <p className="text-muted-foreground">
              Reserve your table online and we'll confirm your booking shortly.
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-muted-foreground">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-muted-foreground">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-muted-foreground">
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  id="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
                  Special Requests
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  rows={4}
                  placeholder="Any dietary restrictions or special occasions?"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Reserve Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
