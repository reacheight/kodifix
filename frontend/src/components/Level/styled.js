import styled, { css, keyframes } from 'styled-components';

import tree from '../../assets/tree.svg';
import rock from '../../assets/rock.svg';
import gem from '../../assets/gem.svg';
import water from '../../assets/water.svg';
import waterTop from '../../assets/water-top.svg';
import finish from '../../assets/finish.svg';

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

const appearance = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const LoadingBackground = styled.div`
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
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
  z-index: 100;
  background-image: url(data:image/png;base64,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), linear-gradient(#99C979, #5F9F6E);
`;

export const MapWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 50ms linear;
  transform: scale(${({ scale }) => scale});
`;

export const MapField = styled.div`
  display: grid;

  ${({ width, height }) => css`
    width: ${width * 50}px;
    height: ${height * 50}px;
    grid-template-columns: repeat(${width}, 49px);
    grid-template-rows: repeat(${height}, 49px);
  `}
`;

export const Lawn = styled.div`
  height: 50px;
  width: 50px;

  ${({ x, y, zIndex }) => css`
    z-index: ${zIndex};
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Sand = styled.div`
  height: 50px;
  width: 50px;
  background-color: rgba(191, 140, 119);

  ${({ x, y, zIndex }) => css`
    z-index: ${zIndex};
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const CellFilter = styled.div`
  height: 50px;
  width: 50px;

  ${({ x, y }) => css`
      background-color: ${((x + y) % 2 == 0) ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.03)"};
      border-radius: ${((x + y) % 2 == 0) ? "5px" : "0px"};
    `}
`

export const Tree = styled.div`
  width: 75px;
  height: 100px;
  background: url(${tree}) no-repeat center;
  position: relative;
  bottom: 60px;
  right: 12px;

  opacity: ${({ x, y, heroX, heroY }) =>
    x - heroX === 1 && y === heroY ? 0.5 : 1};

  ${({ x, y, zIndex }) => css`
    z-index: ${zIndex};
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Rock = styled.div`
  width: 100px;
  height: 85px;
  background: url(${rock}) no-repeat center;
  position: relative;
  bottom: 20px;
  right: 25px;

  z-index: ${({ x, heroX }) => (x <= heroX ? 1 : 2)};

  ${({ x, y, zIndex }) => css`
    z-index: ${zIndex};
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Water = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  z-index: 0;

  ${({ x, y, isTop }) => css`
    background: url(${isTop ? waterTop : water}) no-repeat center;
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

  ${({ x, y, zIndex }) => css`
    z-index: ${zIndex};
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Finish = styled.div`
  width: 64px;
  height: 80px;
  background: url(${finish}) no-repeat center;
  position: relative;
  bottom: 45px;
  left: 15px;

  ${({ x, y, zIndex }) => css`
    z-index: ${zIndex};
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Bridge = styled.div`
  animation: 300ms ${appearance} ease forwards;
  z-index: 1;

  ${({ vertical }) =>
    vertical
      ? css`
          background: linear-gradient(
            180deg,
            #a0522d 25%,
            rgba(255, 255, 255, 0) 25%,
            rgba(255, 255, 255, 0) 50%,
            #a0522d 50%,
            #a0522d 75%,
            rgba(255, 255, 255, 0) 75%,
            rgba(255, 255, 255, 0) 100%
          );
        `
      : css`
          background: linear-gradient(
            90deg,
            #a0522d 25%,
            rgba(255, 255, 255, 0) 25%,
            rgba(255, 255, 255, 0) 50%,
            #a0522d 50%,
            #a0522d 75%,
            rgba(255, 255, 255, 0) 75%,
            rgba(255, 255, 255, 0) 100%
          );
        `}

  background-size: 20px 20px; /* Размер полосок */

  ${({ xStart, yStart, xEnd, yEnd }) => css`
    grid-row-start: ${xStart + 1};
    grid-row-end: ${xEnd + 2};
    grid-column-start: ${yStart + 1};
    grid-column-end: ${yEnd + 2};
  `}
`;
