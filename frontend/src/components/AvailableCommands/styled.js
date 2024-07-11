import styled, { css } from 'styled-components';

export const Collapse = styled.div`
  width: 529px;
  padding: 20px;
  border-radius: 16px 16px 0 0;
  background-color: #201d1b;
  color: #fff;
  position: relative;
  transition: 300ms ease-in-out;
  font-family: 'ProstoOne', sans-serif;
  z-index: 100;

  ${({ isOpen }) =>
    isOpen
      ? css`
          transform: translateY(-100%);
        `
      : css`
          transform: translateY(-65px);
        `}
`;

export const CollapseTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 20px;
  cursor: pointer;
  user-select: none;
`;

export const CollapseIcon = styled.div`
  display: flex;
  align-items: center;
  transition: 300ms ease-in-out;
  transform: rotate(180deg);

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(0deg);
    `}
`;

export const CollapseContent = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #2a2623;
`;

export const Command = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 18px;
  padding: 11px 20px;
  transition: 100ms ease-in-out;

  &:hover {
    background: #3d3632;
  }

  img {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.5;
    }
  }
`;
