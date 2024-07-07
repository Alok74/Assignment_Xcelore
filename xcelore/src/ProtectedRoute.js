import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './LoginContext';

const ProtectedRoute = ({ element, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user.role !== requiredRole) {
    if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    }
    return <Navigate to="/user-dashboard" />;
  }

  return element;
};

export default ProtectedRoute;
