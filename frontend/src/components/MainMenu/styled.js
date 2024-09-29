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
`

export const Game = styled.div`
  display: flex;
  gap: 100px;

  position: absolute;
  width: 100%;
  height: 100%;
`

export const GameDescription = styled.div`
  position: absolute;

  width: 400px;
  height: calc(100vh - 40px);
  margin: 20px;
  background: white;
  border-radius: 10px;

  z-index: 1;
`

export const DescriptionHeader = styled.div`
  height: 180px;
  background: linear-gradient(#3DC8D1, #8BC7F9);
  border-radius: 10px;
  padding: 20px;
`

export const Title = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 26px;
  font-weight: 600;
  color: white;

  position: relative;
  z-index: 1;
`

export const LevelCount = styled.div`
  font-family: 'Inter', sans-serif;
  color: white;

  margin-top: 8px;
  margin-left: 10px;
`

export const Wizard = styled.div`
  width: 74px;
  height: 80px;
  transform: scale(2) scaleX(-1);
  background: url(${wizardImage}) no-repeat center;

  position: relative;
  left: 250px;
  top: 0px;
  z-index: 1;
`

export const Gem1 = styled.div`
  width: 40px;
  height: 84px;
  transform: scale(2) rotate(30deg);
  background: url(${gemImage}) no-repeat center;

  position: relative;
  left: 230px;
  bottom: 170px;
  z-index: 0;
`

export const Gem2 = styled.div`
  width: 40px;
  height: 84px;
  transform: scale(1.5) rotate(-15deg);
  background: url(${gemImage}) no-repeat center;

  position: relative;
  left: 160px;
  bottom: 130px;
  z-index: 0;
`

export const Gem3 = styled.div`
  width: 40px;
  height: 84px;
  transform: scale(1.5) rotate(10deg);
  background: url(${gemImage}) no-repeat center;

  position: relative;
  left: 340px;
  bottom: 280px;
  z-index: 0;
`

export const Description = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #393939;

  padding: 20px;
  margin-top: 20px;
`

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  padding: 20px;
`

export const Tag = styled.div`
  font-family: 'Consolas', sans-serif;
  color: #3C80E7;
  
  text-align: center;
  align-items: center;

  background: #CDEDF2;
  border-radius: 3px;
  padding: 2px 4px;
`

export const Map = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  z-index: 0;

  background: url(${gameMap}) no-repeat bottom;
  background-size: 100%;
`

export const Level = styled.button`
  border: none;
  padding: 0;
  cursor: pointer;

  position: absolute;
  width: 64px;
  height: 80px;

  background: url(${({ current, completed }) => current ? currentLevel : completed ? completedLEvelIcon : unavailableLevelIcon}) no-repeat center;

  ${({ current }) => current && css`
    animation: 1s ${currentLevelAnimation} linear infinite alternate;
    z-index: 1;
  `};

  ${({ available }) => !available && css`
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
`