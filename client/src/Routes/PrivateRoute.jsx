import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const authCookie = Cookies.get("auth");

  let isAuthenticated = false;

  if (authCookie) {
    try {
      const parsedAuth = JSON.parse(authCookie);
      isAuthenticated = !!parsedAuth.token;
    } catch (error) {
      console.error("Invalid auth cookie format:", error);
    }
  }

  if (!isAuthenticated) {
    const toastId = "login-warning";
    toast.warning("Please log in to access this page", { toastId });
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
