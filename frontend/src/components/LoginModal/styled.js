import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  animation: 200ms ${props => props.isClosing ? fadeOut : fadeIn} ease-in-out forwards;
  backdrop-filter: blur(2px);
`;

export const Modal = styled.div`
  color: black;
  font-family: 'Inter', sans-serif;
  width: 500px;
  padding: 24px;
  background: linear-gradient(to bottom, #ffffff, #dce7ff);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  transform: scale(${props => props.isClosing ? 0.95 : 1});
  transition: transform 200ms ease-in-out;
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 28px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  line-height: 1;
  padding-bottom: 2px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #333;
  }
  
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Title = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 24px;
  line-height: 35px;
`;

export const YaLoginButton = styled.div`
  margin-bottom: 8px;
`;