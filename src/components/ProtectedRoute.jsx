import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem('jwtToken');

  if (!token || token == null) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
