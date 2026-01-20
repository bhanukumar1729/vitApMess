import React, { useState, useEffect, useCallback } from 'react';
import { BiCalendar, BiX, BiSun, BiMoon } from 'react-icons/bi';

const MIN_WIDTH = 200;
const MAX_WIDTH = 500;
const MOBILE_WIDTH = 280;

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  sidebarWidth,
  setSidebarWidth,
  isMobile
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
  return (
    <aside
      // --- NEW: Updated light/dark styles ---
      className={`
        fixed top-0 left-0 z-40 h-screen 
        backdrop-blur-sm 
        bg-[rgb(var(--bg))] text-[rgb(var(--text))]
        border-r border-[rgb(var(--border))]
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      style={{ width: `${currentWidth}px` }}
    >
      <div className="w-full p-6 flex flex-col h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold bg-[rgb(var(--bg))] text-[rgb(var(--text))]">VitapMess</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="btn ml-4 bg-[rgb(var(--bg))] text-[rgb(var(--text))] hover:text-[rgb(var(--text))] transition-colors"
            aria-label="Close menu"
          >
            <BiX size={30} />
          </button>
        </div>
        <div>
          <label
            htmlFor="date-picker"
            className="flex items-center gap-2 text-sm font-medium text-[rgb(var(--text))] cursor-pointer"
          >
            <BiCalendar />
            Pick Date
          </label>
          <input
            type="date"
            id="date-picker"
            className="w-full p-2 rounded-md 
                       border border-[rgb(var(--border))]
                       cursor-pointer
                       bg-[rgb(var(--bg))] text-[rgb(var(--text))]
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
            bg-[rgb(var(--bg))]
            hover:bg-brand-DEFAULT transition-colors
          "
        />
      )}
    </aside>
  );
};

export default Sidebar;