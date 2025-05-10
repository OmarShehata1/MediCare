// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
 // Adjust the path to your configuration file
import { jwtDecode } from "jwt-decode";
import { authApi } from "../utils/api";

const API_URL = "https://localhost:7024/api";

interface JwtPayload {
  nameid: string;        // User ID
  unique_name?: string;  // Username
  name?: string;         // User's name
  email?: string;        // User's email
  role?: string;         // User's role
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string; // Microsoft format for role
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (
    name: string,
    email: string,
    password: string,
    accountType: "doctor" | "patient"
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ id: 0, name: "", email: "", type: "patient", image: "" }),
  register: async () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing token on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication state...");
        const token = localStorage.getItem("medicare_token");
        const storedUser = localStorage.getItem("medicare_user");

        console.log("Stored token exists:", !!token);
        console.log("Stored user exists:", !!storedUser);
        
        if (!token) {
          console.log("No token found, not authenticated");
          setIsLoading(false);
          return;
        }

        if (storedUser) {
          const userData = JSON.parse(storedUser);
          console.log("Found stored user:", userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.log("No stored user, extracting from token");
          // If we have a token but no stored user, decode the token
          try {
            const userData = extractUserFromToken(token, ""); // Pass email if available
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem("medicare_user", JSON.stringify(userData));
          } catch (error) {
            console.error("Failed to decode token:", error);
            localStorage.removeItem("medicare_token");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Helper function to extract user data from token
  const extractUserFromToken = (token: string, email: string): User => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("Decoded token:", decoded);
      
      // Extract role - check for different possible locations in the token
      let userType: "doctor" | "patient" = "patient";
      
      // Check all possible locations for role information
      if (decoded.role) {
        userType = decoded.role.toLowerCase() === "doctor" ? "doctor" : "patient";
      } else if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        userType = role.toLowerCase() === "doctor" ? "doctor" : "patient";
      }
      
      console.log("Extracted user type:", userType);
      
      // Create user object from token claims
      return {
        id: parseInt(decoded.nameid || "0"),
        name: decoded.name || decoded.unique_name || email.split("@")[0],
        email: decoded.email || email,
        type: userType,
        image: userType === "doctor"
          ? "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          : "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      // Return a default user on error
      return {
        id: 0,
        name: "User",
        email: "",
        type: "patient",
        image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      };
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    try {
      // Call your login API
      const response = await fetch(`${API_URL}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Invalid credentials");
      }

      const data = await response.json();
      const token = data.token;
      
      // Store token
      localStorage.setItem("medicare_token", token);
      
      // Extract user data directly from the token
      const userData = extractUserFromToken(token, email);
      
      // Store user data
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("medicare_user", JSON.stringify(userData));
      
      console.log("Login successful, user:", userData);
      
      // Return the user data
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    accountType: "doctor" | "patient"
  ) => {
    try {
      // For registration, we're not expecting any specific return data
      // The response might be plain text "Registered successfully"
      await authApi.register(name, email, password, accountType);
      
      // Wait a moment before login to ensure backend has processed the registration
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Try to login with the newly created credentials
      await login(email, password);
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed. Please try again.");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("medicare_token");
    localStorage.removeItem("medicare_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};