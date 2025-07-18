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
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: Date;
  method: 'cash' | 'bank' | 'mobile';
  currency: string;
}

interface TransactionListProps {
  transactions?: Transaction[];
  showAll?: boolean;
}

export function TransactionList({ transactions = [], showAll = true }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-muted-foreground">
          No transactions yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.slice(0, showAll ? undefined : 5).map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.category}</p>
              </div>
              <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'}{transaction.currency} {transaction.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}