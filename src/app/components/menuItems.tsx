import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  Cog6ToothIcon,
  DocumentIcon,
  GlobeAltIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Home from "../page";
export const menuItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <UsersIcon />,
  },
  {
    name: "Holidays",
    href: "/dashboard/holidays",
    icon: <GlobeAltIcon />,
  },
  {
    name: "Documents",
    href: "/dashboard/documents",
    icon: <DocumentIcon />,
  },

  {
    name: "Trainings",
    href: "/dashboard/trainings",
    icon: <AcademicCapIcon />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <Cog6ToothIcon />,
  },
  {
    name: "Help",
    href: "/dashboard/help",
    icon: <QuestionMarkCircleIcon />,
  },
  {
    name: "Admin",
    href: "/dashboard/admin",
    icon: <BuildingLibraryIcon />,
  },
];
