import styled, { keyframes, css } from 'styled-components';
import wizard from '../../assets/wizard.svg';

const shaking = keyframes`
  0% {
    transform: translateX(2px) translateY(-2px);
  }
  100% {
    transform: translateX(-2px) translateY(2px);
  }
  0% {
     transform: translateX(2px) translateY(-2px);
  }
`;

export const Wrapper = styled.div`
  width: 74px;
  height: 80px;
  background: url(${wizard}) no-repeat center;
  transition: linear 300ms;
  position: relative;

  ${({ shift }) => css`
    bottom: ${45 + shift.bottom}px;
    right: ${12 + shift.right}px;
  `}

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}

  ${({ animated }) =>
    animated &&
    css`
      animation: 300ms ${shaking} infinite alternate;
    `}
`;
