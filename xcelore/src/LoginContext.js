import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(""); // Initialize user state
 const [isAuthenticated,setIsAuthenticated]=useState(false)
  // Check if there's a token in cookies on initial load
  const tokenFromCookie = Cookies.get('token');
  if (tokenFromCookie && !user) {
    // Set user based on token or perform any token validation logic
    setUser({ token: tokenFromCookie });
  }

  const login = (userData) => {
    setIsAuthenticated(!isAuthenticated)
    setUser(userData.user);
    Cookies.set('token', userData.token, { expires: 7 }); // Token expires in 7 days
  };

  const logout = () => {
    // Clear user state on logout
    setUser(null);
    
    // Remove token from cookies
    Cookies.remove('token');
    setIsAuthenticated(!isAuthenticated)
  };

  // const isAuthenticated = () => {
  //   return !!user; // Check if user is authenticated
  // };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
