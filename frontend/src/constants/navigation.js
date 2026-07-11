import {
  LayoutDashboard,
  MapPinned,
  Hospital,
  Bot,
  Siren,
  History,
  Settings,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Live Map",
    icon: MapPinned,
    path: "/map",
  },
  {
    title: "Nearby Hospitals",
    icon: Hospital,
    path: "/hospitals",
  },
  {
    title: "AI Assistant",
    icon: Bot,
    path: "/assistant",
  },
  {
    title: "Emergency",
    icon: Siren,
    path: "/emergency",
  },
  {
    title: "History",
    icon: History,
    path: "/history",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];