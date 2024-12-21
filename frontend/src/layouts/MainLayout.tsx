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
      <div className={`fixed left-0 top-0 h-screen transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}>
        <div className="flex h-16 items-center justify-center border-b bg-white">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <NavMenu isOpen={isOpen} isShrunk={isShrunk} />
      </div>

      <div className={`w-full pt-0 transition-all duration-300 ease-in-out ${isOpen ? 'pl-64' : 'pl-16'}`}>
        {/* Top Navigation Bar */}
        <div className="flex grow pt-16">
          <div className="fixed top-0 z-10 w-full">
            <TopNavbar onMenuClick={toggleSidebar} />
          </div>

          {/* Main Content */}
          <main className="h-full flex-grow overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
