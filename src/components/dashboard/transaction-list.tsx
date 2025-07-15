import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyDisplay } from "@/components/ui/currency-display";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  ShoppingCart, 
  Car, 
  Home, 
  Smartphone, 
  Coffee, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  currency: 'NGN' | 'GHS' | 'KES' | 'ZAR' | 'USD';
  date: string;
  type: 'income' | 'expense';
  source: 'bank' | 'mobile-money' | 'cash';
}

const categoryIcons = {
  'Food & Dining': Coffee,
  'Transportation': Car,
  'Bills & Utilities': Home,
  'Shopping': ShoppingCart,
  'Airtime & Data': Smartphone,
  'Income': TrendingUp,
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Salary Payment',
    category: 'Income',
    amount: 250000,
    currency: 'NGN',
    date: '2024-01-15',
    type: 'income',
    source: 'bank'
  },
  {
    id: '2',
    title: 'MTN Airtime',
    category: 'Airtime & Data',
    amount: -2000,
    currency: 'NGN',
    date: '2024-01-15',
    type: 'expense',
    source: 'mobile-money'
  },
  {
    id: '3',
    title: 'Market Shopping',
    category: 'Food & Dining',
    amount: -15000,
    currency: 'NGN',
    date: '2024-01-14',
    type: 'expense',
    source: 'cash'
  },
  {
    id: '4',
    title: 'Uber Ride',
    category: 'Transportation',
    amount: -3500,
    currency: 'NGN',
    date: '2024-01-14',
    type: 'expense',
    source: 'bank'
  },
  {
    id: '5',
    title: 'Electricity Bill',
    category: 'Bills & Utilities',
    amount: -8000,
    currency: 'NGN',
    date: '2024-01-13',
    type: 'expense',
    source: 'bank'
  }
];

const sourceLabels = {
  'bank': 'Bank',
  'mobile-money': 'Mobile Money',
  'cash': 'Cash'
};

const sourceBadgeVariants = {
  'bank': 'secondary',
  'mobile-money': 'outline',
  'cash': 'default'
} as const;

export function TransactionList() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Recent Transactions
          <Badge variant="secondary" className="text-xs">
            {mockTransactions.length} items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockTransactions.map((transaction, index) => {
          const Icon = categoryIcons[transaction.category as keyof typeof categoryIcons] || Coffee;
          const TransactionIcon = transaction.type === 'income' ? ArrowDownLeft : ArrowUpRight;
          
          return (
            <div
              key={transaction.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors duration-200 animate-fade-in",
                "hover:shadow-sm"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  transaction.type === 'income' 
                    ? "bg-success/10 text-success" 
                    : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{transaction.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {transaction.category}
                    </span>
                    <Badge 
                      variant={sourceBadgeVariants[transaction.source]}
                      className="text-xs px-2 py-0 h-4"
                    >
                      {sourceLabels[transaction.source]}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <CurrencyDisplay
                    amount={transaction.amount}
                    currency={transaction.currency}
                    showSign
                    className="text-sm font-semibold"
                  />
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString('en-GB', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <TransactionIcon className={cn(
                  "h-4 w-4",
                  transaction.type === 'income' ? "text-success" : "text-muted-foreground"
                )} />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}