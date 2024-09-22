import React, { useEffect, useState } from 'react';
import { axios } from '../../api/axios';
import { HeaderWrapper } from './styled';
import { MiniProfile } from '../MiniProfile/MiniProfile';
import Cookies from 'js-cookie';

export const Header = () => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(Cookies.get('yaToken'));

  useEffect(() => {
    (async () => {
      const isAuthorized = document.cookie.includes('yaToken');
      if (isAuthorized) {
        const response = await axios.get('/user', { withCredentials: true });
        setUser(response.data);
      }
    })();
  }, [authToken]);

  const newTokenCookie = Cookies.get('yaToken');
  if (authToken !== newTokenCookie ) {
    setAuthToken(newTokenCookie);
  }
  
  return (
    <HeaderWrapper>
      {!!user && (
        <MiniProfile user={user} />
      )}
    </HeaderWrapper>
  );
}