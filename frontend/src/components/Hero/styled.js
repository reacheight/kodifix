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

const rightFallAnimation = keyframes`
  0% {
    transform: rotate(0) translateX(0);
  }

  100% {
    transform: rotate(-60deg) translateX(-40px) translateY(-25px);
  }
`;

const leftFallAnimation = keyframes`
  0% {
    transform: scaleX(-1) rotate(0) translateX(0);
  }

  100% {
    transform: scaleX(-1) rotate(-60deg) translateX(-40px) translateY(-25px);
  }
`;

const deathAnimation = keyframes`
  0% {
    opacity: 1;
    filter: none;
  }

  100% {
    opacity: 0.4;
    filter: drop-shadow(0 0 8px #ff0000);
  }
`;

export const Wrapper = styled.div`
  width: 74px;
  height: 80px;
  background: url(${wizard}) no-repeat center;
  position: relative;

  ${({ shift }) => css`
    bottom: ${45 + shift.bottom}px;
    right: ${12 + shift.right}px;
  `}

  ${({ x, y, zIndex }) => css`
    z-index: ${zIndex};
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

  ${({ animated, spedUp }) =>
    animated &&
    css`
      transition:
        bottom linear ${spedUp ? 150 : 300}ms,
        right linear ${spedUp ? 150 : 300}ms;
      animation: ${spedUp ? 150 : 300}ms ${shaking} infinite alternate;
    `}

  ${({ isDead, shift, spedUp }) =>
    isDead &&
    css`
      animation: 
        ${shift?.direction === 'left' ? leftFallAnimation : rightFallAnimation} ${spedUp ? 500 : 1000}ms ease-out forwards,
        ${deathAnimation} 2s ease-out forwards;
    `}
`;
