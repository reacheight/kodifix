import styled, { css } from 'styled-components';

export const Collapse = styled.div`
  width: 529px;
  padding: 20px;
  border-radius: 16px 16px 0 0;
  background-color: #201d1b;
  color: #fff;
  position: relative;
  z-index: 100;
  transform: translateY(-20px);
`;

export const CollapseTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 20px;
  line-height: 27px;
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
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #2a2623;
  max-height: 184px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 14px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 20px;
    border: 4px solid transparent;
    background-clip: content-box;
  }
`;

export const Command = styled.span`
  display: flex;
  justify-content: space-between;
  font-family: 'monospace', sans-serif;
  font-size: 14px;
  line-height: 18px;
  padding: 11px 20px;
  transition: 100ms ease-in-out;

  span {
    color: #dcdcaa;
  }

  &:hover {
    background: #3d3632;
  }

  img {
    width: 12px;
    height: 18px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.5;
    }
  }
`;
