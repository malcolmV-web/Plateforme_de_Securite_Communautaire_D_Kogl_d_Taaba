import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireRole({ role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/" />;

  return <Outlet />;
}
