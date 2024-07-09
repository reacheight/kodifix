import styled, { css, keyframes } from 'styled-components';

import lawn from '../../assets/lawn.svg';
import grass from '../../assets/grass.svg';
import sand from '../../assets/sand.svg';
import lawnBottom from '../../assets/lawn-bottom.svg';
import sandBottom from '../../assets/sand-bottom.svg';
import tree from '../../assets/tree.svg';
import rock from '../../assets/rock.svg';
import gem from '../../assets/gem.svg';

const pulsation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  background-color: #353736;
  display: flex;
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
  width: 589px;
  height: 589px;
  display: grid;

  ${({ width, height }) => css`
    grid-template-columns: repeat(${width}, 49px);
    grid-template-rows: repeat(${height}, 49px);
  `}
`;

export const MapBottom = styled.div`
  width: 589px;
  height: 35px;
  display: grid;

  ${({ width }) => css`
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
  z-index: 1;

  ${({ x, y, hero }) =>
    x - hero.x === 1 &&
    y === hero.y &&
    css`
      opacity: 0.5;
    `}

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
  animation: 2s ${pulsation} linear infinite alternate;

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const CodeMirrorWrapper = styled.div`
  margin: 20px 20px 0 0;
  overflow: hidden;

  .cm-editor {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background: #2a2623;
  }

  .cm-gutters {
    border-top-left-radius: 16px;
    background: #2f2b29;
    overflow: hidden;
  }
`;
