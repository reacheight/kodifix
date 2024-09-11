import styled, { css, keyframes } from 'styled-components';
import enemy from '../../assets/knight-enemy.svg';

const rightFallAnimation = keyframes`
  0% {

    transform: scaleX(-1) rotate(0) translateX(0);
  }

  100% {
    transform: scaleX(-1) rotate(-60deg) translateX(-40px) translateY(-25px);
  }
`;

const leftFallAnimation = keyframes`
  0% {
    transform: rotate(0) translateX(0);
  }

  100% {
    transform: rotate(-60deg) translateX(-40px) translateY(-25px);
  }
`;

const fadeAnimation = keyframes`
  0% {
    opacity:  1;
  }

  100% {
    opacity: 0;
  }
`;

export const Wrapper = styled.div`
  width: 57px;
  height: 114px;
  position: relative;
  text-align: center;
  z-index: ${({ x, heroX }) => (x < heroX ? 1 : 2)};

  ${({ nameHidden }) => css`
    bottom: ${nameHidden ? 45 : 70}px;
  `};

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `};
`;

export const Name = styled.span`
  display: block;
  position: relative;
  top: 7px;
  right: 5px;
  font-weight: bold;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  color: #fff;
  text-shadow: 0 0 3px #000;
  user-select: none;
  ${({ fade }) =>
    fade &&
    css`
      animation: ${fadeAnimation} 1s ease-out forwards;
    `}
`;

export const Image = styled.div`
  height: 90px;
  background: url(${enemy}) no-repeat center;
  position: relative;
  right: ${({ direction }) => (direction === 'right' ? 7 : -2)}px;
  transform: scaleX(${({ direction }) => (direction === 'right' ? 1 : -1)});

  opacity: ${({ x, y, heroX, heroY }) =>
    x - heroX === 1 && y === heroY ? 0.5 : 1};

  ${({ alive, direction, spedUp }) =>
    !alive &&
    css`
      animation:
        ${direction === 'right' ? leftFallAnimation : rightFallAnimation} ${spedUp ? 500 : 1000}ms ease-out
          forwards,
        ${fadeAnimation} 2s ease-out forwards;
    `}
`;
