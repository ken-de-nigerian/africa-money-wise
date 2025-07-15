import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { CurrencyDisplay } from "@/components/ui/currency-display";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  amount: number;
  currency: 'NGN' | 'GHS' | 'KES' | 'ZAR' | 'USD';
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'income' | 'expense';
  className?: string;
}

export function StatsCard({
  title,
  amount,
  currency,
  icon: Icon,
  trend,
  variant = 'default',
  className
}: StatsCardProps) {
  const variantStyles = {
    default: "bg-card border",
    income: "bg-gradient-success border-success/20",
    expense: "bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20"
  };

  const iconStyles = {
    default: "text-muted-foreground",
    income: "text-success-foreground",
    expense: "text-destructive"
  };

  return (
    <Card className={cn(variantStyles[variant], "shadow-card hover:shadow-elevated transition-all duration-300", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className={cn(
              "text-sm font-medium",
              variant === 'income' ? "text-success-foreground/80" : "text-muted-foreground"
            )}>
              {title}
            </p>
            <CurrencyDisplay
              amount={amount}
              currency={currency}
              variant="large"
              className={variant === 'income' ? "text-success-foreground" : undefined}
            />
            {trend && (
              <div className="flex items-center gap-1 text-sm">
                <span className={cn(
                  "font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}>
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg bg-background/10",
            variant === 'income' ? "bg-success-foreground/10" : "bg-primary/10"
          )}>
            <Icon className={cn("h-6 w-6", iconStyles[variant])} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}