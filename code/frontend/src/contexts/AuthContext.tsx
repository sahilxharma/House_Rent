// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  type: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.post(
            '/api/user/getuserdata',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.success) {
            setUser(res.data.data);
          } else {
            logout();
          }
        } catch (err) {
          console.error('Failed to fetch user:', err);
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post('/api/user/login', { email, password });

      if (res.data.success && res.data.token) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

        const userRes = await axios.post(
          '/api/user/getuserdata',
          {},
          {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          }
        );

        if (userRes.data.success) {
          setUser(userRes.data.data);
          return true;
        } else {
          throw new Error('Failed to retrieve user data');
        }
      } else {
        throw new Error(res.data.message || 'Login failed');
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || 'Login failed. Please try again.';
      console.error('Login error:', errorMessage);
      throw new Error(errorMessage); // 💥 send clear error to Login.tsx
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
