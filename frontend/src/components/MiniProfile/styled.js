import styled from 'styled-components';
import avatarPlaceholder from '../../assets/avatar-placeholder.png';

export const MiniProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const AvatarPlaceHolder = styled.div`
  height: 48px;
  width: 48px;
  background: url(${avatarPlaceholder}) no-repeat center, rgba(0, 0, 0, 0.2);
  border-radius: 5rem;
`

export const Name = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  text-align: center;
`