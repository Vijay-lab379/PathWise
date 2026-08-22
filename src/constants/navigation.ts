import { ROUTES } from "./routes";

export interface NavItem {
  label: string;
  href: string;
  iconName: "home" | "compass" | "trips" | "users" | "user";
}

export const DESKTOP_NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: ROUTES.DASHBOARD, iconName: "home" },
  { label: "Explore", href: ROUTES.EXPLORE, iconName: "compass" },
  { label: "My Trips", href: ROUTES.TRIPS, iconName: "trips" },
  { label: "Community", href: ROUTES.COMMUNITY, iconName: "users" },
] as const;

export const MOBILE_NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: ROUTES.DASHBOARD, iconName: "home" },
  { label: "Explore", href: ROUTES.EXPLORE, iconName: "compass" },
  { label: "Trips", href: ROUTES.TRIPS, iconName: "trips" },
  { label: "Community", href: ROUTES.COMMUNITY, iconName: "users" },
  { label: "Profile", href: ROUTES.PROFILE, iconName: "user" },
] as const;
