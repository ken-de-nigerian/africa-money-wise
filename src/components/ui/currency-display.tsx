import { cn } from "@/lib/utils";

interface CurrencyDisplayProps {
  amount: number;
  currency: 'NGN' | 'GHS' | 'KES' | 'ZAR' | 'USD';
  className?: string;
  variant?: 'default' | 'large' | 'small';
  showSign?: boolean;
}

const currencySymbols = {
  NGN: '₦',
  GHS: '₵',
  KES: 'KSh',
  ZAR: 'R',
  USD: '$'
};

const formatCurrency = (amount: number, currency: string) => {
  const symbol = currencySymbols[currency as keyof typeof currencySymbols];
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return `${symbol}${formatter.format(Math.abs(amount))}`;
};

export function CurrencyDisplay({ 
  amount, 
  currency, 
  className, 
  variant = 'default',
  showSign = false 
}: CurrencyDisplayProps) {
  const formattedAmount = formatCurrency(amount, currency);
  const isNegative = amount < 0;
  const isPositive = amount > 0;
  
  const variantClasses = {
    default: 'text-base font-medium',
    large: 'text-2xl font-bold',
    small: 'text-sm font-medium'
  };

  return (
    <span
      className={cn(
        variantClasses[variant],
        isNegative && "text-destructive",
        isPositive && showSign && "text-success",
        className
      )}
    >
      {isNegative && showSign && "-"}
      {isPositive && showSign && "+"}
      {formattedAmount}
    </span>
  );
}