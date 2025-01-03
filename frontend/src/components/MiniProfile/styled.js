import styled from 'styled-components';
import avatarPlaceholder from '../../assets/avatar-placeholder.png';
import logoutIcon from '../../assets/logout.svg';

export const MiniProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const AvatarPlaceHolder = styled.div`
  height: 48px;
  width: 48px;
  background: url(${avatarPlaceholder}) no-repeat center, rgba(33, 150, 243, 0.6);
  border-radius: 10px;
`

export const NameAndTitle = styled.div`
  display: flex;
  flex-direction: column;
`

export const Name = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  color: #2D3748;
`

export const Title = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #718096;
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