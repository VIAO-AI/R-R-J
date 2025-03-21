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

    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.set("date", format(date, "yyyy-MM-dd"));
    formData.set("reservationType", reservationType);

    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (result.success) {
        toast({
          title: language === "en" ? "Success!" : "¡Éxito!",
          description: language === "en" ? "Reservation received successfully" : "Reserva recibida correctamente"
        });
        setDate(undefined);
        setReservationType("table");
        e.currentTarget.reset();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: language === "en" ? "Error" : "Error",
        description: error.message,
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
      {/* Tipo de reserva */}
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
            {renderSelect("time", ["18:00", "18:30", "19:00", "19:30", "20:00"], language === "en" ? "Select time" : "Selecciona hora")}
          </div>
          <div className="space-y-2">
            <Label>{translations.contact.guestsLabel}</Label>
            {renderSelect("guests", ["1", "2", "3", "4", "5", "6", "7"], language === "en" ? "Guests" : "Invitados")}
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
