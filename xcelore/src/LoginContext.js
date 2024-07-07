import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(""); // Initialize user state
 const [isAuthenticated,setIsAuthenticated]=useState(false);
  const tokenFromCookie = Cookies.get('token');
  if (tokenFromCookie && !user) {
    setUser({ token: tokenFromCookie });
  }

  const login = (userData) => {
    setIsAuthenticated(!isAuthenticated)
    setUser(userData.user);
    Cookies.set('token', userData.token, { expires: 7 }); 
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('token');
    setIsAuthenticated(!isAuthenticated)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
