import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SidebarDropdown from "@/components/Sidebar/SidebarDropdown";

const SidebarItem = ({ item, pageName, setPageName, isCollapsible }: any) => {
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";

    return setPageName(updatedPageName);
  };

  const pathname = usePathname();

  const isActive = (item: any) => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some((child: any) => isActive(child));
    }

    return false;
  };

  const isItemActive = isActive(item);

  return (
    <li>
      <Link
        className={`${isItemActive ? "bg-graydark dark:bg-meta-4" : ""} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
        href={item.route}
        onClick={handleClick}
      >
        {item.icon}
        {/* Show label only if not collapsible */}
        {!isCollapsible && item.label}
      </Link>

      {item.children && (
        <div
          className={`translate transform overflow-hidden ${
            pageName !== item.label.toLowerCase() && "hidden"
          }`}
        >
          <SidebarDropdown item={item.children} />
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
