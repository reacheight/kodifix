import React, { useEffect, useState } from 'react';
import { axios } from '../../api/axios';
import { HeaderWrapper, YaButtonWrapper } from './styled';
import { MiniProfile } from '../MiniProfile/MiniProfile';

export const Header = ({ onLogout }) => {
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
  }, []);
  
  return (
    <HeaderWrapper>
      {!!user && (
        <MiniProfile user={user} onLogout={onLogout} />
      )}
      {!user && (
        <YaButtonWrapper id='yaButtonContainerId'></YaButtonWrapper>
      )}
    </HeaderWrapper>
  );
}