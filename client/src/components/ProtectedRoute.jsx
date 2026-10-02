import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;