import styled, { keyframes } from 'styled-components';

const appearance = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  animation: 0ms ${appearance} linear forwards;
`;

export const Modal = styled.div`
  color: black;
  font-family: 'Nunito', sans-serif;
  width: 400px;
  padding: 16px;
  background: white;
  border: 2px #4b4745 solid;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const Title = styled.div`
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 32px;
  line-height: 35px;
`;

export const YaLoginButton = styled.div`
`