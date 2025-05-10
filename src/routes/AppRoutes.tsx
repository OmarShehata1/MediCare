import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import BookingForm from "../pages/Booking/BookingForm";
import DashboardDoctor from "../pages/DashboardDoctor/DashboardDoctor";
import DashboardClient from "../pages/DashboardClient/DashboardClient";
import Unauthorized from "../pages/Unauthorized"; // You'll need to create this

// Auth
import { useAuth } from "../context/AuthContext";

// User type for type checking
type UserRole = "doctor" | "patient";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  console.log("ProtectedRoute check:", { 
    isAuth: isAuthenticated, 
    user, 
    userType: user?.type,
    allowedRoles
  });

  // If we're still loading auth state, show a loading indicator
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // If specific roles are required and user's role doesn't match, redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.type as UserRole)) {
    console.log("Redirecting to unauthorized. User type:", user.type, "Allowed roles:", allowedRoles);
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/doctors" element={<Home />} /> {/* Or your DoctorsList component if you have one */}

      {/* Patient-only routes */}
      <Route
        path="/booking"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <BookingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/client"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <DashboardClient />
          </ProtectedRoute>
        }
      />

      {/* Doctor-only routes */}
      <Route
        path="/dashboard/doctor"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DashboardDoctor />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
