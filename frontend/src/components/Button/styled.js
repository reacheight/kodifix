import styled, { css } from 'styled-components';

export const Wrapper = styled.button`
  background: none;
  border: none;
  padding: 0;
  transition: transform 0.15s ease-out;

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        transform: translateY(-2px);
      }
      &:active {
        transform: translateY(4px);
      }
    `}
`;

export const ButtonFront = styled.div`
  width: ${({ width = 89 }) => width}px;
  height: ${({ height = 73 }) => height}px;
  border-radius: 15px;
  border-bottom: 3px solid rgba(255, 255, 255, 0.3);
  background: ${({ color }) => color};
  transition: all 0.15s ease-out;
  box-shadow: 0 ${({ shadowHeight }) => shadowHeight}px ${({ shadowColor }) => shadowColor};

  ${({ disabled, shadowHeight }) =>
    !disabled &&
    css`
      cursor: pointer;
      &:hover {
        filter: brightness(1.1);
        box-shadow: 0 ${shadowHeight + 2}px ${({ shadowColor }) => shadowColor};
      }
      &:active {
        filter: brightness(0.95);
        box-shadow: 0 ${Math.max(0, shadowHeight - 4)}px ${({ shadowColor }) => shadowColor};
      }
    `}

  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.15);
`;