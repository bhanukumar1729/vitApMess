import React from 'react';
import {
  BiMenu, BiBuildingHouse, BiLeaf, BiRestaurant, BiStar, BiMoon, BiSun
} from 'react-icons/bi';

const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile,
  currentHostel,
  currentMenuType,
  theme,
  setTheme
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
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header>
      <div className="flex items-center mb-2">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className={`
              btn p-2 mr-2 sm:mr-4 rounded-md 
              bg-[rgb(var(--bg))] text-[rgb(var(--text))]
              transition-all
              ${isSidebarOpen && !isMobile ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'}
            `}
          aria-label="Open menu"
          disabled={isSidebarOpen && !isMobile}
        >
          <BiMenu size={28} />
        </button>
        <h1 className="text-3xl sm:text-5xl font-bold bg-[rgb(var(--bg))] text-[rgb(var(--text))] capitalize">
          VitAp Mess
        </h1>
      </div>
      <div className="flex items-center gap-4 sm:gap-6 
                    text-gray-600 bg-[rgb(var(--bg))] text-[rgb(var(--text))]
                    text-sm sm:text-base mb-6 
                    ml-[44px] sm:ml-[52px]">
        <div className='flex  items-center gap-3'>
          <div className="flex items-center gap-2 bg-[rgb(var(--bg))] text-[rgb(var(--text))] px-3 py-1 rounded-full">
            <BiBuildingHouse className="text-[rgb(var(--text))]" size={24} />
            <span>{currentHostel}</span>
          </div>
          <div className="flex items-center gap-2 bg-[rgb(var(--bg))] text-[rgb(var(--text))] px-3 py-1 rounded-full">
            {getMenuTypeIcon()}
            <span >{currentMenuType}</span>
          </div>
        </div>
        <div className='ml-auto'> 
          <button
            onClick={toggleTheme}
            className=" flex items-center justify-center gap-2 p-3 rounded-lg 
                               bg-[rgb(var(--bg))] text-[rgb(var(--text))]
                               hover:bg-[rgb(var(--hover))]  transition-colors"
          >
            {theme === 'light' ? <BiMoon size={24} /> : <BiSun size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;