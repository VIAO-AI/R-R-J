
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-80"
      aria-label={language === "en" ? "Switch to Spanish" : "Switch to English"}
    >
      <Globe className="h-4 w-4" />
      <span>{language === "en" ? "ES" : "EN"}</span>
    </Button>
  );
}
