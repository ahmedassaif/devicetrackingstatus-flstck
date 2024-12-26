"use client";

import React from "react";
import { FaAmazon, FaArrowRight } from "react-icons/fa";

import { menuGroups } from "./MenuGroupIcons";

import SidebarItem from "@/components/Sidebar/SidebarItem";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({
  toggleCollapse,
  isCollapsible,
  handleSidebarToggle,
}: any) => {
  // const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  // const [toggleCollapse, setToggleCollapse] = useState(false);
  // const [isCollapsible, setIsCollapsible] = useState(false);

  // const wrapperClasses = classNames(
  //   "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
  //   {
  //     ["w-80"]: !toggleCollapse,
  //     ["w-20"]: toggleCollapse,
  //   },
  // );

  // const handleSidebarToggle = () => {
  //   setToggleCollapse(!toggleCollapse);
  // };

  // const collapseIconClasses = classNames(
  //   "p-4 rounded bg-light-lighter absolute right-0",
  //   {
  //     "rotate-180": toggleCollapse,
  //   },
  // );

  // const onMouseOver = () => {
  //   setIsCollapsible(!isCollapsible);
  // };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-black transition-all duration-300 ease-in-out ${
        toggleCollapse ? "w-20" : "w-72"
      }`}
    >
      {/* <div
      className={wrapperClasses}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
    > */}
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between p-4">
        <FaAmazon size={30} />
        {isCollapsible && (
          <button onClick={handleSidebarToggle}>
            <FaArrowRight
              className={toggleCollapse ? "rotate-180" : ""}
              size={30}
            />
          </button>
        )}
      </div>
      <nav className="mt-5">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="mb-4 text-sm font-semibold text-white">
              {group.name}
            </h3>
            <ul>
              {group.menuItems.map((menuItem, menuIndex) => (
                <SidebarItem
                  key={menuIndex}
                  isCollapsible={toggleCollapse} // Pass the collapse state
                  item={menuItem}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
function classNames(
  baseClasses: string,
  conditionalClasses: Record<string, boolean>,
) {
  const activeClasses = Object.entries(conditionalClasses)
    .filter(([, enabled]) => enabled)
    .map(([className]) => className);

  return [baseClasses, ...activeClasses].join(" ");
}
