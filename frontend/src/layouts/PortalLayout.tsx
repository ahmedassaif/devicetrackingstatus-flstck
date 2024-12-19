import React from 'react';
import TopNavbar from './TopNavbar';

const PortalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleMenuClick = () => {
    // Implement menu click functionality, such as toggling a sidebar
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <TopNavbar onMenuClick={handleMenuClick} />

      {/* Main Content */}
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  );
};

export default PortalLayout;
