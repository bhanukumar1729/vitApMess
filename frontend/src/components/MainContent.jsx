import React from "react";
import MenuItem from "./MenuItem.jsx";
import { BiSun, BiFoodMenu, BiMoon, BiCookie } from "react-icons/bi";

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
  /* ---------------- Loading State ---------------- */
  if (loading) {
    return (
      <main
        className="flex-1 p-6"
        style={{
          marginLeft:
            isSidebarOpen && !isMobile ? `${sidebarWidth}px` : "0px",
        }}
      >
        <p className="text-lg">Loading today’s menu...</p>
      </main>
    );
  }

  /* ---------------- Empty State ---------------- */
  if (!menuResponse) {
    return (
      <main
        className="flex-1 p-6"
        style={{
          marginLeft:
            isSidebarOpen && !isMobile ? `${sidebarWidth}px` : "0px",
        }}
      >
        <p className="text-lg">No menu available for today</p>
      </main>
    );
  }

  /* ---------------- Data ---------------- */
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
      {/* ---------- Navigation Tabs ---------- */}
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
                  ${
                    isActive
                      ? "border-b-2 border-brand-DEFAULT text-brand-DEFAULT"
                      : "border-[rgb(var(--border))] menuItem"
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

      {/* ---------- Main Grid ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
        {/* ---------- Item List ---------- */}
        <div className="bg-[rgb(var(--bg))] text-[rgb(var(--text))]
                        backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <MenuItem key={idx} name={item} />
            ))
          ) : (
            <p className="text-sm opacity-70">
              No items available for this meal
            </p>
          )}
        </div>

        {/* ---------- Image ---------- */}
        <div className="flex justify-center items-center lg:sticky top-10">
          <img
            src="/food-placeholder.png"
            alt="Meal"
            className="
              rounded-full aspect-square
              w-40 h-40
              sm:w-52 sm:h-52
              md:w-64 md:h-64
              lg:w-72 lg:h-72
              object-cover
              shadow-lg bg-[rgb(var(--bg))]
              transition-all duration-500 ease-in-out
            "
          />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
