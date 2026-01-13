import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { menuData } from './data/menuData';

const MOBILE_BREAKPOINT = 1024;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(256); 
  const [selectedMenu, setSelectedMenu] = useState('lunch');
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [currentHostel, setCurrentHostel] = useState('Hostel A');
  const [currentMenuType, setCurrentMenuType] = useState('Veg');
  
  // --- NEW: Theme state ---
  // Reads from localStorage or defaults to 'dark'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // --- NEW: Effect to update <html> tag ---
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme); // Save preference
  }, [theme]);
  
  useEffect(() => {
    // ... (no change in this resize listener)
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    setIsSidebarOpen(window.innerWidth >= MOBILE_BREAKPOINT);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentMenuData = menuData[selectedMenu];

  return (
    <div 
      // --- NEW: Swappable background colors ---
      className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white" 
      // --- NEW: Conditional background image (only for dark mode) ---
      style={theme === 'dark' ? { 
        backgroundColor:"gray" 
      } : {}}
    >
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
        isMobile={isMobile}
        // --- Pass theme state down ---
        theme={theme}
        setTheme={setTheme}
      />
      
      <MainContent 
        menuData={currentMenuData}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        sidebarWidth={sidebarWidth}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        isMobile={isMobile}
        currentHostel={currentHostel}
        currentMenuType={currentMenuType}
      />
    </div>
  );
}

export default App;