import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { axios } from '../api/axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthorized = document.cookie.includes('yaToken');
      if (isAuthorized) {
        try {
          const response = await axios.get('/user', { withCredentials: true });
          setUser(response.data);
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    Cookies.remove('yaToken', { path: '/', domain: '.kodifix.ru', secure: true, sameSite: 'Lax' });
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 