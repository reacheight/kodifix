import styled, { keyframes } from 'styled-components';

const appearance = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  width: 470px;
  border-radius: 12px;
  border: 2px #4b4745 solid;
  padding: 16px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  gap: 12px;
  transform: translate(-540px, ${({ offset }) => 24 + offset}px);
  z-index: 100;
  background-color: #2a2623;
  animation: 300ms ${appearance} ease-in-out forwards;

  img {
    width: 12px;
    height: 12px;
    cursor: pointer;
    position: absolute;
    top: 14px;
    right: 14px;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.5;
    }
  }
`;

export const Title = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  line-height: 22px;
  color: #fff;
`;

export const Divider = styled.div`
  border: 1px rgba(255, 255, 255, 0.2) solid;
`;

export const Message = styled.div`
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
`;

export const Tag = styled.span`
  color: #bd0f0f;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 4px 12px;
  margin-left: 8px;
`;
