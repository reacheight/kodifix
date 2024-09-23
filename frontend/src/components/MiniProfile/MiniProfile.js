import React from 'react';
import { AvatarPlaceHolder, Logout, MiniProfileWrapper, Name, NameAndTitle, Title } from './styled';

export const MiniProfile = ({ user, onLogout }) => {
  return (
    <MiniProfileWrapper>
      <AvatarPlaceHolder />
      <NameAndTitle>
        <Name>{user.name}</Name>
        <Title>Новичок</Title>
      </NameAndTitle>
      <Logout onClick={onLogout} />
    </MiniProfileWrapper>
  );
}