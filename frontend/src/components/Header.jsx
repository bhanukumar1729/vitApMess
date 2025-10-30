import React from 'react';
import { 
  BiMenu, BiBuildingHouse, BiLeaf, BiRestaurant, BiStar 
} from 'react-icons/bi';

const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile,
  title,
  currentHostel,
  currentMenuType,
}) => {

  // Helper function to get the correct icon for menu type
  const getMenuTypeIcon = () => {
    switch (currentMenuType.toLowerCase()) {
      case 'veg':
        return <BiLeaf className="text-green-500" size={18} />;
      case 'non veg':
        return <BiRestaurant className="text-red-500" size={18} />;
      case 'special':
        return <BiStar className="text-yellow-500" size={18} />;
      default:
        return <BiLeaf size={18} />;
    }
  };

  return (
    <header>
      {/* --- Main Header Row --- */}
      <div className="flex items-center mb-2">
        <button 
            onClick={() => setIsSidebarOpen(true)}
            // Light/Dark styles added
            className={`
              p-2 mr-2 sm:mr-4 rounded-md 
              text-gray-600 dark:text-gray-300 
              bg-gray-200 dark:bg-black/30 
              hover:bg-gray-300 dark:hover:bg-gray-700 
              transition-all
              ${isSidebarOpen && !isMobile ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'}
            `}
            aria-label="Open menu"
            disabled={isSidebarOpen && !isMobile}
          >
            <BiMenu size={28} />
          </button>
        
        {/* Title (Light/Dark styles added) */}
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white capitalize">
          {title} Menu
        </h1>
      </div>

      {/* --- Header Info Bar --- */}
      {/* (Light/Dark styles added) */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 
                    text-gray-600 dark:text-gray-300 
                    text-sm sm:text-base mb-6 
                    ml-[44px] sm:ml-[52px]">
        <div className="flex items-center gap-2 bg-gray-200 dark:bg-black/20 px-3 py-1 rounded-full">
          <BiBuildingHouse className="text-gray-400 dark:text-gray-400" size={18} />
          <span>{currentHostel}</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-200 dark:bg-black/20 px-3 py-1 rounded-full">
          {getMenuTypeIcon()}
          <span>{currentMenuType}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;