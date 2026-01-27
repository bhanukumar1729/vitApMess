import React, { useState, useEffect, useCallback } from "react";
import { BiCalendar, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const MIN_WIDTH = 200;
const MAX_WIDTH = 500;
const MOBILE_WIDTH = 280;

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  sidebarWidth,
  setSidebarWidth,
  isMobile,
  onSubmitDate, // 👈 from App.jsx
}) => {
  const navigate = useNavigate();

  const [isResizing, setIsResizing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  /* ---------- Resize Logic ---------- */
  const startResizing = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => setIsResizing(false), []);

  const resize = useCallback(
    (e) => {
      if (isResizing) {
        let newWidth = e.clientX;
        if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
        if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
        setSidebarWidth(newWidth);
      }
    },
    [isResizing, setSidebarWidth]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  const currentWidth = isMobile ? MOBILE_WIDTH : sidebarWidth;

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 h-screen
        bg-[rgb(var(--bg))] text-[rgb(var(--text))]
        border-r border-[rgb(var(--border))]
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      style={{ width: `${currentWidth}px` }}
    >
      <div className="p-6 flex flex-col gap-6 h-full">
        {/* ---------- Header ---------- */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">VitapMess</h1>
          <button onClick={() => setIsSidebarOpen(false)}>
            <BiX size={30} />
          </button>
        </div>

        {/* ---------- Date + Submit Box ---------- */}
        <div className="border border-[rgb(var(--border))] rounded-lg p-3">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <BiCalendar />
            Pick Date
          </label>

          {/* Date input */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="
      w-full p-2 rounded-md border mb-3
      bg-[rgb(var(--bg))] text-[rgb(var(--text))]
      focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT
    "
          />

          {/* Submit button (next line, same box) */}
          <button
            className="
      w-full py-2 rounded-md
      bg-[rgb(var(--bg))] text-[rgb(var(--text))]
      hover:opacity-90 transition
    "
            onClick={() => {
              onSubmitDate(selectedDate);
              setIsSidebarOpen(false);
            }}
          >
            Submit
          </button>
        </div>


        {/* ---------- Reset Preferences ---------- */}
        <button
          className="
            mt-auto p-2 rounded-md border
            bg-[rgb(var(--bg))] text-[rgb(var(--text))]
            hover:bg-[rgb(var(--border))]
            transition
          "
          onClick={() => navigate("/init")}
        >
          Reset Preferences
        </button>
      </div>

      {/* ---------- Resizer ---------- */}
      {!isMobile && (
        <div
          onMouseDown={startResizing}
          className="
            absolute top-0 right-0 h-full w-2
            cursor-col-resize
            hover:bg-brand-DEFAULT transition-colors
          "
        />
      )}
    </aside>
  );
};

export default Sidebar;
