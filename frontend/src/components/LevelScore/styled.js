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
  background-color: rgba(0, 0, 0, 0.8);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: 0ms ${appearance} linear forwards;
`;

export const Modal = styled.div`
  font-family: 'ProstoOne', sans-serif;
  width: 440px;
  height: 408px;
  padding: 46px 68px;
  background: #2a2623;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

export const Title = styled.div`
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  color: #fff;
  text-align: center;
`;

export const Stars = styled.div`
  display: flex;
  gap: 32px;
`;
