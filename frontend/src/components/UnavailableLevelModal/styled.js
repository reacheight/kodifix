import styled, { keyframes } from 'styled-components';

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
  transition: transform 200ms ease-in-out;
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 24px;
  line-height: 35px;
`;