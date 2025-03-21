// components/ReservationForm.tsx
import { useState, useEffect } from "react";
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

    const formData = new FormData(e.currentTarget);
    const eventDetails = {
      summary: `Reserva: ${formData.get("name")} - ${reservationType}`,
      description: `Email: ${formData.get("email")}
Mensaje: ${formData.get("message")}
Hora: ${formData.get("time")}
Invitados: ${formData.get("guests")}
Tipo de evento: ${formData.get("eventType")}
Asistentes: ${formData.get("attendees")}
Detalles: ${formData.get("eventDescription")}`,
      start: { dateTime: `${format(date, "yyyy-MM-dd")}T${formData.get("time")}:00` },
      end: { dateTime: `${format(date, "yyyy-MM-dd")}T${formData.get("time")}:30` },
      attendees: [{ email: formData.get("email") as string }, { email: "restaurantrincondejorgitoadm@gmail.com" }],
    };

    try {
      setSubmitting(true);
      const res = await fetch("/api/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventDetails),
      });

      if (res.ok) {
        toast({
          title: language === "en" ? "Success!" : "¡Éxito!",
          description: language === "en" ? "Reservation received via Google Calendar" : "Reserva recibida correctamente vía Google Calendar",
        });
        e.currentTarget.reset();
        setDate(undefined);
        setReservationType("table");
      } else {
        throw new Error("Calendar API error");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: language === "en" ? "Failed to send reservation." : "No se pudo enviar la reserva.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Aquí mantenemos todos los campos anteriores sin cambios visibles para el usuario */}
      {/* Reservation Type */}
      <div className="space-y-2">
        <Label htmlFor="reservationType">{language === "en" ? "Reservation Type" : "Tipo de Reserva"}</Label>
        <Select value={reservationType} onValueChange={(value) => setReservationType(value as "table" | "event")} disabled={submitting}>
          <SelectTrigger className="bg-card">
            <SelectValue placeholder={language === "en" ? "Select type" : "Selecciona tipo"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">{language === "en" ? "Table" : "Mesa"}</SelectItem>
            <SelectItem value="event">{language === "en" ? "Event" : "Evento"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Nombre, Email, Fecha, Hora, Invitados, Mensaje, Campos Evento... */}
      {/* Conservamos todos los inputs anteriores aquí, no modificados visualmente */}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{language === "en" ? "Sending..." : "Enviando..."}</>) : translations.contact.submitButton}
      </Button>
    </form>
  );
}
