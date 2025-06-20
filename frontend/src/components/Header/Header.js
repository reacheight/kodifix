import React from 'react';
import logo from '../../assets/logo.webp';
import { HeaderContent, LoginLink, Logo } from './styled';
import { MiniProfile } from '../MiniProfile/MiniProfile';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export const Header = ({ onLoginClick }) => {
  const { user, logout } = useUser();

  return (
    <HeaderContent>
      <Link to={user ? '/game' : '/'}>
        <Logo src={logo} alt="App Logo" />
      </Link>
      {!!user && (
        <MiniProfile user={user} onLogout={logout} />
      )}
      {!user && (
        <LoginLink onClick={onLoginClick}>
          Войти
        </LoginLink>
      )}
    </HeaderContent>
  );
}