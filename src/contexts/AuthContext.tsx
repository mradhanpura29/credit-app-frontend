import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'approver' | 'applicant';

interface User {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  isApprover: boolean;
  isApplicant: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser: User = {
      email,
      role,
      name: role === 'approver' ? 'Admin User' : 'Applicant User',
    };

    setUser(mockUser);
    
    // Redirect based on role
    if (role === 'approver') {
      navigate('/dashboard/approver');
    } else {
      navigate('/dashboard/applicant');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const isApprover = user?.role === 'approver';
  const isApplicant = user?.role === 'applicant';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        hasRole,
        isApprover,
        isApplicant,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
