import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import NavMenu from './NavMenu';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isShrunk, setIsShrunk] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsShrunk(!isShrunk);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Side Navigation */}
      <NavMenu isOpen={isOpen} isShrunk={isShrunk} />

      <div className={`flex flex-col transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Top Navigation Bar */}
        <TopNavbar onMenuClick={toggleSidebar} />

        {/* Main Content */}
        <main className="p-4 flex-grow overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
