"use client";

import React, { useState } from "react";
import { X, Plus, DollarSign } from "lucide-react";
import { TripExpense } from "@/features/budget/mockData";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (expense: TripExpense) => void;
}

export function AddExpenseModal({
  isOpen,
  onClose,
  onAddExpense,
}: AddExpenseModalProps) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TripExpense["category"]>("Food");
  const [date, setDate] = useState("Oct 14, 2026");
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!description.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newExpense: TripExpense = {
      id: `exp-${Date.now()}`,
      description,
      category,
      date: date || "Today",
      amount: parsedAmount,
    };

    onAddExpense(newExpense);
    onClose();
    setDescription("");
    setAmount("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-travel-accent/10 text-travel-accent flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-lg text-foreground">
              Add New Expense
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Description / Expense Name *
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Shinkansen Express Ticket"
              required
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TripExpense["category"])}
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground transition-colors min-h-[44px]"
              >
                <option value="Accommodation">Accommodation</option>
                <option value="Transportation">Transportation</option>
                <option value="Activities">Activities</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Amount ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="45.00"
                required
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Oct 14, 2026"
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground transition-colors min-h-[44px]"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-border flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-border hover:bg-muted font-medium rounded-xl text-xs transition-colors min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs transition-colors inline-flex items-center space-x-1.5 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
