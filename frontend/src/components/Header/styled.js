import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 15px;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  padding: 12px 25px;
  background: linear-gradient(to right, #1976D2, #2196F3);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.25);
    border-radius: inherit;
    z-index: -1;
  }
`

export const LoginLink = styled.button`
  background: none;
  border: none;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 16px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`