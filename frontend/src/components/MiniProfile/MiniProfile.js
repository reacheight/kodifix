import React from 'react';
import { AvatarPlaceHolder, MiniProfileWrapper, Name } from './styled';

export const MiniProfile = ({ user }) => {
  return (
    <MiniProfileWrapper>
      <AvatarPlaceHolder />
      <Name>{user.name}</Name>
    </MiniProfileWrapper>
  );
}