import React from 'react';
import logo from '../../assets/logo.webp';
import { HeaderContent, Logo } from './styled';
import { MiniProfile } from '../MiniProfile/MiniProfile';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { ActionButton } from '../ActionButton/ActionButton';

export const Header = ({ onLoginClick, isTransparent }) => {
  const { user, logout } = useUser();

  return (
    <HeaderContent isTransparent={isTransparent}>
      <Link to={user ? '/game' : '/'}>
        <Logo src={logo} alt="App Logo" isTransparent={isTransparent} />
      </Link>
      {!!user && (
        <MiniProfile user={user} onLogout={logout} />
      )}
      {!user && (
        <ActionButton onClick={onLoginClick} variant="secondary">
          Начать программировать
        </ActionButton>
      )}
    </HeaderContent>
  );
}