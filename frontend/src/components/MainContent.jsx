import React from "react";
import MenuItem from "./MenuItem.jsx";
import { BiSun, BiFoodMenu, BiMoon, BiCookie } from "react-icons/bi";
import loadingGif from "../assets/loading.gif";

const menuIcons = {
  breakfast: <BiSun size={20} />,
  lunch: <BiFoodMenu size={20} />,
  snacks: <BiCookie size={20} />,
  dinner: <BiMoon size={20} />,
};

const navItems = ["breakfast", "lunch", "snacks", "dinner"];

const MainContent = ({
  menuResponse,
  loading,
  isSidebarOpen,
  sidebarWidth,
  selectedMenu,
  setSelectedMenu,
  isMobile,
}) => {
  /* ---------- Loading State ---------- */
  if (loading) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <img
          src={loadingGif}
          alt="Loading"
          className="w-32 h-32 mb-4"
        />
        <p className="text-lg font-medium opacity-80">
          Preparing your plate 🍽️
        </p>
      </main>
    );
  }

  /* ---------- Empty State ---------- */
  if (!menuResponse) {
    return (
      <main
        className="flex-1 p-6"
        style={{
          marginLeft:
            isSidebarOpen && !isMobile ? `${sidebarWidth}px` : "0px",
        }}
      >
        <p className="text-lg">No menu available for this day</p>
      </main>
    );
  }

  const items = menuResponse.meals?.[selectedMenu] || [];
  const displayDate = new Date(menuResponse.date).toDateString();

  return (
    <main
      className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out
                 p-2 sm:p-4"
      style={{
        marginLeft:
          isSidebarOpen && !isMobile ? `${sidebarWidth}px` : "0px",
      }}
    >
      {/* ---------- Header ---------- */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          What’s on your plate today? 🍛
        </h1>
        <p className="text-sm opacity-70 mt-1">
          {displayDate} · {menuResponse.foodType.toUpperCase()}
        </p>
      </div>

      {/* ---------- Meal Tabs ---------- */}
      <nav className="mb-8">
        <ul className="flex flex-wrap justify-center gap-4 border-b border-[rgb(var(--border))]">
          {navItems.map((menu) => {
            const isActive = selectedMenu === menu;
            return (
              <li
                key={menu}
                onClick={() => setSelectedMenu(menu)}
                className={`
                  flex items-center gap-2 p-3 cursor-pointer
                  font-medium capitalize transition
                  ${
                    isActive
                      ? "border-b-2 border-brand-DEFAULT text-brand-DEFAULT"
                      : "opacity-70 hover:opacity-100"
                  }
                `}
              >
                {menuIcons[menu]}
                {menu}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ---------- Menu List (Centered) ---------- */}
      <div className="flex justify-center">
        <div
          className="
            w-full max-w-2xl
            bg-[rgb(var(--bg))]
            text-[rgb(var(--text))]
            p-4 sm:p-6
            rounded-lg shadow-md
          "
        >
          {items.length > 0 ? (
            items.map((item, idx) => (
              <MenuItem key={idx} name={item} />
            ))
          ) : (
            <p className="text-sm opacity-70 text-center">
              No items available for this meal
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
