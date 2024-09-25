import styled from 'styled-components';
import avatarPlaceholder from '../../assets/avatar-placeholder.png';
import logoutIcon from '../../assets/logout.svg';

export const MiniProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const AvatarPlaceHolder = styled.div`
  height: 48px;
  width: 48px;
  background: url(${avatarPlaceholder}) no-repeat center, rgba(61, 200, 209, 0.2);;
  border-radius: 10px;
`

export const NameAndTitle = styled.div`
  display: flex;
  flex-direction: column;
`

export const Name = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  text-align: center;
`

export const Title = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  color: #A5A5A5;
`

export const Logout = styled.button`
  border: none;
  width: 24px;
  height: 24px;
  background: url(${logoutIcon}) no-repeat center;
  margin-left: 30px;
  cursor: pointer;
  
  &:hover {
    filter: brightness(1.7);
  }
`