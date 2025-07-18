import { useState, useEffect } from "react";

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: Date;
  method: 'cash' | 'bank' | 'mobile';
  currency: string;
}

const STORAGE_KEY = 'financial-tracker-transactions';

// Sample initial data
const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 2500,
    category: 'Food',
    description: 'Lunch at local restaurant',
    date: new Date(2024, 11, 15),
    method: 'cash',
    currency: 'NGN'
  },
  {
    id: '2',
    type: 'expense',
    amount: 1500,
    category: 'Transport',
    description: 'Bus fare to work',
    date: new Date(2024, 11, 14),
    method: 'mobile',
    currency: 'NGN'
  },
  {
    id: '3',
    type: 'income',
    amount: 150000,
    category: 'Salary',
    description: 'Monthly salary',
    date: new Date(2024, 11, 1),
    method: 'bank',
    currency: 'NGN'
  },
  {
    id: '4',
    type: 'expense',
    amount: 5000,
    category: 'Bills',
    description: 'Electricity bill',
    date: new Date(2024, 11, 10),
    method: 'bank',
    currency: 'NGN'
  },
  {
    id: '5',
    type: 'expense',
    amount: 3200,
    category: 'Shopping',
    description: 'Groceries for the week',
    date: new Date(2024, 11, 12),
    method: 'cash',
    currency: 'NGN'
  }
];

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        const withDates = parsed.map((t: any) => ({
          ...t,
          date: new Date(t.date)
        }));
        setTransactions(withDates);
      } catch (error) {
        console.error('Error loading transactions:', error);
        setTransactions(initialTransactions);
      }
    } else {
      setTransactions(initialTransactions);
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, ...updates } : t)
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Amount', 'Category', 'Description', 'Method', 'Currency'];
    const csvData = transactions.map(t => [
      t.date.toISOString().split('T')[0],
      t.type,
      t.amount,
      t.category,
      t.description,
      t.method,
      t.currency
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    exportToCSV
  };
}