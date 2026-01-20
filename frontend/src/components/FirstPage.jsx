import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
  const [menu, setMenu] = useState("Veg");
  const [hostel, setHostel] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hostel.trim()) {
      alert("Please enter hostel name");
      return;
    }

    // Save preferences
    const preferences = {
      hostel,
      menu,
    };

    localStorage.setItem("preference", JSON.stringify(preferences));

    // Redirect to main app
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg border border-[rgb(var(--border))] space-y-4 w-80"
      >
        <h2 className="text-lg font-semibold text-center">
          Select Preferences
        </h2>

        <div>
          <label htmlFor="hostel" className="block mb-1">
            Hostel name
          </label>
          <input
            type="text"
            id="hostel"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            placeholder="Enter your hostel name"
            className="w-full px-3 py-2 border rounded bg-transparent"
          />
        </div>

        <div>
          <label htmlFor="menu" className="block mb-1">
            Category
          </label>
          <select
            id="menu"
            value={menu}
            onChange={(e) => setMenu(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-transparent"
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Special">Special</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default FirstPage;
