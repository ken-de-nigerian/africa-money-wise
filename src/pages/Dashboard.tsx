import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { FinancialOverview } from "@/components/dashboard/financial-overview";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { AddTransactionModal } from "@/components/modals/add-transaction-modal";
import { TransactionFiltersComponent, TransactionFilters } from "@/components/filters/transaction-filters";
import { SpendingChart } from "@/components/charts/spending-chart";
import { BudgetTracker } from "@/components/budget/budget-tracker";
import { useTransactions } from "@/hooks/use-transactions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";

export default function Dashboard() {
  const { transactions, addTransaction, exportToCSV } = useTransactions();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [presetMethod, setPresetMethod] = useState<'cash' | 'bank' | 'mobile' | undefined>();
  
  const [filters, setFilters] = useState<TransactionFilters>({
    search: '',
    type: 'all',
    category: '',
    method: 'all',
    dateRange: undefined
  });

  const handleAddTransaction = (method?: 'cash' | 'bank' | 'mobile') => {
    setPresetMethod(method);
    setIsAddModalOpen(true);
  };

  const handleShowBudgets = () => {
    setActiveTab("budgets");
  };

  const handleShowAnalytics = () => {
    setActiveTab("analytics");
  };

  // Filter transactions based on current filters
  const filteredTransactions = transactions.filter(transaction => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!transaction.description.toLowerCase().includes(searchLower) &&
          !transaction.category.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    // Type filter
    if (filters.type !== 'all' && transaction.type !== filters.type) {
      return false;
    }

    // Category filter
    if (filters.category && transaction.category !== filters.category) {
      return false;
    }

    // Method filter
    if (filters.method !== 'all' && transaction.method !== filters.method) {
      return false;
    }

    // Date range filter
    if (filters.dateRange) {
      const transactionDate = transaction.date;
      if (filters.dateRange.from && transactionDate < filters.dateRange.from) {
        return false;
      }
      if (filters.dateRange.to && transactionDate > filters.dateRange.to) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <WelcomeSection />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <FinancialOverview transactions={transactions} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TransactionList transactions={filteredTransactions.slice(0, 5)} showAll={false} />
              </div>
              <div className="lg:col-span-1">
                <QuickActions 
                  onAddTransaction={handleAddTransaction}
                  onShowBudgets={handleShowBudgets}
                  onShowAnalytics={handleShowAnalytics}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionFiltersComponent 
              filters={filters}
              onFiltersChange={setFilters}
              onExport={exportToCSV}
            />
            <TransactionList transactions={filteredTransactions} showAll={true} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <SpendingChart transactions={transactions} />
              <FinancialOverview transactions={transactions} />
            </div>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <BudgetTracker transactions={transactions} />
          </TabsContent>
        </Tabs>
      </main>

      <AddTransactionModal
        open={isAddModalOpen}
        onOpenChange={(open) => {
          setIsAddModalOpen(open);
          if (!open) setPresetMethod(undefined);
        }}
        onAdd={addTransaction}
        presetMethod={presetMethod}
      />
    </div>
  );
}