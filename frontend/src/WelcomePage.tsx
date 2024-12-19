import React from 'react';
import { Carousel } from 'flowbite-react';

const WelcomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p className="text-lg mb-4">This is the welcome page.</p>

      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="Slide 1" />
          <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="Slide 2" />
          <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="Slide 3" />
          <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="Slide 4" />
          <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="Slide 5" />
        </Carousel>
      </div>
    </div>
  );
};

export default WelcomePage;
