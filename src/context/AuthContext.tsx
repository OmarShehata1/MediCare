import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, type: 'doctor' | 'patient') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing user in localStorage on load
  useEffect(() => {
    const storedUser = localStorage.getItem('medicare_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Determine user type based on email (just for demo purposes)
    const userType = email.includes('doctor') ? 'doctor' : 'patient';
    
    const mockUser: User = {
      id: Math.floor(Math.random() * 1000),
      name: email.split('@')[0],
      email,
      type: userType,
      image: userType === 'doctor' 
        ? 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        : 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('medicare_user', JSON.stringify(mockUser));
  };

  // Mock register function
  const register = async (name: string, email: string, password: string, type: 'doctor' | 'patient') => {
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      type,
      image: type === 'doctor' 
        ? 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        : 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('medicare_user', JSON.stringify(mockUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('medicare_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};