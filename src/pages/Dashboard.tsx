import { DashboardHeader } from "@/components/dashboard/header";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { FinancialOverview } from "@/components/dashboard/financial-overview";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { TransactionList } from "@/components/dashboard/transaction-list";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <WelcomeSection />
        
        <FinancialOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TransactionList />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
}