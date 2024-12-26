/* eslint-disable prettier/prettier */
import {
  FaChartPie,
  FaCalendar,
  FaUser,
  FaTable,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

export const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <FaChartPie />,
        label: "Dashboard",
        route: "#",
        children: [{ label: "eCommerce", route: "/" }],
      },
      {
        icon: <FaCalendar />,
        label: "Calendar",
        route: "/calendar",
      },
      {
        icon: <FaUser />,
        label: "Profile",
        route: "/profile",
      },
      {
        icon: <FaTable />,
        label: "Tables",
        route: "/tables",
      },
      {
        icon: <FaChartBar />,
        label: "Chart",
        route: "/chart",
      },
      {
        icon: <FaCog />,
        label: "Settings",
        route: "/settings",
      },
    ],
  },
  // Add other menu groups similarly...
];
