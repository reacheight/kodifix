import styled, { css } from 'styled-components';

export const Collapse = styled.div`
  width: 529px;
  border-radius: 16px 16px 0 0;
  background-color: #201d1b;
  color: #fff;
  position: relative;
  transition: 300ms ease-in-out;
  font-family: 'Raleway', sans-serif;

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
  padding: 20px;
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Command = styled.span`
  font-size: 14px;
  line-height: 18px;

  span {
    color: #eead2b;
  }
`;
