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
    `}
`;

export const ButtonFront = styled.div`
  width: 94px;
  height: 94px;
  border-radius: 5px;
  background: ${({ color }) => color};
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonTop = styled.div`
  width: 94px;
  height: 14px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: ${({ color }) => color};
  position: relative;
  top: 4px;
`;
