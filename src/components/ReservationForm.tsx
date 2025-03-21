// components/ReservationForm.tsx
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Clave de API de Resend - En producción debe usarse una variable de entorno
const RESEND_API_KEY = 're_e8FV1Fsr_BefqF1WHYnbjcHjndY21wLn3';

export default function ReservationForm() {
  const { translations, language } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [reservationType, setReservationType] = useState<"table" | "event">("table");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date) {
      toast({
        title: language === "en" ? "Error" : "Error",
        description: language === "en" ? "Please select a date" : "Por favor selecciona una fecha",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.set("date", format(date, "yyyy-MM-dd"));
    formData.set("reservationType", reservationType);

    const payload = Object.fromEntries(formData.entries());

    try {
      // Primero, enviar a Google Calendar
      const calendarRes = await fetch("/api/google-calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const calendarResult = await calendarRes.json();

      // Ahora, enviar correo usando Resend API directamente
      const subject = reservationType === 'event'
        ? `Nueva Reserva de Evento: ${payload.eventType} - ${payload.name}`
        : `Nueva Reserva de Mesa - ${payload.name}`;

      const htmlContent = `
        <h2>Se ha recibido una nueva reserva</h2>
        <p><strong>Tipo de Reserva:</strong> ${reservationType === 'event' ? 'Evento' : 'Mesa'}</p>
        <p><strong>Nombre:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Teléfono:</strong> ${payload.phone}</p>
        <p><strong>Fecha:</strong> ${payload.date}</p>
        <p><strong>Hora:</strong> ${payload.time}</p>
        <p><strong>Invitados:</strong> ${payload.guests}</p>
        ${reservationType === 'event' ? 
          `<p><strong>Tipo de Evento:</strong> ${payload.eventType}</p>
           <p><strong>Asistentes:</strong> ${payload.attendees}</p>
           <p><strong>Detalles del Evento:</strong> ${payload.eventDescription}</p>` 
          : ''}
        <p><strong>Mensaje:</strong> ${payload.message || 'No hay mensaje'}</p>
        <p>Desde: <a href="https://restaurantrincondejorgito.com">restaurantrincondejorgito.com</a></p>
      `;

      // Enviar correo usando la API de Resend
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: "New Reservation <onboarding@resend.dev>",
          to: ["restaurantdejorgitoadm@gmail.com"],
          subject: subject,
          html: htmlContent
        })
      });

      if (calendarResult.success && emailRes.ok) {
        toast({
          title: language === "en" ? "Success!" : "¡Éxito!",
          description: language === "en" ? "Reservation received successfully" : "Reserva recibida correctamente"
        });
        setDate(undefined);
        setReservationType("table");
        e.currentTarget.reset();
      } else {
        throw new Error("Connection error. Please try again later.");
      }
    } catch (error: any) {
      toast({
        title: language === "en" ? "Error" : "Error",
        description: language === "en" ? "Internet connection error. Please try again later." : "Error de conexión a internet. Intenta nuevamente más tarde.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderSelect = (name: string, values: string[], placeholder: string, required = true) => (
    <Select name={name} required={required} disabled={submitting}>
      <SelectTrigger className="bg-card">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {values.map((val) => (
          <SelectItem key={val} value={val}>{val}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>{language === "en" ? "Reservation Type" : "Tipo de Reserva"}</Label>
        <Select value={reservationType} onValueChange={(val) => setReservationType(val as any)} disabled={submitting}>
          <SelectTrigger className="bg-card">
            <SelectValue placeholder={language === "en" ? "Select type" : "Selecciona tipo"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">{language === "en" ? "Table" : "Mesa"}</SelectItem>
            <SelectItem value="event">{language === "en" ? "Event" : "Evento"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{translations.contact.nameLabel}</Label>
            <Input name="name" required disabled={submitting} className="bg-card" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{translations.contact.emailLabel}</Label>
            <Input type="email" name="email" required disabled={submitting} className="bg-card" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{language === "en" ? "Phone Number" : "Teléfono"}</Label>
          <Input name="phone" type="tel" required disabled={submitting} className="bg-card" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>{translations.contact.dateLabel}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-card", !date && "text-muted-foreground")} disabled={submitting}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : language === "en" ? "Select date" : "Selecciona fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus disabled={(d) => d < new Date()} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>{translations.contact.timeLabel}</Label>
            {renderSelect("time", [
              "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
              "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
              "20:00", "20:30", "21:00", "21:30", "22:00"
            ], language === "en" ? "Select time" : "Selecciona hora")}
          </div>
          <div className="space-y-2">
            <Label>{translations.contact.guestsLabel}</Label>
            {renderSelect("guests", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], language === "en" ? "Guests" : "Invitados")}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">{translations.contact.messageLabel}</Label>
          <Textarea name="message" disabled={submitting} className="min-h-[120px] bg-card" placeholder={language === "en" ? "Special requests..." : "Peticiones especiales..."} />
        </div>
      </div>

      {reservationType === "event" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventType">{language === "en" ? "Event Type" : "Tipo de Evento"}</Label>
              {renderSelect("eventType", ["birthday", "wedding", "business"], language === "en" ? "Select type" : "Selecciona tipo")}
            </div>
            <div className="space-y-2">
              <Label htmlFor="attendees">{language === "en" ? "Attendees" : "Asistentes"}</Label>
              <Input name="attendees" type="number" min="1" disabled={submitting} className="bg-card" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventDescription">{language === "en" ? "Details" : "Detalles"}</Label>
            <Textarea name="eventDescription" disabled={submitting} className="min-h-[120px] bg-card" placeholder={language === "en" ? "Describe your event..." : "Describe tu evento..."} />
          </div>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{language === "en" ? "Sending..." : "Enviando..."}</> : translations.contact.submitButton}
      </Button>
    </form>
  );
}
