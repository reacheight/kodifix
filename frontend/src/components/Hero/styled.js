import styled, { css } from 'styled-components';
import wizard from '../../assets/wizard.svg';

export const Wrapper = styled.div`
  width: 74px;
  height: 80px;
  background: url(${wizard}) no-repeat center;
  transition: ease-in-out 300ms;
  position: relative;
  z-index: 1;

  ${({ shift }) => css`
    bottom: ${45 + shift.bottom}px;
    right: ${12 + shift.right}px;
  `}

  ${({ x, y }) => css`
    grid-row-start: ${x + 1};
    grid-row-end: ${x + 2};
    grid-column-start: ${y + 1};
    grid-column-end: ${y + 2};
  `}
`;
