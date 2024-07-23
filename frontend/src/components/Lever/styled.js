import styled, { css } from 'styled-components';
import lever from '../../assets/lever.svg';

export const Wrapper = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  left: 0;
  top: 0;
  z-index: 2;

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;

export const Name = styled.span`
  display: block;
  font-weight: bold;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  color: #ffffff;
  text-shadow: 0 0 3px #000;
  user-select: none;
  position: relative;
  top: -23px;
`;

export const Image = styled.div`
  height: 50px;
  width: 50px;
  background: url(${lever}) no-repeat center;

  ${({ enabled }) => css`
    transform: scaleX(${enabled ? -1 : 1});
  `}
`;
