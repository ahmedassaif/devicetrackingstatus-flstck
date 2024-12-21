import React from 'react';
import { Sidebar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineAudit } from 'react-icons/ai';
import { HiChartPie, HiInformationCircle } from 'react-icons/hi';
import SidebarItem from './components/SidebarItem';


interface NavMenuProps {
  isOpen: boolean;
  isShrunk: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ isOpen, isShrunk }) => {
  const sidebarWidth = isOpen ? 'w-64' : 'w-16';

  return (
    // <div className={`transitiontransition-transform left-0 top-0 h-full sm:translate-x-0`}>
      
    // </div>
    <Sidebar aria-label="Sidebar" className={`left-0 h-screen w-full transition-transform sm:translate-x-0`}>
        <Sidebar.Items>
          <ul className="space-y-2 font-medium">
            <Sidebar.ItemGroup> 
              <SidebarItem href="/" barName="Dashboard" sideBarIcon={<HiChartPie />} drawerOpen={!isShrunk} isPointer={true} onClick={function (e: React.MouseEvent<HTMLAnchorElement>): void {
                throw new Error('Function not implemented.');
              } } />
              <SidebarItem href="/Audits" barName="Audits" sideBarIcon={<AiOutlineAudit />} drawerOpen={!isShrunk} isPointer={true} onClick={function (e: React.MouseEvent<HTMLAnchorElement>): void {
                throw new Error('Function not implemented.');
              } } /> 
            </Sidebar.ItemGroup>
          </ul>
        </Sidebar.Items>
      </Sidebar>
  );
};

export default NavMenu;
