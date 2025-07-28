import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, token, logout } = useAuth();

  if (!isAuthenticated || !token) {
    // replace sayesinde bir önceki sayfayı memory den siler
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode (token);
    const currentTime = Date.now() / 1000;// sn cinsine çevirmek için 

    if (decoded.exp < currentTime) {
      logout();
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
