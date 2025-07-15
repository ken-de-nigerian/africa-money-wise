import { StatsCard } from "./stats-card";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PiggyBank 
} from "lucide-react";

// Mock data - in real app this would come from API/database
const mockData = {
  totalBalance: 450000,
  monthlyIncome: 280000,
  monthlyExpenses: 185000,
  savings: 265000,
  currency: 'NGN' as const,
  trends: {
    income: { value: 12.5, isPositive: true },
    expenses: { value: 8.2, isPositive: false },
    savings: { value: 15.8, isPositive: true }
  }
};

export function FinancialOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Balance"
        amount={mockData.totalBalance}
        currency={mockData.currency}
        icon={Wallet}
        className="animate-slide-up"
      />
      
      <StatsCard
        title="Monthly Income"
        amount={mockData.monthlyIncome}
        currency={mockData.currency}
        icon={TrendingUp}
        trend={mockData.trends.income}
        variant="income"
        className="animate-slide-up [animation-delay:100ms]"
      />
      
      <StatsCard
        title="Monthly Expenses"
        amount={mockData.monthlyExpenses}
        currency={mockData.currency}
        icon={TrendingDown}
        trend={mockData.trends.expenses}
        variant="expense"
        className="animate-slide-up [animation-delay:200ms]"
      />
      
      <StatsCard
        title="Total Savings"
        amount={mockData.savings}
        currency={mockData.currency}
        icon={PiggyBank}
        trend={mockData.trends.savings}
        className="animate-slide-up [animation-delay:300ms]"
      />
    </div>
  );
}