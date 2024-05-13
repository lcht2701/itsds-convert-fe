import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PublicRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem("ACCESS_TOKEN")); // Check if user is authenticated
  const location = useLocation();

  if (isAuthenticated) {
    // Redirect to home or dashboard if the user is already authenticated
    const destination = location.state?.from?.pathname || "/manager";
    return <Navigate to={destination} replace />;
  }

  return children;
}

export default PublicRoute;
