import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { auth } = useAuth();

  return auth?.accessToken ? <Outlet /> : <Navigate to="/Login" />;
}

export default ProtectedRoutes;
