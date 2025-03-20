// components/ReservationForm.tsx
import { useForm, ValidationError } from "@formspree/react";
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
  const [state, handleSubmit] = useForm("xpwppzwo"); // Reemplaza con tu ID

  // Manejo de cambios en los inputs
  const handleSelectChange = (name: string, value: string) => {
    if (state.submitting) return;
    state.formData?.set(name, value);
  };

  // Envío del formulario
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: language === "en" ? "Error" : "Error",
        description: language === "en" 
          ? "Please select a date for your reservation." 
          : "Por favor selecciona una fecha para tu reserva.",
        variant: "destructive"
      });
      return;
    }

    // Agregar fecha al formData
    state.formData?.set("date", format(date, "yyyy-MM-dd"));
    state.formData?.set("reservationType", reservationType);

    await handleSubmit(e);
  };

  // Manejar estados de Formspree
  useEffect(() => {
    if (state.submitting) {
      toast({
        title: language === "en" ? "Sending..." : "Enviando...",
        description: language === "en" 
          ? "Processing your reservation" 
          : "Procesando tu reserva"
      });
    }

    if (state.succeeded) {
      toast({
        title: language === "en" ? "Success!" : "¡Éxito!",
        description: language === "en" 
          ? "We'll confirm your reservation shortly." 
          : "Confirmaremos tu reserva en breve."
      });
      
      // Resetear formulario
      setDate(undefined);
      setReservationType("table");
      state.formData?.delete("date");
      state.formData?.delete("reservationType");
    }

    if (state.errors.length > 0) {
      toast({
        title: language === "en" ? "Error" : "Error",
        description: language === "en" 
          ? "There was an error submitting the form." 
          : "Hubo un error al enviar el formulario.",
        variant: "destructive"
      });
    }
  }, [state]);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Tipo de Reserva */}
      <div className="space-y-2">
        <Label htmlFor="reservation-type">
          {language === "en" ? "Reservation Type" : "Tipo de Reserva"}
        </Label>
        <Select 
          value={reservationType} 
          onValueChange={(value) => setReservationType(value as "table" | "event")}
          disabled={state.submitting}
        >
          <SelectTrigger className="bg-card">
            <SelectValue placeholder={language === "en" ? "Select reservation type" : "Selecciona tipo de reserva"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">{language === "en" ? "Table Reservation" : "Reserva de Mesa"}</SelectItem>
            <SelectItem value="event">{language === "en" ? "Event Reservation" : "Reserva para Evento"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campos Comunes */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name">{translations.contact.nameLabel}</Label>
            <Input
              id="name"
              name="name"
              required
              disabled={state.submitting}
              className="bg-card"
              placeholder={language === "en" ? "John Doe" : "Juan Pérez"}
            />
            <ValidationError 
              prefix="Name"
              field="name"
              errors={state.errors}
              className="text-red-500 text-sm"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{translations.contact.emailLabel}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              disabled={state.submitting}
              className="bg-card"
              placeholder={language === "en" ? "john.doe@example.com" : "juan.perez@ejemplo.com"}
            />
            <ValidationError 
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-red-500 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Fecha */}
          <div className="space-y-2">
            <Label htmlFor="date">{translations.contact.dateLabel}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-card",
                    !date && "text-muted-foreground"
                  )}
                  disabled={state.submitting}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : language === "en" ? "Select a date" : "Selecciona una fecha"}
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
            <ValidationError 
              prefix="Date"
              field="date"
              errors={state.errors}
              className="text-red-500 text-sm"
            />
          </div>

          {/* Hora */}
          <div className="space-y-2">
            <Label htmlFor="time">{translations.contact.timeLabel}</Label>
            <Select 
              name="time"
              required
              disabled={state.submitting}
              onValueChange={(value) => handleSelectChange("time", value)}
            >
              <SelectTrigger className="bg-card">
                <SelectValue placeholder={language === "en" ? "Select time" : "Selecciona hora"} />
              </SelectTrigger>
              <SelectContent>
                {/* ... opciones de tiempo ... */}
              </SelectContent>
            </Select>
            <ValidationError 
              prefix="Time"
              field="time"
              errors={state.errors}
              className="text-red-500 text-sm"
            />
          </div>

          {/* Invitados */}
          <div className="space-y-2">
            <Label htmlFor="guests">{translations.contact.guestsLabel}</Label>
            <Select 
              name="guests"
              required
              disabled={state.submitting}
              onValueChange={(value) => handleSelectChange("guests", value)}
            >
              <SelectTrigger className="bg-card">
                <SelectValue placeholder={language === "en" ? "Number of guests" : "Número de invitados"} />
              </SelectTrigger>
              <SelectContent>
                {/* ... opciones de invitados ... */}
              </SelectContent>
            </Select>
            <ValidationError 
              prefix="Guests"
              field="guests"
              errors={state.errors}
              className="text-red-500 text-sm"
            />
          </div>
        </div>

        {/* Mensaje */}
        <div className="space-y-2">
          <Label htmlFor="message">{translations.contact.messageLabel}</Label>
          <Textarea
            id="message"
            name="message"
            disabled={state.submitting}
            className="min-h-[120px] resize-y bg-card"
            placeholder={language === "en" 
              ? "Any dietary restrictions or special occasions?" 
              : "¿Alguna restricción alimentaria u ocasión especial?"}
          />
          <ValidationError 
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      {/* Campos de Evento */}
      {reservationType === "event" && (
        <div className="space-y-4">
          {/* ... campos específicos de evento ... */}
        </div>
      )}

      {/* Botón de Envío */}
      <Button
        type="submit"
        className="w-full btn-hover"
        disabled={state.submitting}
      >
        {state.submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {language === "en" ? "Processing..." : "Procesando..."}
          </>
        ) : (
          translations.contact.submitButton
        )}
      </Button>
    </form>
  );
}
