import React from 'react';
import { Navbar, Button } from 'flowbite-react';
import { HiMenu } from 'react-icons/hi';

interface TopNavbarProps {
  onMenuClick: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  return (
    <Navbar>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold">App Name</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button onClick={onMenuClick}>
          <HiMenu className="text-xl" />
        </Button>
      </div>
    </Navbar>
  );
};

export default TopNavbar;
