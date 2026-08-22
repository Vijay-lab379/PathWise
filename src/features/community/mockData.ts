export interface CommunityTrip {
  id: string;
  shareToken: string;
  title: string;
  destination: string;
  country: string;
  region: "Europe" | "Asia" | "Americas" | "Middle East";
  category: "Culture & Heritage" | "Budget Friendly" | "Luxury Travel" | "Nature & Adventure";
  durationDays: number;
  cityCount: number;
  datesLabel: string;
  coverImage: string;
  creatorName: string;
  creatorAvatar: string;
  creatorHandle: string;
  description: string;
  likesCount: number;
  savesCount: number;
}

export const MOCK_COMMUNITY_TRIPS: CommunityTrip[] = [
  {
    id: "comm-1",
    shareToken: "trip-1",
    title: "Autumn Heritage & Bamboo Groves",
    destination: "Kyoto, Osaka & Nara",
    country: "Japan",
    region: "Asia",
    category: "Culture & Heritage",
    durationDays: 10,
    cityCount: 3,
    datesLabel: "Oct 12 – Oct 22, 2026",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    creatorName: "Elena Rostova",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    creatorHandle: "@elena_travels",
    description: "Traditional ryokans, lantern-lit Gion strolls, and morning bamboo grove walks across Kansai.",
    likesCount: 342,
    savesCount: 128,
  },
  {
    id: "comm-2",
    shareToken: "trip-2",
    title: "Amalfi Cliffside & Mediterranean Coast",
    destination: "Positano & Ravello",
    country: "Italy",
    region: "Europe",
    category: "Luxury Travel",
    durationDays: 7,
    cityCount: 2,
    datesLabel: "Sep 04 – Sep 11, 2026",
    coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    creatorName: "Marcus Vance",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    creatorHandle: "@marcus_vance",
    description: "Cliffside villas, private boat charters along Capri, and sunset seafood dining in Positano.",
    likesCount: 512,
    savesCount: 240,
  },
  {
    id: "comm-3",
    shareToken: "trip-3",
    title: "Swiss Alpine Trails & Lake Lucerne",
    destination: "Zermatt & Lucerne",
    country: "Switzerland",
    region: "Europe",
    category: "Nature & Adventure",
    durationDays: 8,
    cityCount: 2,
    datesLabel: "Jul 15 – Jul 23, 2026",
    coverImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    creatorName: "Sophia Chen",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    creatorHandle: "@sophia_trails",
    description: "High mountain passes, cable cars up the Matterhorn, and crystal-clear lake cruises.",
  likesCount: 289,
    savesCount: 95,
  },
  {
    id: "comm-4",
    shareToken: "trip-4",
    title: "Balinese Culinary & Jungle Sanctuary",
    destination: "Ubud & Canggu",
    country: "Indonesia",
    region: "Asia",
    category: "Budget Friendly",
    durationDays: 12,
    cityCount: 2,
    datesLabel: "Nov 01 – Nov 13, 2026",
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    creatorName: "Liam O'Connor",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    creatorHandle: "@liam_nomad",
    description: "Spiritual temple visits, organic farm-to-table workshops, and sunset beach surfing.",
    likesCount: 421,
    savesCount: 180,
  },
];
