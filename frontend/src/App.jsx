import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { menuData } from './data/menuData';

const MOBILE_BREAKPOINT = 1024;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256); 
  const [selectedMenu, setSelectedMenu] = useState('breakfast');
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [currentHostel, setCurrentHostel] = useState('Hostel A');
  const [currentMenuType, setCurrentMenuType] = useState('Non Veg');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme); // Save preference
  }, [theme]);
  
  useEffect(() => {
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
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
        isMobile={isMobile}
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