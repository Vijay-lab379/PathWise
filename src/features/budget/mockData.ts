export interface TripExpense {
  id: string;
  description: string;
  category: "Accommodation" | "Transportation" | "Activities" | "Food" | "Shopping" | "Other";
  date: string;
  amount: number;
}

export const INITIAL_MOCK_EXPENSES: TripExpense[] = [
  {
    id: "exp-1",
    description: "Higashiyama Ryokan Stay (2 nights)",
    category: "Accommodation",
    date: "Oct 12, 2026",
    amount: 440,
  },
  {
    id: "exp-2",
    description: "Kyoto Shinkansen Bullet Train Pass",
    category: "Transportation",
    date: "Oct 12, 2026",
    amount: 140,
  },
  {
    id: "exp-3",
    description: "Gion Kaiseki Tasting Dinner",
    category: "Food",
    date: "Oct 13, 2026",
    amount: 170,
  },
  {
    id: "exp-4",
    description: "Arashiyama Tenryu-ji & Bamboo Entry",
    category: "Activities",
    date: "Oct 13, 2026",
    amount: 25,
  },
  {
    id: "exp-5",
    description: "Dotonbori Street Food Tour",
    category: "Food",
    date: "Oct 17, 2026",
    amount: 65,
  },
  {
    id: "exp-6",
    description: "Osaka Castle Tower Entry Tickets",
    category: "Activities",
    date: "Oct 17, 2026",
    amount: 15,
  },
  {
    id: "exp-7",
    description: "Traditional Green Tea & Souvenirs",
    category: "Shopping",
    date: "Oct 18, 2026",
    amount: 85,
  },
];
