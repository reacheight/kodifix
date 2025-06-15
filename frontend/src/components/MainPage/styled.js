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
  padding-top: 150px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 20px;
    padding-top: 120px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    padding-top: 100px;
    gap: 20px;
  }
`;

export const ModulesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 1400px;
  align-items: center;

  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const ModuleCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.08);
  max-width: 350px;
  width: 100%;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 32px rgba(25, 118, 210, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 1200px) {
    max-width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    min-height: 160px;
  }

  @media (max-width: 900px) {
    min-height: 140px;
  }

  @media (max-width: 768px) {
    min-height: 120px;
  }
`;

export const ModulePreview = styled.div`
  position: relative;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 1200px) {
    flex-shrink: 0;
    width: 220px;

    img {
      width: 220px;
      height: 100%;
      min-height: 140px;
    }
  }
`;

export const ModuleStatus = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(25, 118, 210, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(4px);
  user-select: none;

  @media (max-width: 768px) {
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    font-size: 10px;
  }
`;

export const ModuleInfo = styled.div`
  padding: 24px;
  background: white;

  @media (max-width: 1200px) {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const ModuleProgress = styled.div`
  margin: 16px 0;

  @media (max-width: 1200px) {
    margin: 12px 0;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

export const ProgressText = styled.div`
  font-size: 14px;
  color: #5C7185;
  margin-bottom: 8px;
  font-weight: 500;

  @media (max-width: 1200px) {
    font-size: 13px;
    margin-bottom: 6px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #E8F4FD;
  border-radius: 3px;
  overflow: hidden;

  div {
    height: 100%;
    background: linear-gradient(90deg, #1976D2, #42A5F5);
    border-radius: 3px;
    transition: width 0.3s ease;
  }
`;

export const ExpandButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  background: ${({ expanded }) => expanded ? '#1976D2' : 'transparent'};
  color: ${({ expanded }) => expanded ? 'white' : '#1976D2'};
  border: 2px solid #1976D2;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: #1976D2;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  }
`;

export const GameMapCard = styled.div`
  background: transparent;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.08);
  width: fit-content;
  overflow: hidden;
  max-width: 100%;

  &:hover {
    box-shadow: 0 16px 36px rgba(25, 118, 210, 0.12);
  }

  @media (max-width: 768px) {
    margin: 15px -20px 0 -20px;
    border-radius: 0;
  }
`;

export const GameMapContainer = styled.div`
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 16px;
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

  @media (max-width: 768px) {
    border-radius: 0;
    width: 100vw !important;
    height: 60vh !important;
  }

  @media (max-width: 480px) {
    height: 50vh !important;
  }
`;

export const Level = styled.button`
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  width: 30px;
  height: 30px;
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
    bottom: ${bottomPercent + (current ? 0 : 0)}%;
    left: ${leftPercent + (current ? 0 : 0)}%;
  `};

  transition: all 0.2s ease;
`;

export const ModuleTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1A1A1A;

  @media (max-width: 1200px) {
    font-size: 20px;
    margin: 0 0 6px 0;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const LevelCount = styled.div`
  font-family: 'Inter', sans-serif;
  color: #5C7185;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 18px;

  @media (max-width: 1200px) {
    font-size: 13px;
    margin-bottom: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 12px;
  }
`;

export const Description = styled.p`
  font-family: 'Inter', sans-serif;
  color: #5C7185;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;

  @media (max-width: 1200px) {
    font-size: 13px;
    margin: 0 0 12px 0;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 1.4;
    display: none; /* Hide description on mobile to save space */
  }
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 1200px) {
    gap: 6px;
  }

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

export const Tag = styled.span`
  font-family: 'Inter', sans-serif;
  background: rgba(25, 118, 210, 0.08);
  color: #1976D2;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;

  /* Hide mobile more tags indicator on desktop */
  &.mobile-more-tags {
    display: none;
  }

  @media (max-width: 1200px) {
    padding: 5px 10px;
    font-size: 11px;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 10px;

    /* Show only first 3 tags on mobile */
    &:nth-child(n+4):not(.mobile-more-tags) {
      display: none;
    }

    /* Show the mobile more tags indicator */
    &.mobile-more-tags {
      display: inline-block;
      background: rgba(25, 118, 210, 0.15);
      font-weight: 600;
    }
  }
`;

export const ModuleNumber = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(4px);
  font-family: 'Inter', sans-serif;
  user-select: none;

  @media (max-width: 768px) {
    top: 8px;
    left: 8px;
    padding: 4px 8px;
    font-size: 10px;
  }
`;