import React from 'react';
import MenuItem from './MenuItem.jsx';
import Header from './Header.jsx';
import { BiSun, BiFoodMenu, BiMoon, BiCookie } from 'react-icons/bi';

const menuIcons = {
  breakfast: <BiSun size={20} />,
  lunch: <BiFoodMenu size={20} />,
  dinner: <BiMoon size={20} />,
  snacks: <BiCookie size={20} />,
};
const navItems = ['breakfast', 'lunch', "snacks", 'dinner'];

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

  const imageSizeClass = 'w-full';
  return (
    <main
      className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out
                 p-4 sm:p-10"
      style={{ marginLeft: isSidebarOpen && !isMobile ? `${sidebarWidth}px` : '0px' }}
    >
      
      <nav className="mb-8 sm:mb-12">
        <ul className="flex flex-wrap items-center gap-2 sm:gap-4 border-b border-[rgb(var(--border))]">
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
                    : 'border-[rgb(var(--border))] menuItem'
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
        <div className="bg-[rgb(var(--bg))] text-[rgb(var(--text))] backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md ">
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
              rounded-full aspect-square 
              shadow-lg bg-[rgb(var(--bg))] 
              transition-all duration-500 ease-in-out
            `}
          />
        </div>
      </div>
    </main>
  );
};

export default MainContent;