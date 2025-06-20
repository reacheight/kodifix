import styled, { css } from 'styled-components';

export const HeaderContent = styled.header`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;

  max-width: 1200px;
  width: 100%;

  margin: 0 auto;
  margin-top: 20px;
  padding: 12px 25px;
  
  background: linear-gradient(to right,rgb(133, 182, 231),rgb(115, 186, 245));

  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);

  left: 50%;
  transform: translateX(-50%);

  z-index: 10;
`

export const Logo = styled.img`
  height: 45px;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
  position: relative;
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