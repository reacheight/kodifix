import styled, { css, keyframes } from 'styled-components';
import wizard from '../../assets/wizard.svg';

const shaking = keyframes`
  0% {
    translate(2px, -2px)
  }
  100% {
    translate(-2px, 2px);
  }
  0% {
    translate(2px, -2px);
  }
`;

export const Wrapper = styled.div`
  width: 74px;
  height: 80px;
  background: url(${wizard}) no-repeat center;
  position: relative;
  z-index: 1;

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

  ${({ shift }) =>
    shift &&
    css`
      transform: scaleX(${shift.direction === 'left' ? -1 : 1});
    `}

  ${({ animated }) =>
    animated &&
    css`
      transition:
        bottom linear 300ms,
        right linear 300ms;
      animation: 300ms ${shaking} infinite alternate;
    `}
`;
