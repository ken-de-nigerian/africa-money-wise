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
    <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/95">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <div className="p-2 rounded-lg bg-primary/10">
            <Plus className="h-4 w-4 text-primary" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div
              key={action.title}
              className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-card to-muted/20 p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                      {action.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 rounded-full bg-primary/40" />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}