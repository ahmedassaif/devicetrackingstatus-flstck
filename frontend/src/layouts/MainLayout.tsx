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
    <div className="flex min-h-screen overflow-hidden">
      {/* Side Navigation */}
      <NavMenu isOpen={isOpen} isShrunk={isShrunk} />

      <div className={`flex flex-col w-full transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Top Navigation Bar */}
        <TopNavbar onMenuClick={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-grow w-full overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
