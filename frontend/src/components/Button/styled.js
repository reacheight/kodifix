import styled, { css } from 'styled-components';

export const Wrapper = styled.button`
  background: none;
  border: none;
  padding: 0;

  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
      &:active {
        opacity: 0.8;
      }
    `}
`;

export const ButtonFront = styled.div`
  width: ${({ width = 94 }) => width}px;
  height: ${({ height = 94 }) => height}px;
  border-radius: 5px;
  background: ${({ color }) => color};
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'ProstoOne', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
`;

export const ButtonTop = styled.div`
  width: ${({ width = 94 }) => width}px;
  height: 14px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: ${({ color }) => color};
  position: relative;
  top: 4px;
`;
