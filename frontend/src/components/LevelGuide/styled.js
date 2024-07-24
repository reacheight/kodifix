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
  background-color: rgba(0, 0, 0, 0.8);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: 0ms ${appearance} linear forwards;
`;

export const Modal = styled.div`
  color: #fff;
  font-family: 'Nunito', sans-serif;
  width: 694px;
  padding: 16px;
  background: #2a2623;
  border: 2px #4b4745 solid;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const Title = styled.div`
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 32px;
  line-height: 35px;
  color: #fff;
`;

export const Block = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  background: #474542;
  box-shadow:
    0px 2px 0px 0px #504d4980,
    0px 2px 3px 0px #595959 inset;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Instructions = styled.div`
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  white-space: break-spaces;
`;

export const ExampleCode = styled.div`
  background: #3d3732;
  border-radius: 4px;
  padding: 8px 16px;
  font-family: 'Monospace', sans-serif;
  font-size: 14px;
  line-height: 22px;
  white-space: break-spaces;

  span {
    color: #6acaec;
  }
`;

export const NewCommandsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Steps = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Subtitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;

  > span {
    color: #6acaec;
  }
`;

export const Control = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border: 2px #727272 solid;
  background: #3d3632;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }

  ${({ disabled }) => disabled && 'opacity: 0.5 !important;'}

  ${({ type }) => {
    if (type === 'prev') {
      return 'transform: rotate(0deg);';
    }

    if (type === 'next') {
      return 'transform: rotate(180deg);';
    }
  }}
`;

export const Circle = styled.div`
  width: 12px;
  height: 12px;
  background: ${({ isActive }) => (isActive ? '#0AA1E2' : '#3D3632')};
  border-radius: 100%;
  cursor: pointer;
`;

export const CirclesWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

export const Button = styled.button`
  background: none;
  border: none;
  width: fit-content;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;