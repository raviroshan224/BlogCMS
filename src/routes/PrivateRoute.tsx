import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
