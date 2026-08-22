export interface DashboardTrip {
  id: string;
  title: string;
  destination: string;
  country: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  cityCount: number;
  budgetTotal: string;
  status: "upcoming" | "ongoing" | "completed";
}

export const MOCK_TRIPS: DashboardTrip[] = [
  {
    id: "trip-1",
    title: "Autumn Heritage & Bamboo Groves",
    destination: "Kyoto & Osaka",
    country: "Japan",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    startDate: "Oct 12, 2026",
    endDate: "Oct 22, 2026",
    durationDays: 10,
    cityCount: 3,
    budgetTotal: "$2,850",
    status: "upcoming",
  },
  {
    id: "trip-2",
    title: "Mediterranean Cliffs & Amalfi Sunset",
    destination: "Positano & Capri",
    country: "Italy",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    startDate: "Aug 20, 2026",
    endDate: "Aug 30, 2026",
    durationDays: 10,
    cityCount: 4,
    budgetTotal: "$3,400",
    status: "ongoing",
  },
  {
    id: "trip-3",
    title: "Alpine Peaks & Glacier Lakes Expedition",
    destination: "Interlaken & Zermatt",
    country: "Switzerland",
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    startDate: "Sep 15, 2025",
    endDate: "Sep 23, 2025",
    durationDays: 8,
    cityCount: 2,
    budgetTotal: "$4,100",
    status: "completed",
  },
  {
    id: "trip-4",
    title: "Icelandic Aurora & Volcanic Ring Road",
    destination: "Reykjavik & Vik",
    country: "Iceland",
    imageUrl: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
    startDate: "Nov 05, 2026",
    endDate: "Nov 14, 2026",
    durationDays: 9,
    cityCount: 3,
    budgetTotal: "$3,200",
    status: "upcoming",
  },
  {
    id: "trip-5",
    title: "Scottish Highlands & Castles Escape",
    destination: "Edinburgh & Isle of Skye",
    country: "United Kingdom",
    imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
    startDate: "May 10, 2025",
    endDate: "May 18, 2025",
    durationDays: 8,
    cityCount: 2,
    budgetTotal: "$2,600",
    status: "completed",
  },
  {
    id: "trip-6",
    title: "Serengeti Migration & Zanzibar Beaches",
    destination: "Serengeti & Zanzibar",
    country: "Tanzania",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    startDate: "Dec 10, 2026",
    endDate: "Dec 22, 2026",
    durationDays: 12,
    cityCount: 3,
    budgetTotal: "$4,800",
    status: "upcoming",
  },
];
