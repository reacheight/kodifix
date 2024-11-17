import React, { useEffect, useState } from 'react';
import { axios } from '../../api/axios';
import { HeaderWrapper, LoginButton } from './styled';
import { MiniProfile } from '../MiniProfile/MiniProfile';
import { Button } from '../Button/Button';
import { LoginModal } from '../LoginModal/LoginModal';

export const Header = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
        <Button
          height='45'
          width='90'
          shadowHeight='10'
          shadowColor="#06719F"
          frontColor="#0AA1E2"
          onClick={() => setShowLoginModal(true)}
        >
          Войти
        </Button>
      )}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)}/>}
    </HeaderWrapper>
  );
}