import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios'
 
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import FirstPage from "./components/firstpage";
import Header from "./components/Header";
import PreferenceRoute from "./PreferenceRoute";
import { menuData } from "./data/menuData";

const MOBILE_BREAKPOINT = 1024;
const Backend_Url=import.meta.env.VITE_BACKEND_URL;
function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [selectedMenu, setSelectedMenu] = useState("breakfast");
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [currentHostel, setCurrentHostel] = useState("Hostel A");
  const [currentMenuType, setCurrentMenuType] = useState("Non Veg");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuResponse, setMenuResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      setIsSidebarOpen(window.innerWidth >= MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(()=>{
    const prefernce=JSON.parse(localStorage.getItem('preference'))
    if( prefernce && prefernce.hostel && prefernce.menu){
      setCurrentHostel(prefernce.hostel);
      setCurrentMenuType(prefernce.menu);
    }
  })
  useEffect(() => {
  const preference = JSON.parse(localStorage.getItem("preference"));

  if (!preference) return;

  const { hostel, menu } = preference;

  setCurrentHostel(hostel);
  setCurrentMenuType(menu);

  const today = new Date().toISOString().split("T")[0];

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Backend_Url}`+"api/menu", {
        params: {
          date: today,
          hostelType: hostel.toLowerCase(),
          menuType: menu.toLowerCase() // veg / non veg / special
        }
      });
      setMenuResponse(res.data);
    } catch (err) {
      console.error("Failed to fetch menu", err);
      setMenuResponse(null);
    } finally {
      setLoading(false);
    }
  };

  fetchMenu();
}, []);


  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
        isMobile={isMobile}
      />

      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={isMobile}
        currentHostel={currentHostel}
        currentMenuType={currentMenuType}
        theme={theme}
        setTheme={setTheme}
      />

      <MainContent
      menuResponse={menuResponse}
      loading={loading}
      isSidebarOpen={isSidebarOpen}
      sidebarWidth={sidebarWidth}
      selectedMenu={selectedMenu}
      setSelectedMenu={setSelectedMenu}
      isMobile={isMobile}
    />

    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* First page */}
      <Route path="/init" element={<FirstPage />} />

      {/* Protected dashboard */}
      <Route
        path="/"
        element={
          <PreferenceRoute>
            <DashboardLayout />
          </PreferenceRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
