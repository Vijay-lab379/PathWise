export interface Destination {
  id: string;
  city: string;
  country: string;
  region: string;
  imageUrl: string;
  rating: number;
  tag: "Culture" | "Nature" | "Coastal" | "Adventure" | "Luxury" | "Popular";
  averageCostPerDay: string;
  description: string;
}

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "dest-1",
    city: "Kyoto",
    country: "Japan",
    region: "East Asia",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    tag: "Culture",
    averageCostPerDay: "$140/day",
    description: "Famous for historic wooden temples, traditional tea houses, and tranquil bamboo groves.",
  },
  {
    id: "dest-2",
    city: "Paris",
    country: "France",
    region: "Western Europe",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    tag: "Culture",
    averageCostPerDay: "$220/day",
    description: "Global center of art, fashion, gastronomy, and iconic architectural landmarks.",
  },
  {
    id: "dest-3",
    city: "Tokyo",
    country: "Japan",
    region: "East Asia",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    tag: "Popular",
    averageCostPerDay: "$190/day",
    description: "Vibrant metropolis blending ultra-modern skyscrapers with timeless historic shrines.",
  },
  {
    id: "dest-4",
    city: "Amalfi Coast",
    country: "Italy",
    region: "Southern Europe",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    tag: "Coastal",
    averageCostPerDay: "$210/day",
    description: "Dramatic cliffside villages overlooking turquoise Mediterranean waters.",
  },
  {
    id: "dest-5",
    city: "Swiss Alps",
    country: "Switzerland",
    region: "Central Europe",
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    tag: "Nature",
    averageCostPerDay: "$260/day",
    description: "Majestic snow-capped peaks, pristine alpine lakes, and world-class mountain trails.",
  },
  {
    id: "dest-6",
    city: "Santorini",
    country: "Greece",
    region: "Mediterranean",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    tag: "Coastal",
    averageCostPerDay: "$180/day",
    description: "Whitewashed cliffside villas and unforgettable Mediterranean sunsets.",
  },
  {
    id: "dest-7",
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    tag: "Luxury",
    averageCostPerDay: "$280/day",
    description: "Futuristic architecture, luxury shopping, desert safaris, and vibrant nightlife.",
  },
  {
    id: "dest-8",
    city: "Rome",
    country: "Italy",
    region: "Southern Europe",
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    tag: "Culture",
    averageCostPerDay: "$175/day",
    description: "Eternal city rich in ancient ruins, world-renowned gelato, and Renaissance art.",
  },
  {
    id: "dest-9",
    city: "Barcelona",
    country: "Spain",
    region: "Southern Europe",
    imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    tag: "Coastal",
    averageCostPerDay: "$160/day",
    description: "Gothic alleys, Gaudí masterpieces, sandy beaches, and bustling tapas markets.",
  },
  {
    id: "dest-10",
    city: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    tag: "Adventure",
    averageCostPerDay: "$95/day",
    description: "Tropical paradise of volcanic mountains, lush rice terraces, and sacred coral reefs.",
  },
];
