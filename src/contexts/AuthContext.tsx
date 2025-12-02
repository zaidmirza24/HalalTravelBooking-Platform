import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'vendor' | 'vendor_staff' | 'admin' | 'superadmin';
  avatar?: string;
  vendorId?: string; // Links vendor users to their business
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isVendor: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    const storedToken = localStorage.getItem('auth_token');

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Replace with actual API call
    // Mock authentication for development

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock admin user
    if (email === 'admin@halaltravel.com') {
      const mockAdmin: User = {
        id: 'admin-1',
        name: 'Admin User',
        email: email,
        role: 'admin',
        avatar: undefined,
      };

      localStorage.setItem('auth_token', 'mock-admin-token');
      localStorage.setItem('auth_user', JSON.stringify(mockAdmin));
      setUser(mockAdmin);
    }
    // Mock superadmin user
    else if (email === 'superadmin@halaltravel.com') {
      const mockSuperAdmin: User = {
        id: 'superadmin-1',
        name: 'Super Admin',
        email: email,
        role: 'superadmin',
        avatar: undefined,
      };

      localStorage.setItem('auth_token', 'mock-superadmin-token');
      localStorage.setItem('auth_user', JSON.stringify(mockSuperAdmin));
      setUser(mockSuperAdmin);
    }
    // Mock vendor user
    else if (email === 'vendor@halaltravel.com') {
      const mockVendor: User = {
        id: 'vendor-1',
        name: 'Hotel Owner',
        email: email,
        role: 'vendor',
        vendorId: 'VND001',
        avatar: undefined,
      };

      localStorage.setItem('auth_token', 'mock-vendor-token');
      localStorage.setItem('auth_user', JSON.stringify(mockVendor));
      setUser(mockVendor);
    }
    // Mock regular user
    else {
      const mockUser: User = {
        id: 'user-1',
        name: 'Regular User',
        email: email,
        role: 'user',
        avatar: undefined,
      };

      localStorage.setItem('auth_token', 'mock-user-token');
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      setUser(mockUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
    isVendor: user?.role === 'vendor' || user?.role === 'vendor_staff',
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
