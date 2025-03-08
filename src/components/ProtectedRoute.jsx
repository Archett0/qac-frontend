import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";

const ProtectedRoute = ({ children }) => {
  // const {user, isAuthenticated} = useAuth0();
  //
  // if (!user || !isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};

export default ProtectedRoute;
