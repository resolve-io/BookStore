import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthUser } from '../types/auth-types';

// Create a Context
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to access AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Ensure the context is not null and provide error handling
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context; // The context is guaranteed to have `user`, `login`, and `logout`
};

// AuthProvider component to wrap your app with authentication state
export const AuthProvider = ({ children } : { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);  // User state to hold auth info
  const [loading, setLoading] = useState(true);  // State to track if data is loading

  // Simulating fetching the user data (e.g., from localStorage or API)
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user') as string);
      if (storedUser) {
        setUser(storedUser);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const saveAuthUser = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));  // Store user in localStorage
  };

  const login = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));  // Store user in localStorage
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');  // Remove from localStorage
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Make it asynchronous
  };

  const value:AuthContextType = {
    user,
    loading,
    saveAuthUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
