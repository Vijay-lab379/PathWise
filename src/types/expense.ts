export interface Expense {
  id: string;
  tripId: string;
  title: string;
  amount: number;
  currency:
   string;
  category?: string;
  date?: string;
}
