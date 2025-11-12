
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../data/mock';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user session
    setTimeout(() => {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }, 1500); // simulate network delay
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setLoading(true);
    // This is a mock login. In a real app, you'd call Firebase Auth.
    // We are not checking password for this mock.
    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    return new Promise(resolve => {
        setTimeout(() => {
            if (foundUser) {
                setUser(foundUser);
                sessionStorage.setItem('user', JSON.stringify(foundUser));
                setLoading(false);
                resolve(true);
            } else {
                setLoading(false);
                resolve(false);
            }
        }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
