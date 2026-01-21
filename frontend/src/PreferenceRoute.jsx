import { Navigate } from "react-router-dom";

function PreferenceRoute({ children }) {
  const preferences = localStorage.getItem("preference");
  return preferences ? children : <Navigate to="/init" replace />;
}

export default PreferenceRoute;
