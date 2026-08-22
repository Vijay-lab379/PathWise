export interface Trip {
  id: string;
  userId: string;
  title: string;
  description?: string;
  destination: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}
