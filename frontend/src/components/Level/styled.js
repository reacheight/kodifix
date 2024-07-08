import styled, { css , keyframes } from "styled-components";

import level1Map from '../../assets/level-1-map.svg'
import level1MapBottom from '../../assets/level-1-map-bottom.svg'
import tree from '../../assets/tree.svg'
import rock from '../../assets/rock.svg'
import gem from '../../assets/gem.svg'
import wizard from '../../assets/wizard.svg'
import { computeStart, computeEnd } from './utils';

const shaking = keyframes`
  0% {
    transform: rotate(2deg);
  }
  100% {
    transform: rotate(-2deg);
  }
    0% {
        transform: rotate(2deg);
    }
`

const pulsation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
`

export const Wrapper = styled.div`
  height: 100%;
  background-color: #353736;
    display: flex;
`

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
    grid-template-columns: repeat(12, 49px);
    grid-template-rows: repeat(12, 49px);
 
 background: url(${level1Map}) no-repeat center;
`;

export const MapBottom = styled.div`
  width: 589px;
    height: 35px;
    background: url(${level1MapBottom}) no-repeat center;
`;

export const Controls = styled.div`
    width: 529px;
    padding: 18px;
    border-radius: 16px;
    background-color: #2A2623;
    margin-bottom: 20px;
    
    display: flex;
    justify-content: space-between;
`;

export const LeftButtons = styled.div`
    display: flex;
    gap: 20px;
`;

export const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
    
    &:hover {
        opacity: 0.9;
    }
`;

export const ButtonFront = styled.div`
    width: 94px;
    height: 94px;
    border-radius: 5px;
    background: ${({ color }) => color};
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ButtonTop = styled.div`
    width: 94px;
    height: 14px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: ${({ color }) => color};
    position: relative;
    top: 4px;
`;

export const Tree = styled.div`
    width: 61px;
    height: 115px;
    background: url(${tree}) no-repeat center;
    position: relative;
    bottom: 80px;
    right: 8px;

    ${({ x, y}) => css`
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

    ${({ x, y}) => css`
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

    ${({ x, y}) => css`
        grid-row-start: ${x + 1};
        grid-row-end: ${x + 2};
        grid-column-start: ${y + 1};
        grid-column-end: ${y + 2};
    `}
`;

export const Wizard = styled.div`
    width: 74px;
    height: 80px;
    background: url(${wizard}) no-repeat center;
    position: relative;
    ${({ shift }) => css`
        bottom: ${45 + shift.bottom}px;
        right: ${12 + shift.right}px;
    `}
    transition: linear 300ms;

    ${({ x, y }) => css`
        grid-row-start: ${x + 1};
        grid-row-end: ${x + 2};
        grid-column-start: ${y + 1};
        grid-column-end: ${y + 2};

    `}

    ${({ animated }) => animated && css`
        animation: 300ms ${shaking} infinite alternate;
    `}
`;


export const CodeMirrorWrapper = styled.div`
    margin: 20px 20px 0 0;
    overflow: hidden;
    
    .cm-editor {
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        background: #2A2623;
    }
    
    .cm-gutters {
        border-top-left-radius: 16px;
        background: #2F2B29;
        overflow: hidden;
    }
`;

