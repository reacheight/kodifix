import React from 'react';
import logo from '../../assets/logo.webp';
import { HeaderWrapper, HeaderContent, LoginLink } from './styled';
import { MiniProfile } from '../MiniProfile/MiniProfile';
import { LoginModal } from '../LoginModal/LoginModal';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';

export const Header = () => {
  const { user, logout } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);

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
          <MiniProfile user={user} onLogout={logout} />
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