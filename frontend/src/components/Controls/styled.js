import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 529px;
  padding: 18px;
  border-radius: 16px;
  background-color: #2a2623;
  margin-bottom: 20px;

  display: flex;
  justify-content: space-between;
`;

export const LeftButtons = styled.div`
  display: flex;
  gap: 20px;
`;

export const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    opacity: 0.9;
  }
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
