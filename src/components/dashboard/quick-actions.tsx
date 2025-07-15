import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Upload, 
  Target, 
  PieChart,
  Smartphone,
  Banknote,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    title: "Add Cash Transaction",
    description: "Record a cash expense or income",
    icon: Banknote,
    variant: "default" as const,
    className: "hover:bg-primary/5 border-primary/20"
  },
  {
    title: "Add Bank Transaction",
    description: "Record a bank transfer or payment",
    icon: CreditCard,
    variant: "secondary" as const,
    className: "hover:bg-secondary/80"
  },
  {
    title: "Add Mobile Money",
    description: "Record M-Pesa, MTN MoMo, etc.",
    icon: Smartphone,
    variant: "outline" as const,
    className: "hover:bg-accent/10 border-accent/30"
  },
  {
    title: "Upload Statement",
    description: "Import bank or mobile money CSV",
    icon: Upload,
    variant: "ghost" as const,
    className: "hover:bg-muted/50"
  },
  {
    title: "Set Budget",
    description: "Create spending limits",
    icon: Target,
    variant: "ghost" as const,
    className: "hover:bg-warning/10"
  },
  {
    title: "View Reports",
    description: "Analyze your spending patterns",
    icon: PieChart,
    variant: "ghost" as const,
    className: "hover:bg-success/10"
  }
];

export function QuickActions() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.title}
              variant={action.variant}
              className={cn(
                "h-auto p-4 flex flex-col items-start gap-2 transition-all duration-200 animate-scale-in",
                action.className
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 w-full">
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium text-sm text-left">{action.title}</span>
              </div>
              <span className="text-xs text-muted-foreground text-left">
                {action.description}
              </span>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}