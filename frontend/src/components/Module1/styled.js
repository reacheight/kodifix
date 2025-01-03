import styled, { css, keyframes } from 'styled-components';
import wizardImage from '../../assets/wizard.svg';
import gemImage from '../../assets/gem.svg';
import currentLevel from '../../assets/current-level.svg';
import unavailableLevelIcon from '../../assets/unavailable-level.svg';
import completedLEvelIcon from '../../assets/completed-level.svg';
import gameMap from '../../assets/map.png';

const currentLevelAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.3);
  }
`;

export const Game = styled.div`
  display: flex;
  gap: 100px;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-image: linear-gradient(rgba(131, 201, 213) 0%, rgba(144, 180, 73) 100%);
`;

export const Map = styled.div`
  position: relative;
  z-index: 0;

  background: url(${gameMap}) no-repeat center;
  background-size: contain;

  ${({ width, height }) => css`
    width: ${width};
    height: ${height};
  `}

  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

export const TopGradient = styled.div`
  position: absolute;
  z-index: 0;
  background-image: linear-gradient(to top, rgba(131, 201, 213, 0) 0%, rgba(131, 201, 213) 100%);
  top: -1px;
  left: 0;
  right: 0;
  height: 3%;
`

export const BotGradient = styled.div`
  position: absolute;
  z-index: 0;
  background-image: linear-gradient(rgba(144, 180, 73, 0) 0%, rgba(144, 180, 73) 100%);
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3%;
`

export const Level = styled.button`
  border: none;
  padding: 0;
  cursor: pointer;

  position: absolute;
  width: 64px;
  height: 80px;

  background: url(${({ current, completed }) =>
      current
        ? currentLevel
        : completed
          ? completedLEvelIcon
          : unavailableLevelIcon})
    no-repeat center;

  ${({ current }) =>
    current &&
    css`
      animation: 1s ${currentLevelAnimation} linear infinite alternate;
      z-index: 1;
    `};

  ${({ available }) =>
    !available &&
    css`
      pointer-events: none;
      cursor: default;
    `};

  &:hover {
    filter: brightness(0.8);
  }

  ${({ bottomPercent, leftPercent, current }) => css`
    bottom: ${bottomPercent + (current ? 4 : 0)}%;
    left: ${leftPercent + (current ? 1 : 0)}%;
  `};
`;
