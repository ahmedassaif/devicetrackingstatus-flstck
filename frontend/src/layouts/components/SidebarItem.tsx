import React from 'react';
import { Sidebar } from 'flowbite-react';

interface SidebarItemProps {
  href: string;
  barName: string;
  sideBarIcon: React.ReactNode;
  drawerOpen: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isPointer: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  barName,
  sideBarIcon,
  drawerOpen,
  onClick,
  isPointer
}) => {
  const handleIconClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <li>
      <Sidebar.Item
        href={href}
        onClick={handleIconClick}
        className={`group items-center justify-start rounded-lg transition duration-100 ease-in-out hover:scale-105 ${isPointer ? 'cursor-pointer' : ''}`}
      >
        <div className='flex flex-row items-center'>
            <div className='basis-1/4'>
                {sideBarIcon}
            </div>
            <div className='basis-3/4'>
                <span className={`flex-1 whitespace-nowrap ${drawerOpen ? 'visible opacity-100' : 'collapse opacity-0'} transition-all duration-100 ease-in-out`}>
                    {barName}
                </span>
            </div>
        </div>
      </Sidebar.Item>
    </li>
  );
};

export default SidebarItem;
