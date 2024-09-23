import React, { useEffect, useState } from 'react';
import { axios } from '../../api/axios';
import { HeaderWrapper } from './styled';
import { MiniProfile } from '../MiniProfile/MiniProfile';

export const Header = ({ authToken, onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const isAuthorized = document.cookie.includes('yaToken');
      if (isAuthorized) {
        const response = await axios.get('/user', { withCredentials: true });
        setUser(response.data);
      } else {
        setUser(null);
      }
    })();
  }, [authToken]);
  
  return (
    <HeaderWrapper>
      {!!user && (
        <MiniProfile user={user} onLogout={onLogout} />
      )}
    </HeaderWrapper>
  );
}