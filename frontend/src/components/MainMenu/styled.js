import styled, { css, keyframes } from 'styled-components';
import wizardImage from '../../assets/wizard.svg';
import gemImage from '../../assets/gem.svg';
import mapImage from '../../assets/map.jpg';
import currentLevel from '../../assets/current-level.svg';
import unavailableLevelIcon from '../../assets/unavailable-level.svg';
import completedLEvelIcon from '../../assets/completed-level.svg';

const currentLevelAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.5);
  }
`

export const Game = styled.div`
  display: flex;
  gap: 100px;
`

export const GameDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: auto;

  width: 400px;
  background: rgba(61, 200, 209, 0.2);
  border-radius: 10px;
`

export const DescriptionHeader = styled.div`
  width: 400px;
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

  background: #F4F4F4;
  border-radius: 3px;
  padding: 2px 4px;
`

export const Map = styled.div`
  width: 800px;
  height: 800px;
  background: url(${mapImage}) no-repeat;
  background-size: 100%;
  border-radius: 10px;
`

export const Level = styled.a`
  display: block;
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

  position: relative;
  ${({ top, left, current }) => css`
    top: ${top + (current ? -10 : 25)}px;
    left: ${left + (current ? 20 : -10)}px;
  `};
`