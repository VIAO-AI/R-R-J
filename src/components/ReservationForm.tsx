
import { useState } from "react";
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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReservationForm() {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Reservation Submitted",
        description: "We'll confirm your reservation shortly via email.",
      });
      setIsSubmitting(false);
      
      // Reset form - in a real app, you'd use a form library like react-hook-form
      const form = e.target as HTMLFormElement;
      form.reset();
      setDate(undefined);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">{translations.contact.nameLabel}</Label>
            <Input 
              id="name" 
              name="name" 
              required 
              className="bg-card"
              placeholder="John Doe"
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
              className="bg-card"
              placeholder="john.doe@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date */}
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
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
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

          {/* Time */}
          <div className="space-y-2">
            <Label htmlFor="time">{translations.contact.timeLabel}</Label>
            <Select required>
              <SelectTrigger className="bg-card">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="11:30">11:30 AM</SelectItem>
                <SelectItem value="12:00">12:00 PM</SelectItem>
                <SelectItem value="12:30">12:30 PM</SelectItem>
                <SelectItem value="13:00">1:00 PM</SelectItem>
                <SelectItem value="13:30">1:30 PM</SelectItem>
                <SelectItem value="18:00">6:00 PM</SelectItem>
                <SelectItem value="18:30">6:30 PM</SelectItem>
                <SelectItem value="19:00">7:00 PM</SelectItem>
                <SelectItem value="19:30">7:30 PM</SelectItem>
                <SelectItem value="20:00">8:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">{translations.contact.guestsLabel}</Label>
            <Select required>
              <SelectTrigger className="bg-card">
                <SelectValue placeholder="Number of guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 person</SelectItem>
                <SelectItem value="2">2 people</SelectItem>
                <SelectItem value="3">3 people</SelectItem>
                <SelectItem value="4">4 people</SelectItem>
                <SelectItem value="5">5 people</SelectItem>
                <SelectItem value="6">6 people</SelectItem>
                <SelectItem value="7">7 people</SelectItem>
                <SelectItem value="8">8+ people (call us)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Special Requests */}
        <div className="space-y-2">
          <Label htmlFor="message">{translations.contact.messageLabel}</Label>
          <Textarea 
            id="message" 
            name="message" 
            className="min-h-[120px] resize-y bg-card"
            placeholder="Any dietary restrictions or special occasions?"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full btn-hover"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : translations.contact.submitButton}
      </Button>
    </form>
  );
}
