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
      <Route path="/booking" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
      <Route path="/dashboard/doctor" element={<ProtectedRoute userType="doctor"><DashboardDoctor /></ProtectedRoute>} />
      <Route path="/dashboard/client" element={<ProtectedRoute userType="patient"><DashboardClient /></ProtectedRoute>} />
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
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType && user?.type !== userType) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default AppRoutes;