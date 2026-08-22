export interface Destination {
  id: string;
  city: string;
  country: string;
  region: string;
  imageUrl: string;
  rating: number;
  tag: string;
  averageCostPerDay: string;
}

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "dest-1",
    city: "Kyoto",
    country: "Japan",
    region: "East Asia",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    tag: "Culture & Temples",
    averageCostPerDay: "$140/day",
  },
  {
    id: "dest-2",
    city: "Amalfi Coast",
    country: "Italy",
    region: "Southern Europe",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    tag: "Coastal & Scenic",
    averageCostPerDay: "$210/day",
  },
  {
    id: "dest-3",
    city: "Swiss Alps",
    country: "Switzerland",
    region: "Central Europe",
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    tag: "Mountain & Trekking",
    averageCostPerDay: "$260/day",
  },
  {
    id: "dest-4",
    city: "Santorini",
    country: "Greece",
    region: "Mediterranean",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    tag: "Island & Sunset",
    averageCostPerDay: "$180/day",
  },
  {
    id: "dest-5",
    city: "Banff",
    country: "Canada",
    region: "North America",
    imageUrl: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    tag: "Nature & Lakes",
    averageCostPerDay: "$160/day",
  },
];
