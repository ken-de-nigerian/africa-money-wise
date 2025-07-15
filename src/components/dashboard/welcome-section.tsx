import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import financialHero from "@/assets/financial-hero.jpg";

export function WelcomeSection() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 
    ? "Good morning" 
    : currentHour < 17 
    ? "Good afternoon" 
    : "Good evening";

  return (
    <Card className="relative overflow-hidden bg-gradient-primary shadow-primary border-0">
      <div className="absolute inset-0 opacity-10">
        <img 
          src={financialHero} 
          alt="Financial dashboard" 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="relative p-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Welcome to FinanceAfrica
            </Badge>
          </div>
          
          <h2 className="text-3xl font-bold text-primary-foreground mb-2">
            {greeting}, Kwame! 👋
          </h2>
          
          <p className="text-primary-foreground/80 text-lg mb-6 leading-relaxed">
            Take control of your finances across bank accounts, mobile money, and cash. 
            Track your spending, set budgets, and achieve your financial goals with insights 
            designed for African markets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="secondary" 
              className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Add Your First Transaction
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="ghost" 
              className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
            >
              Import Bank Statement
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}