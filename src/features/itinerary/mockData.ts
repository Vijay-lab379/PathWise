export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  category: "Sightseeing" | "Food" | "Culture" | "Transport" | "Hotel" | "Shopping";
  duration: string;
  cost: string;
  description: string;
  location: string;
}

export interface ItineraryDay {
  dayNumber: number;
  dateLabel: string;
  activities: ItineraryActivity[];
}

export interface ItinerarySection {
  id: string;
  sectionNumber: number;
  title: string;
  description: string;
  dateRange: string;
  budget: string;
  city: string;
  country: string;
  days: ItineraryDay[];
}

export const MOCK_ITINERARY_SECTIONS: ItinerarySection[] = [
  {
    id: "sec-1",
    sectionNumber: 1,
    title: "Kyoto Historic Core & Bamboo Sanctuary",
    description: "Explore ancient wooden temples, UNESCO heritage sites, and traditional tea ceremonies.",
    dateRange: "Oct 12 to Oct 17, 2026",
    budget: "$1,450",
    city: "Kyoto",
    country: "Japan",
    days: [
      {
        dayNumber: 1,
        dateLabel: "Monday, 12 October",
        activities: [
          {
            id: "act-101",
            time: "02:00 PM",
            title: "Hotel Check-in & Ryokan Welcome Tea",
            category: "Hotel",
            duration: "1.5 hours",
            cost: "$220",
            description: "Check into traditional ryokan in Higashiyama with macha welcome ceremony.",
            location: "Higashiyama District, Kyoto",
          },
          {
            id: "act-102",
            time: "05:30 PM",
            title: "Gion Evening District Walking Tour",
            category: "Culture",
            duration: "2 hours",
            cost: "$45",
            description: "Guided stroll through lantern-lit streets seeking geiko and maiko culture.",
            location: "Gion, Kyoto",
          },
        ],
      },
      {
        dayNumber: 2,
        dateLabel: "Tuesday, 13 October",
        activities: [
          {
            id: "act-103",
            time: "08:30 AM",
            title: "Arashiyama Bamboo Grove Walk",
            category: "Sightseeing",
            duration: "2.5 hours",
            cost: "Free",
            description: "Early morning tranquil walk before crowd arrival, visiting Tenryu-ji Temple gardens.",
            location: "Arashiyama, Kyoto",
          },
          {
            id: "act-104",
            time: "01:00 PM",
            title: "Traditional Kaiseki Lunch Experience",
            category: "Food",
            duration: "2 hours",
            cost: "$85",
            description: "Multi-course seasonal Japanese haute cuisine lunch overlooking river.",
            location: "Katsura River, Kyoto",
          },
          {
            id: "act-105",
            time: "04:30 PM",
            title: "Fushimi Inari Torii Gate Sunset Hike",
            category: "Culture",
            duration: "2 hours",
            cost: "Free",
            description: "Hike through 10,000 vermilion torii gates to the mountain shrine viewpoint.",
            location: "Fushimi Inari Taisha",
          },
        ],
      },
    ],
  },
  {
    id: "sec-2",
    sectionNumber: 2,
    title: "Osaka Gastronomy & Urban Exploration",
    description: "Immerse in Japan's street food capital, vibrant neon markets, and Osaka Castle grounds.",
    dateRange: "Oct 17 to Oct 20, 2026",
    budget: "$900",
    city: "Osaka",
    country: "Japan",
    days: [
      {
        dayNumber: 6,
        dateLabel: "Saturday, 17 October",
        activities: [
          {
            id: "act-201",
            time: "11:00 AM",
            title: "Osaka Castle & Park Gardens Tour",
            category: "Sightseeing",
            duration: "2 hours",
            cost: "$15",
            description: "Explore the historic tower museum and surrounding stone wall ramparts.",
            location: "Chuo Ward, Osaka",
          },
          {
            id: "act-202",
            time: "06:00 PM",
            title: "Dotonbori Street Food & Neon Lights Tasting",
            category: "Food",
            duration: "3 hours",
            cost: "$65",
            description: "Sample takoyaki, okonomiyaki, and fresh skewers along the canal.",
            location: "Dotonbori Canal",
          },
        ],
      },
    ],
  },
  {
    id: "sec-3",
    sectionNumber: 3,
    title: "Nara Temple Sanctuary & Deer Park Excursion",
    description: "Day excursion to ancient Todai-ji temple housing the Great Buddha and sacred deer park.",
    dateRange: "Oct 20 to Oct 22, 2026",
    budget: "$500",
    city: "Nara",
    country: "Japan",
    days: [
      {
        dayNumber: 9,
        dateLabel: "Tuesday, 20 October",
        activities: [
          {
            id: "act-301",
            time: "10:00 AM",
            title: "Todai-ji Temple & Daibutsu (Great Buddha)",
            category: "Culture",
            duration: "2 hours",
            cost: "$10",
            description: "Marvel at one of the world's largest wooden structures and bronze Buddha.",
            location: "Nara Park",
          },
        ],
      },
    ],
  },
];
