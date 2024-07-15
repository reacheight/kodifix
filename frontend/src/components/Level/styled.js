import styled, { css, keyframes } from 'styled-components';

import lawn from '../../assets/lawn.svg';
import grass from '../../assets/grass.svg';
import sand from '../../assets/sand.svg';
import lawnBottom from '../../assets/lawn-bottom.svg';
import sandBottom from '../../assets/sand-bottom.svg';
import tree from '../../assets/tree.svg';
import rock from '../../assets/rock.svg';
import gem from '../../assets/gem.svg';
import water from '../../assets/water.svg';

const pulsation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
`;

const gemFade = keyframes`
  0% {
    opacity:  1;
  }


  100% {
    opacity: 0;
    transform: scale(0.1);
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  background-color: #353736;
  display: flex;
  overflow: hidden;
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const MapWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MapField = styled.div`
  display: grid;

  ${({ width, height }) => css`
    width: ${width * 49}px;
    height: ${height * 49}px;
    grid-template-columns: repeat(${width}, 49px);
    grid-template-rows: repeat(${height}, 49px);
  `}
`;

export const MapBottom = styled.div`
  height: 35px;
  display: grid;

  ${({ width }) => css`
    width: ${49 * width}px;
    grid-template-columns: repeat(${width}, 49px);
    grid-template-rows: repeat(1, 35px);
  `}
`;

export const Lawn = styled.div`
  height: 50px;
  width: 50px;
  background: url(${lawn}) no-repeat center;

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Grass = styled.div`
  height: 50px;
  width: 50px;
  background: url(${grass}) no-repeat center;

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Sand = styled.div`
  height: 50px;
  width: 50px;
  background: url(${sand}) no-repeat center;

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const LawnBottom = styled.div`
  height: 35px;
  width: 50px;
  background: url(${lawnBottom}) no-repeat center;
`;

export const SandBottom = styled.div`
  height: 35px;
  width: 50px;
  background: url(${sandBottom}) no-repeat center;
`;

export const Tree = styled.div`
  width: 61px;
  height: 115px;
  background: url(${tree}) no-repeat center;
  position: relative;
  bottom: 80px;
  right: 8px;

  opacity: ${({ x, y, heroX, heroY }) =>
    x - heroX === 1 && y === heroY ? 0.5 : 1};

  z-index: ${({ x, heroX }) => (x <= heroX ? 1 : 2)};

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Rock = styled.div`
  width: 50px;
  height: 69px;
  background: url(${rock}) no-repeat center;
  position: relative;
  bottom: 20px;

  z-index: ${({ x, heroX }) => (x <= heroX ? 1 : 2)};

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Water = styled.div`
  width: 50px;
  height: 50px;
  background: url(${water}) no-repeat center;
  position: relative;

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Gem = styled.div`
  width: 40px;
  height: 84px;
  background: url(${gem}) no-repeat center;
  position: relative;
  bottom: 20px;
  left: 5px;
  ${({ collected }) =>
    collected
      ? css`
          animation: 200ms ${gemFade} linear forwards;
        `
      : css`
          animation: 2s ${pulsation} linear infinite alternate;
        `}

  z-index: ${({ x, heroX }) => (x < heroX ? 1 : 2)};

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Finish = styled.div`
  width: 49px;
  height: 21px;
  position: relative;
  top: 14px;
  background-color: white;
  background-image: linear-gradient(
      45deg,
      #000 25%,
      transparent 25%,
      transparent 74%,
      #000 75%,
      #000
    ),
    linear-gradient(
      45deg,
      #000 25%,
      transparent 25%,
      transparent 74%,
      #000 75%,
      #000
    );
  background-size: 14px 14px;
  background-position:
    0 0,
    7px 7px;

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;
