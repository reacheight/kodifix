import styled, { css, keyframes } from 'styled-components';
import newMap from '../../assets/map.png';
import currentLevelIcon from '../../assets/current-level.svg';
import unavailableLevelIcon from '../../assets/unavailable-level.svg';
import completedLevelIcon from '../../assets/completed-level.svg';

const currentLevelAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.3);
  }
`;

export const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 20px 40px 20px;
    gap: 30px;
  }
`;

export const ModuleCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.08);
  max-width: 320px;
  width: 100%;
  font-family: 'Inter', sans-serif;

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }
`;

export const ModuleInfo = styled.div`
  padding: 20px 24px 24px 24px;
  background: white;
`;

export const GameMapCard = styled.div`
  background: transparent;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.08);
  width: fit-content;
  overflow: hidden;

  &:hover {
    box-shadow: 0 16px 36px rgba(25, 118, 210, 0.12);
  }
`;

export const GameMapContainer = styled.div`
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
`;

export const Map = styled.div`
  position: relative;
  background: url(${newMap}) no-repeat center;
  background-size: cover;
  border-radius: 16px;
  
  ${({ width, height }) => css`
    width: ${width};
    height: ${height};
    max-width: 100%;
  `}
`;

export const TopGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  z-index: 1;
  border-radius: 16px 16px 0 0;
`;

export const BotGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
  z-index: 1;
  border-radius: 0 0 16px 16px;
`;

export const Level = styled.button`
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  width: 52px;
  height: 65px;
  background: url(${({ current, completed }) =>
    current
      ? currentLevelIcon
      : completed
        ? completedLevelIcon
        : unavailableLevelIcon})
    no-repeat center;
  background-size: contain;
  z-index: 10;

  ${({ current }) =>
    current &&
    css`
      animation: 1s ${currentLevelAnimation} linear infinite alternate;
      z-index: 15;
    `};

  ${({ available }) =>
    !available &&
    css`
      pointer-events: none;
      cursor: default;
      opacity: 0.5;
    `};

  &:hover {
    filter: brightness(1.1);
    transform: scale(1.1);
  }

  ${({ bottomPercent, leftPercent, current }) => css`
    bottom: ${bottomPercent + (current ? 2 : 0)}%;
    left: ${leftPercent + (current ? 0.5 : 0)}%;
  `};

  transition: all 0.2s ease;
`;

export const ModuleTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1A1A1A;
`;

export const LevelCount = styled.div`
  font-family: 'Inter', sans-serif;
  color: #5C7185;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 18px;
`;

export const Description = styled.p`
  font-family: 'Inter', sans-serif;
  color: #444;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.span`
  font-family: 'Inter', sans-serif;
  background: rgba(25, 118, 210, 0.08);
  color: #1976D2;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  user-select: none;
`; 