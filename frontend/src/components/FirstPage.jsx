import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
  const [menu, setMenu] = useState("Veg");
  const [hostel, setHostel] = useState("MH1");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //if(localStorage.getItem('preference'))localStorage.removeItem('preference')
    const preferences = {
      hostel,
      menu,
    };

    localStorage.setItem("preference", JSON.stringify(preferences));

    // Redirect to main app
    navigate("/", { replace: true });
  };
  useEffect(()=>{
    const pref=JSON.parse(localStorage.getItem('preference'))
    if(pref && pref.hostel && pref.menu){
      setHostel(pref.hostel);
      setMenu(pref.menu);
    }
  },[]);

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
          <select
            id="hostel"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-transparent bg-[rgb(var(--bg))] text-[rgb(var(--text))] dark:[color-scheme:dark]"
          >
            <option value="MH1">MH1</option>
            <option value="MH2">MH2</option>
            <option value="MH3">MH3</option>
            <option value="MH4">MH4</option>
            <option value="MH5">MH5</option>
            <option value="LH1">LH1</option>
            <option value="LH2">LH2</option>
            <option value="LH3">LH3</option>

          </select>
        </div>

        <div>
          <label htmlFor="menu" className="block mb-1">
            Category
          </label>
          <select
            id="menu"
            value={menu}
            onChange={(e) => setMenu(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-transparent bg-[rgb(var(--bg))] text-[rgb(var(--text))]"
          >
            <option value="veg">Veg</option>
            <option value="non veg">Non-Veg</option>
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
