
import { useLanguage } from "@/contexts/LanguageContext";
import { Apple, CreditCard, Landmark } from "lucide-react";

export default function PaymentMethods() {
  const { translations } = useLanguage();
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-semibold mb-4">{translations.payment.title}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{translations.payment.desc}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Apple Pay */}
          <div className="bg-card shadow-sm rounded-lg p-8 text-center transition-all hover:shadow-md">
            <div className="flex justify-center mb-6">
              <div className="bg-accent/50 p-4 rounded-full">
                <Apple className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="font-medium mb-2">{translations.payment.applePay}</h3>
            <p className="text-sm text-muted-foreground">
              Pay securely and quickly with Apple Pay on your devices.
            </p>
          </div>
          
          {/* Credit Card */}
          <div className="bg-card shadow-sm rounded-lg p-8 text-center transition-all hover:shadow-md">
            <div className="flex justify-center mb-6">
              <div className="bg-accent/50 p-4 rounded-full">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="font-medium mb-2">{translations.payment.creditCard}</h3>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards and point of sale transactions.
            </p>
          </div>
          
          {/* Cash */}
          <div className="bg-card shadow-sm rounded-lg p-8 text-center transition-all hover:shadow-md">
            <div className="flex justify-center mb-6">
              <div className="bg-accent/50 p-4 rounded-full">
                <Landmark className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="font-medium mb-2">{translations.payment.cash}</h3>
            <p className="text-sm text-muted-foreground">
              Cash is always welcome for all your transactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
