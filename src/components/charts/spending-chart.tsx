import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingDown, TrendingUp, PieChart as PieChartIcon, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

interface SpendingChartProps {
  transactions: Transaction[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0', '#ffb347'];

export function SpendingChart({ transactions }: SpendingChartProps) {
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');

  // Process data for category breakdown
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  // Process data for monthly trend
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = transaction.date.toISOString().slice(0, 7); // YYYY-MM format
    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 };
    }
    if (transaction.type === 'income') {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expense += transaction.amount;
    }
    return acc;
  }, {} as Record<string, { month: string; income: number; expense: number }>);

  const barData = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

  const totalExpenses = Object.values(categoryData).reduce((sum, amount) => sum + amount, 0);

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Spending Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
          No transactions to analyze
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {chartType === 'pie' ? <PieChartIcon className="h-5 w-5" /> : <BarChart3 className="h-5 w-5" />}
            Spending Analysis
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={chartType === 'pie' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('pie')}
            >
              Category
            </Button>
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bar')}
            >
              Trends
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {chartType === 'pie' ? (
          <div className="space-y-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Category breakdown list */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Top Categories</h4>
              {pieData
                .sort((a, b) => b.value - a.value)
                .slice(0, 5)
                .map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">₦{item.value.toLocaleString()}</span>
                      <span className="text-muted-foreground">
                        ({((item.value / totalExpenses) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`₦${value.toLocaleString()}`, '']} />
              <Legend />
              <Bar dataKey="income" fill="#22c55e" name="Income" />
              <Bar dataKey="expense" fill="#ef4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}