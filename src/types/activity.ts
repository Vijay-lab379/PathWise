export interface Activity {
  id: string;
  tripId?: string;
  name: string;
  description?: string;
  location?: string;
  date?: string;
  cost?: number;
  currency?: string;
}
