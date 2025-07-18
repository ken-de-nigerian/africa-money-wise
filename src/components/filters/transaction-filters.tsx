import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Filter, X, Download } from "lucide-react";
import { DateRange } from "react-day-picker";

export interface TransactionFilters {
  search: string;
  type: 'all' | 'income' | 'expense';
  category: string;
  method: 'all' | 'cash' | 'bank' | 'mobile';
  dateRange?: DateRange;
}

interface TransactionFiltersProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  onExport: () => void;
}

const categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Healthcare', 'Education', 'Entertainment', 'Salary', 'Freelance', 'Business', 'Investment', 'Other'];

export function TransactionFiltersComponent({ filters, onFiltersChange, onExport }: TransactionFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof TransactionFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      type: 'all',
      category: '',
      method: 'all',
      dateRange: undefined
    });
  };

  const hasActiveFilters = filters.search || filters.type !== 'all' || filters.category || filters.method !== 'all' || filters.dateRange;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Hide' : 'Show'} Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="gap-2"
            >
              <Download className="h-3 w-3" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Search */}
          <div>
            <Input
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>

          {/* Type, Category, Method */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.method} onValueChange={(value) => updateFilter('method', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="mobile">Mobile Money</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div>
            <DatePickerWithRange
              date={filters.dateRange}
              onDateChange={(dateRange) => updateFilter('dateRange', dateRange)}
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                <X className="h-3 w-3" />
                Clear All Filters
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}