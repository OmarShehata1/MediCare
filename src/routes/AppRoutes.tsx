import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import BookingForm from '../pages/Booking/BookingForm';
import DashboardDoctor from '../pages/DashboardDoctor/DashboardDoctor';
import DashboardClient from '../pages/DashboardClient/DashboardClient';

// Mock Auth (in a real app, this would be handled by a proper auth system)
import { useAuth } from '../context/AuthContext';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/booking" element={<BookingForm />} />
      <Route path="/dashboard/doctor" element={<DashboardDoctor />} />
      <Route path="/dashboard/client" element={<DashboardClient />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: 'doctor' | 'patient';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userType }) => {
  const { isAuthenticated, user } = useAuth();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If a specific user type is required and doesn't match, redirect
  if (userType && user?.type !== userType) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default AppRoutes;