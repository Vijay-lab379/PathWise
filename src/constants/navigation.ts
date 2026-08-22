import { ROUTES } from "./routes";

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  { label: "Dashboard", href: ROUTES.DASHBOARD },
  { label: "Trips", href: ROUTES.TRIPS },
  { label: "Explore", href: ROUTES.EXPLORE },
  { label: "Community", href: ROUTES.COMMUNITY },
] as const;
