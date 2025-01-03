import React, { useEffect, useState } from 'react';
import { axios } from '../../api/axios';
import logo from '../../assets/logo.svg';
import { HeaderWrapper, HeaderContent, LoginLink } from './styled';
import { MiniProfile } from '../MiniProfile/MiniProfile';
import { LoginModal } from '../LoginModal/LoginModal';
import { Link } from 'react-router-dom';

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
      <HeaderContent>
        <Link to='/'>
          <img 
            src={logo} 
            alt="App Logo" 
            style={{ 
              height: '45px', 
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
              position: 'relative',
              zIndex: 2
            }} 
          />
        </Link>
        {!!user && (
          <MiniProfile user={user} onLogout={onLogout} />
        )}
        {!user && (
          <LoginLink onClick={() => setShowLoginModal(true)}>
            Войти
          </LoginLink>
        )}
        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)}/>}
      </HeaderContent>
    </HeaderWrapper>
  );
}