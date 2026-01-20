import { Navigate } from "react-router-dom";

function PreferenceRoute({ children }) {
  const preferences = localStorage.getItem("preference");
  return preferences ? children : <Navigate to="/first" replace />;
}

export default PreferenceRoute;
