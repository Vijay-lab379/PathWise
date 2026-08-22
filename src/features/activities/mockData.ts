export interface DiscoverableActivity {
  id: string;
  title: string;
  city: string;
  country: string;
  category: "Sightseeing" | "Food" | "Culture" | "Adventure" | "Nature" | "Shopping" | "Nightlife" | "Wellness";
  duration: string;
  cost: string;
  rating: number;
  image: string;
  description: string;
}

export const MOCK_DISCOVERABLE_ACTIVITIES: DiscoverableActivity[] = [
  {
    id: "disc-1",
    title: "Eiffel Tower Summit Access & Seine River Cruise",
    city: "Paris",
    country: "France",
    category: "Sightseeing",
    duration: "3 hours",
    cost: "€45",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    description: "Panoramic views over Paris followed by an evening champagne cruise along the Seine.",
  },
  {
    id: "disc-2",
    title: "Louvre Museum Masterpieces Guided Tour",
    city: "Paris",
    country: "France",
    category: "Culture",
    duration: "2.5 hours",
    cost: "€35",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80",
    description: "Skip-the-line access to Mona Lisa, Venus de Milo, and Winged Victory with an expert art historian.",
  },
  {
    id: "disc-3",
    title: "Japanese Ramen & Gyoza Cooking Class",
    city: "Kyoto",
    country: "Japan",
    category: "Food",
    duration: "2 hours",
    cost: "$55",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    description: "Hands-on culinary workshop crafting authentic broth, noodles, and pan-fried dumplings.",
  },
  {
    id: "disc-4",
    title: "Colosseum & Roman Forum Priority Access",
    city: "Rome",
    country: "Italy",
    category: "Culture",
    duration: "3 hours",
    cost: "€40",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
    description: "Walk the arena floor of ancient Rome's iconic amphitheater and explore Palatine Hill.",
  },
  {
    id: "disc-5",
    title: "Mount Fuji & Lake Kawaguchiko Day Tour",
    city: "Tokyo",
    country: "Japan",
    category: "Nature",
    duration: "8 hours",
    cost: "$95",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    description: "Scenic day trip featuring 5th station views, pagodas, and traditional hot springs.",
  },
  {
    id: "disc-6",
    title: "Bali Jungle Waterfall & Rice Terrace Swing",
    city: "Ubud",
    country: "Indonesia",
    category: "Adventure",
    duration: "5 hours",
    cost: "$40",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    description: "Hike through lush jungle trails to hidden waterfalls and iconic Tegalalang terrace views.",
  },
  {
    id: "disc-7",
    title: "Burj Khalifa At the Top & Fountain Show",
    city: "Dubai",
    country: "UAE",
    category: "Sightseeing",
    duration: "2 hours",
    cost: "$60",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
    description: "Ascend the world's tallest building for 360-degree desert views and watch the choreography.",
  },
  {
    id: "disc-8",
    title: "Sagrada Familia Fast-Track Guided Experience",
    city: "Barcelona",
    country: "Spain",
    category: "Culture",
    duration: "2 hours",
    cost: "€32",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=80",
    description: "Explore Antoni Gaudí's unfinished masterpiece with tower access and stain glass illumination.",
  },
];
