// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If there is a token, render the child component (the actual page)
  return children;
};

export default ProtectedRoute;