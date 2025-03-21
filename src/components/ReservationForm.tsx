// components/ReservationForm.tsx
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReservationForm() {
  const { translations, language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [reservationType, setReservationType] = useState<"table" | "event">("table");
  const [guests, setGuests] = useState<string>("2");
  const [time, setTime] = useState<string>("18:00");

  const handleReservationRedirect = () => {
    if (!date || !time || !guests) return;

    const formattedDate = format(date, "yyyy-MM-dd");
    const formattedTime = time.replace(":", "");

    const yelpUrl = `https://www.yelp.com/reservations/tu-restaurante?covers=${guests}&date=${formattedDate}&time=${formattedTime}`;
    window.open(yelpUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>{language === "en" ? "Reservation Type" : "Tipo de Reserva"}</Label>
        <Select value={reservationType} onValueChange={(value) => setReservationType(value as "table" | "event")}> 
          <SelectTrigger className="bg-card">
            <SelectValue placeholder={language === "en" ? "Select type" : "Selecciona tipo"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">Table</SelectItem>
            <SelectItem value="event">Event</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>{translations.contact.dateLabel}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-card", !date && "text-muted-foreground")}> 
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : language === "en" ? "Select date" : "Selecciona fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>{translations.contact.timeLabel}</Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {["18:00", "18:30", "19:00", "19:30", "20:00"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{translations.contact.guestsLabel}</Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Guests" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7].map((g) => (
                <SelectItem key={g} value={g.toString()}>{g} {language === "en" ? "people" : "personas"}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full" onClick={handleReservationRedirect}>
        {language === "en" ? "Reserve on Yelp" : "Reservar en Yelp"}
      </Button>
    </div>
  );
}
