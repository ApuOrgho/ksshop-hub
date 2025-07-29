import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children, adminOnly = false }) {
  const { user, loading, emailVerified } = useAuth();
  const location = useLocation();
  const adminEmail = "admin@example.com"; // Change to your admin email

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // Email verification check disabled
  if (adminOnly && user.email !== adminEmail) {
    return <Navigate to="/" replace />;
  }
  return children;
}
