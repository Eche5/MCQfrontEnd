import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { auth } = useAuth();

  return auth?.accessToken ? children : <Navigate to="/Login" />;
}

export default ProtectedRoutes;
