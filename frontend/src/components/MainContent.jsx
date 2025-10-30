import React from 'react';
import MenuItem from './MenuItem.jsx';
import Header from './Header.jsx'; // --- NEW: Import Header ---
// --- Icons are no longer needed here ---
import { BiSun, BiFoodMenu, BiMoon, BiCookie } from 'react-icons/bi';

const menuIcons = {
  breakfast: <BiSun size={20} />,
  lunch: <BiFoodMenu size={20} />,
  dinner: <BiMoon size={20} />,
  snacks: <BiCookie size={20} />,
};
const navItems = ['breakfast', 'lunch', 'dinner', 'snacks'];

const MainContent = ({ 
  menuData, 
  isSidebarOpen, 
  setIsSidebarOpen, 
  sidebarWidth,
  selectedMenu,
  setSelectedMenu,
  isMobile,
  currentHostel,
  currentMenuType
}) => {
  const { title, image } = menuData;

  const imageSizeClass = title.toLowerCase() === 'breakfast'
    ? 'w-2/3 lg:w-3/4' 
    : 'w-full';        

  return (
    <main 
      className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out
                 p-4 sm:p-10"
      style={{ marginLeft: isSidebarOpen && !isMobile ? `${sidebarWidth}px` : '0px' }}
    >
      {/* --- NEW: Render Header component --- */}
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={isMobile}
        title={title}
        currentHostel={currentHostel}
        currentMenuType={currentMenuType}
      />

      {/* --- HEADER CODE REMOVED FROM HERE --- */}

      {/* --- Menu Navigation Tabs (Updated styles) --- */}
      <nav className="mb-8 sm:mb-12">
        <ul className="flex flex-wrap items-center gap-2 sm:gap-4 border-b border-gray-200 dark:border-gray-700">
          {navItems.map((menu) => {
            const isActive = selectedMenu === menu;
            return (
              <li
                key={menu}
                onClick={() => setSelectedMenu(menu)}
                className={`
                  flex items-center gap-2 p-3 sm:p-4 cursor-pointer transition-colors
                  font-medium text-base sm:text-lg -mb-px
                  ${isActive
                    ? 'border-b-2 border-brand-DEFAULT text-brand-DEFAULT' 
                    : 'text-gray-500 dark:text-white-400 hover:text-black dark:hover:text-white'
                  }
                `}
              >
                {menuIcons[menu]}
                <span className="capitalize">{menu}</span>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* --- Main Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
        
        {/* --- Item List (Updated styles) --- */}
        <div className="bg-white dark:bg-black/30 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md dark:shadow-none">
          {menuData.items.map((item) => (
            <MenuItem key={item.name} name={item.name} />
          ))}
        </div>
        
        {/* --- Image (Updated styles) --- */}
        <div className="flex justify-center items-center lg:sticky top-10">
          <img
            src={image}
            alt={title}
            className={`
              rounded-full object-cover aspect-square 
              shadow-lg dark:shadow-2xl dark:shadow-black/50
              transition-all duration-500 ease-in-out
              ${imageSizeClass}
            `}
          />
        </div>
      </div>
    </main>
  );
};

export default MainContent;