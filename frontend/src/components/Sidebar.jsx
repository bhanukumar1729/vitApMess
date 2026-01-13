import React, { useState, useEffect, useCallback } from 'react';
// --- NEW: Import icons for theme toggle ---
import { BiCalendar, BiX, BiSun, BiMoon } from 'react-icons/bi';

const MIN_WIDTH = 200;
const MAX_WIDTH = 500;
const MOBILE_WIDTH = 280;

const Sidebar = ({ 
  isSidebarOpen, 
  setIsSidebarOpen,
  sidebarWidth,
  setSidebarWidth,
  isMobile,
  theme,      
  setTheme    
}) => {
  
  const [isResizing, setIsResizing] = useState(false);
  const startResizing = useCallback((e) => { e.preventDefault(); setIsResizing(true); }, []);
  const stopResizing = useCallback(() => { setIsResizing(false); }, []);
  const resize = useCallback((e) => {
    if (isResizing) {
      let newWidth = e.clientX;
      if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
      if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
      setSidebarWidth(newWidth);
    }
  }, [isResizing, setSidebarWidth]);
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);


  const currentWidth = isMobile ? MOBILE_WIDTH : sidebarWidth;

  // --- NEW: Toggle function ---
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <aside 
      // --- NEW: Updated light/dark styles ---
      className={`
        fixed top-0 left-0 z-40 h-screen 
        bg-white/80 dark:bg-black/80 backdrop-blur-sm 
        text-gray-800 dark:text-white 
        border-r border-gray-200 dark:border-gray-800
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      style={{ width: `${currentWidth}px` }}
    >
      <div className="w-full p-6 flex flex-col h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">VitapMess</h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">Restaurant</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <BiX size={28} />
          </button>
        </div>
        
        {/* --- NEW: Theme Toggle Button --- */}
        <div className="mt-auto mb-6">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3">Theme</h2>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg 
                       bg-gray-200 dark:bg-gray-800 
                       text-gray-800 dark:text-gray-300
                       hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? <BiMoon size={20} /> : <BiSun size={20} />}
          </button>
        </div>
        
        {/* Date Picker (Updated styles) */}
        <div>
          <label 
            htmlFor="date-picker" 
            className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2"
          >
            <BiCalendar />
            Pick Date
          </label>
          <input 
            type="date"
            id="date-picker"
            className="w-full p-2 rounded-md 
                       bg-gray-200 dark:bg-gray-800 
                       border border-gray-300 dark:border-gray-700 
                       text-gray-800 dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {/* Resizer Handle (Updated styles) */}
      {!isMobile && (
        <div
          onMouseDown={startResizing}
          className="
            absolute top-0 right-0 h-full w-2 z-50
            cursor-col-resize
            bg-gray-300/30 dark:bg-gray-600/30 
            hover:bg-brand-DEFAULT transition-colors
          "
        />
      )}
    </aside>
  );
};

export default Sidebar;