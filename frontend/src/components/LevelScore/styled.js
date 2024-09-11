import styled, { css, keyframes } from 'styled-components';

import star from '../../assets/star.png';
import emptyStar from '../../assets/star-empty.png';

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
  font-family: 'Nunito', sans-serif;
  width: 463px;
  padding: 124px 60px 44px 60px;
  background: #2a2623;
  border: 2px #4b4745 solid;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  position: relative;
`;

export const Block = styled.div`
  width: 338px;
  display: flex;
  flex-direction: column;
  gap: 72px;
  padding: 24px 36px 66px 36px;
  border-radius: 8px;
  background-color: #474542;
  box-shadow:
    0 2px 0 0 #504d4980,
    0 2px 3px 0 #595959 inset;
`;

export const Title = styled.div`
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 42px;
  line-height: 46px;
  color: #fff;
  text-align: center;
  text-shadow: 0 7px 0 rgba(0, 0, 0, 0.15);
`;

export const Achievement = styled.div`
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 22px;
  line-height: 37px;
  color: #fff;
  text-align: center;
  text-shadow: 0 4px 0 rgba(0, 0, 0, 0.15);
`;

export const Star1 = styled.div`
  width: 147px;
  height: 147px;
  transform: rotate(51deg);
  position: relative;
  bottom: 40px;
  left: 24px;

  ${({ isEmpty }) => css`
    background: url(${isEmpty ? emptyStar : star});
    background-size: contain;
    background-repeat: no-repeat;
  `}
`;

export const Star2 = styled.div`
  width: 187px;
  height: 187px;
  position: relative;
  bottom: 100px;

  ${({ isEmpty }) => css`
    background: url(${isEmpty ? emptyStar : star});
    background-size: contain;
    background-repeat: no-repeat;
  `}
`;

export const Star3 = styled.div`
  width: 147px;
  height: 147px;
  transform: rotate(-51deg);
  position: relative;
  bottom: 40px;
  right: 24px;

  ${({ isEmpty }) => css`
    background: url(${isEmpty ? emptyStar : star});
    background-size: contain;
    background-repeat: no-repeat;
  `}
`;

export const Stars = styled.div`
  display: flex;
  position: absolute;
  top: 0;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 23px;
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

export const GameOver = styled.div`
  color: #fff;

  a {
    color: #7ac8ea;
  }
`;
