import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner
  }

  // Check if user is authenticated AND has admin role
  // Fallback to email check if role is missing in older tokens
  if (!user || (user.role !== "admin" && user.email !== "admin@routesense.ai")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;
