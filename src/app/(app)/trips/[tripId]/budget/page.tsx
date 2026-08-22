"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  DollarSign,
  Plus,
  ArrowLeft,
  Calendar,
  MapPin,
  Trash2,
  PieChart,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Utensils,
  Landmark,
  Building,
  Bus,
  ShoppingBag,
  HelpCircle,
} from "lucide-react";
import { MOCK_TRIPS } from "@/features/trips/mockData";
import { INITIAL_MOCK_EXPENSES, TripExpense } from "@/features/budget/mockData";
import { TripNavTabs } from "@/components/trips/TripNavTabs";
import { AddExpenseModal } from "@/components/budget/AddExpenseModal";
import { ROUTES } from "@/constants/routes";

interface BudgetPageProps {
  params: Promise<{ tripId: string }>;
}

const categoryIcons = {
  Accommodation: Building,
  Transportation: Bus,
  Activities: Landmark,
  Food: Utensils,
  Shopping: ShoppingBag,
  Other: HelpCircle,
};

export default function TripBudgetPage({ params }: BudgetPageProps) {
  const { tripId } = use(params);
  const trip = MOCK_TRIPS.find((t) => t.id === tripId) || MOCK_TRIPS[0];

  const totalBudget = 2850;
  const [expenses, setExpenses] = useState<TripExpense[]>(INITIAL_MOCK_EXPENSES);
  const [modalOpen, setModalOpen] = useState(false);

  // Dynamic calculations from expenses
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const dailyAverage = (totalSpent / (trip.durationDays || 10)).toFixed(2);
  const spentPercentage = Math.min(Math.round((totalSpent / totalBudget) * 100), 100);

  // Budget Status
  let budgetStatus: { label: string; bg: string; text: string; icon: React.ElementType } = {
    label: "Under Budget",
    bg: "bg-success/10 border-success/30 text-success",
    text: "text-success",
    icon: CheckCircle2,
  };

  if (totalSpent > totalBudget) {
    budgetStatus = {
      label: "Over Budget",
      bg: "bg-destructive/10 border-destructive/30 text-destructive",
      text: "text-destructive",
      icon: AlertTriangle,
    };
  } else if (totalSpent >= totalBudget * 0.85) {
    budgetStatus = {
      label: "Near Budget Limit",
      bg: "bg-amber-500/10 border-amber-500/30 text-amber-600",
      text: "text-amber-600",
      icon: AlertTriangle,
    };
  }

  // Category Aggregation
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoriesList: TripExpense["category"][] = [
    "Accommodation",
    "Transportation",
    "Activities",
    "Food",
    "Shopping",
    "Other",
  ];

  // Actions
  const handleAddExpense = (newExp: TripExpense) => {
    setExpenses([newExp, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const StatusIcon = budgetStatus.icon;

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* BACK TO TRIPS LINK */}
      <div>
        <Link
          href={ROUTES.TRIP_DETAILS(tripId)}
          className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Trip Overview
        </Link>
      </div>

      {/* COMPACT TRIP HEADER CONTEXT */}
      <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
            <MapPin className="w-3.5 h-3.5 text-travel-accent" />
            <span>{trip.destination}, {trip.country}</span>
            <span>•</span>
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{trip.startDate} – {trip.endDate}</span>
          </div>
          <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
            Budget & Expense Tracker
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs min-h-[44px] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* TRIP SECTION NAVIGATION TABS */}
      <TripNavTabs tripId={trip.id} />

      {/* BUDGET OVERVIEW NUMERICAL SUMMARY CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Budget Card */}
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
            Total Allocated Budget
          </span>
          <div className="font-heading font-bold text-2xl text-foreground">
            ${totalBudget.toLocaleString()}
          </div>
          <span className="text-[11px] text-muted-foreground block pt-1">
            Planned expenditure
          </span>
        </div>

        {/* Total Spent Card */}
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
            Total Spent to Date
          </span>
          <div className="font-heading font-bold text-2xl text-primary">
            ${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-muted-foreground block pt-1">
            {spentPercentage}% of total budget
          </span>
        </div>

        {/* Remaining Budget Card */}
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
            Remaining Budget
          </span>
          <div
            className={`font-heading font-bold text-2xl ${
              remainingBudget < 0 ? "text-destructive" : "text-foreground"
            }`}
          >
            ${remainingBudget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-muted-foreground block pt-1">
            Available funds
          </span>
        </div>

        {/* Status & Daily Avg Card */}
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-2 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground block">
              Budget Health Status
            </span>
            <div className={`mt-1 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${budgetStatus.bg}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{budgetStatus.label}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border/60 text-xs">
            <span className="text-muted-foreground">Daily Average: </span>
            <span className="font-bold text-foreground">${dailyAverage}/day</span>
          </div>
        </div>
      </section>

      {/* CATEGORY BREAKDOWN & EXPENSES LIST GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: CATEGORY BREAKDOWN */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center space-x-2 border-b border-border pb-3">
              <PieChart className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-lg text-foreground">
                Category Breakdown
              </h2>
            </div>

            <div className="space-y-4">
              {categoriesList.map((cat) => {
                const amount = categoryTotals[cat] || 0;
                const percent = totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0;
                const Icon = categoryIcons[cat] || DollarSign;

                return (
                  <div key={cat} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="font-semibold text-foreground">{cat}</span>
                      </div>
                      <div className="space-x-1">
                        <span className="font-bold text-foreground">
                          ${amount.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">({percent}%)</span>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT 2 COLUMNS: EXPENSES LIST */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-travel-accent" />
                <h2 className="font-heading font-bold text-lg text-foreground">
                  Expense Records ({expenses.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="text-xs font-semibold text-primary hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Expense</span>
              </button>
            </div>

            {/* Expenses List */}
            {expenses.length > 0 ? (
              <div className="space-y-3">
                {expenses.map((exp) => {
                  const Icon = categoryIcons[exp.category] || Receipt;
                  return (
                    <div
                      key={exp.id}
                      className="p-4 bg-background border border-border rounded-xl flex items-center justify-between hover:border-primary/40 transition-colors shadow-2xs gap-3"
                    >
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-heading font-bold text-sm text-foreground truncate">
                            {exp.description}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-0.5">
                            <span className="bg-muted px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase text-foreground">
                              {exp.category}
                            </span>
                            <span>•</span>
                            <span>{exp.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Amount & Delete */}
                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="font-heading font-bold text-base text-foreground">
                          ${exp.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteExpense(exp.id)}
                          title="Delete expense"
                          className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 border border-dashed border-border rounded-xl text-center space-y-2">
                <p className="text-xs font-semibold text-foreground">No expenses recorded yet</p>
                <p className="text-[11px] text-muted-foreground">Click &quot;Add Expense&quot; to log accommodation, meals, or transit.</p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ADD EXPENSE MODAL */}
      <AddExpenseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddExpense={handleAddExpense}
      />
    </div>
  );
}
