import React from 'react';
import { Navbar, Button } from 'flowbite-react';
import { HiMenu } from 'react-icons/hi';

interface TopNavbarProps {
  onMenuClick: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  return (
    <Navbar className="flex h-16 items-center overflow-hidden border-b bg-white">
      <Navbar.Brand href="/">
        <span className="whitespace-nowrap text-xl font-semibold">Device Tracking Status</span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default TopNavbar;
