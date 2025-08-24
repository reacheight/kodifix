import styled, { css } from 'styled-components';

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  width: 18px;
  height: 18px;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 8px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.2s;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }

  ${({ variant }) => variant === 'secondary' && css`
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.4);
    }
  `}

  ${({ size }) => size === 'large' && css`
    font-size: 20px;
    padding: 12px 24px;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 18px;
      padding: 8px 16px;
    }
  `}
`; 