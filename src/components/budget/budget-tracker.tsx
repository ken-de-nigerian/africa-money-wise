import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Target, Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'weekly';
}

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

interface BudgetTrackerProps {
  transactions: Transaction[];
}

const categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Healthcare', 'Education', 'Entertainment', 'Other'];

export function BudgetTracker({ transactions }: BudgetTrackerProps) {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food', amount: 50000, spent: 0, period: 'monthly' },
    { id: '2', category: 'Transport', amount: 20000, spent: 0, period: 'monthly' },
    { id: '3', category: 'Entertainment', amount: 15000, spent: 0, period: 'monthly' },
  ]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: '',
    period: 'monthly' as 'monthly' | 'weekly'
  });
  
  const { toast } = useToast();

  // Calculate spent amounts from transactions
  const calculateSpentAmounts = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return budgets.map(budget => {
      const spent = transactions
        .filter(t => 
          t.type === 'expense' && 
          t.category === budget.category &&
          t.date.getMonth() === currentMonth &&
          t.date.getFullYear() === currentYear
        )
        .reduce((sum, t) => sum + t.amount, 0);
      
      return { ...budget, spent };
    });
  };

  const updatedBudgets = calculateSpentAmounts();

  const addBudget = () => {
    if (!newBudget.category || !newBudget.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const budget: Budget = {
      id: Date.now().toString(),
      category: newBudget.category,
      amount: parseFloat(newBudget.amount),
      spent: 0,
      period: newBudget.period
    };

    setBudgets([...budgets, budget]);
    setNewBudget({ category: '', amount: '', period: 'monthly' });
    setIsAddModalOpen(false);
    
    toast({
      title: "Budget Added",
      description: `Budget for ${newBudget.category} added successfully`,
    });
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter(b => b.id !== id));
    toast({
      title: "Budget Deleted",
      description: "Budget removed successfully",
    });
  };

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const totalBudget = updatedBudgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = updatedBudgets.reduce((sum, b) => sum + b.spent, 0);
  const overBudgetCount = updatedBudgets.filter(b => b.spent > b.amount).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Budget Tracker
          </CardTitle>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-3 w-3" />
                Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Budget</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newBudget.category} onValueChange={(value) => setNewBudget({...newBudget, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Budget Amount (NGN)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newBudget.amount}
                    onChange={(e) => setNewBudget({...newBudget, amount: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Period</Label>
                  <Select value={newBudget.period} onValueChange={(value: 'monthly' | 'weekly') => setNewBudget({...newBudget, period: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={addBudget} className="flex-1">
                    Add Budget
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">₦{totalBudget.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Budget</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">₦{totalSpent.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">₦{(totalBudget - totalSpent).toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Remaining</div>
          </div>
        </div>

        {/* Alerts */}
        {overBudgetCount > 0 && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">
              You've exceeded {overBudgetCount} budget{overBudgetCount > 1 ? 's' : ''} this month
            </span>
          </div>
        )}

        {/* Budget Items */}
        <div className="space-y-4">
          {updatedBudgets.map((budget) => {
            const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
            const isOverBudget = budget.spent > budget.amount;
            
            return (
              <div key={budget.id} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{budget.category}</h4>
                    <p className="text-sm text-muted-foreground">
                      ₦{budget.spent.toLocaleString()} / ₦{budget.amount.toLocaleString()} ({budget.period})
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                      {percentage.toFixed(1)}%
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteBudget(budget.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <Progress 
                  value={percentage} 
                  className="h-2"
                />
                
                {isOverBudget && (
                  <p className="text-xs text-red-600">
                    Over budget by ₦{(budget.spent - budget.amount).toLocaleString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {updatedBudgets.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No budgets set yet</p>
            <p className="text-sm">Add your first budget to start tracking your spending</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}