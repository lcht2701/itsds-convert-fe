import { useAuth } from "@/contexts/AuthProvider";
import { RouteByRole } from "@/utils/RouteByRole";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PublicRoute({ children }) {
  const { user } = useAuth();
  const isAuthenticated = Boolean(localStorage.getItem("ACCESS_TOKEN"));
  const location = useLocation();
  const routeByRole = RouteByRole(user?.role);
  if (isAuthenticated) {
    const destination = location.state?.from?.pathname || `${routeByRole}`;
    return <Navigate to={destination} replace />;
  }

  return children;
}

export default PublicRoute;
