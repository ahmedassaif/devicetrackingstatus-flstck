import React from 'react';
import { Sidebar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineAudit } from 'react-icons/ai';
import { HiChartPie, HiInformationCircle } from 'react-icons/hi';

interface NavMenuProps {
  isOpen: boolean;
  isShrunk: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ isOpen, isShrunk }) => {
  const sidebarWidth = isOpen ? 'w-64' : 'w-16';

  return (
    <div className={`bg-primary fixed left-0 top-0 h-full transition-all duration-300 ${sidebarWidth}`}>
      <Sidebar aria-label="Sidebar" className={`h-full transition-all duration-300 ${sidebarWidth}`}>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} to="/" icon={HiChartPie}>
              {!isShrunk && <span className="ml-3">Dashboard</span>}
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/Audits" icon={AiOutlineAudit}>
              {!isShrunk && <span className="ml-3">Audits</span>}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default NavMenu;
