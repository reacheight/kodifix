import styled, { css } from 'styled-components';

export const Wrapper = styled.button`
  background: none;
  border: none;
  padding: 0;
`;

export const ButtonFront = styled.div`
  width: ${({ width = 89 }) => width}px;
  height: ${({ height = 73 }) => height}px;
  border-radius: 15px;
  border-bottom: 3px solid rgba(255, 255, 255, 0.3);
  background: ${({ color }) => color};

  box-shadow: 0 ${({ shadowHeight }) => shadowHeight}px ${({ shadowColor }) => shadowColor};

  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
      &:hover {
       filter: brightness(.9);
      }
      &:active {
        opacity: brightness(.8);
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