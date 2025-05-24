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
  background-image: linear-gradient(#99C979, #5F9F6E);
  overflow: hidden;
`;

export const DragWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform: translate(${({ dragPosition }) => dragPosition.x}px, ${({ dragPosition }) => dragPosition.y}px);
  cursor: ${({ isDragging }) => isDragging ? 'grabbing' : 'grab'};
  user-select: none;
`;

export const MapWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: scale(${({ scale }) => scale});
  margin-right: 100px;

  @media only screen and (max-width: 1300px) {
    margin-right: 0px;
  }
`;

export const MapField = styled.div`
  display: grid;

  ${({ width, height }) => css`
    width: ${width * 50}px;
    height: ${height * 50}px;
    grid-template-columns: repeat(${width}, 50px);
    grid-template-rows: repeat(${height}, 50px);
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
  background-color:rgb(202, 166, 127);

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
    `}
`

export const Tree = styled.div`
  width: 100px;
  height: 100px;
  background: url(${tree}) no-repeat center;
  position: relative;
  bottom: 50px;
  right: 25px;

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
  height: 100px;
  transform: scale(0.6);
  background: url(${rock}) no-repeat center;
  position: relative;
  bottom: 25px;
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
  width: 100px;
  height: 100px;
  transform: scale(0.6);
  background: url(${finish}) no-repeat center;
  position: relative;
  bottom: 45px;
  right: 14px;

  ${({ x, y, zIndex }) => css`
    z-index: ${zIndex};
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const MenuButton = styled.div`
  position: fixed;
  z-index: 101;
  top: 15px;
  left: 15px;
`;