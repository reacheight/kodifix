import styled, { css } from 'styled-components';

export const OpenBridge = styled.div`
  z-index: 1;

  ${({ vertical }) =>
    vertical
      ? css`
          background: linear-gradient(
            180deg,
            #8b4513 25%,
            rgba(255, 255, 255, 0) 25%,
            rgba(255, 255, 255, 0) 50%,
            #8b4513 50%,
            #8b4513 75%,
            rgba(255, 255, 255, 0) 75%,
            rgba(255, 255, 255, 0) 100%
          );
        `
      : css`
          background: linear-gradient(
            90deg,
            #8b4513 25%,
            rgba(255, 255, 255, 0) 25%,
            rgba(255, 255, 255, 0) 50%,
            #8b4513 50%,
            #8b4513 75%,
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

export const ClosedBridge = styled.div`
  z-index: 1;

  ${({ vertical }) =>
    vertical
      ? css`
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 25%,
            #8b4513 25%,
            #8b4513 50%,
            rgba(255, 255, 255, 0) 50%,
            rgba(255, 255, 255, 0) 75%,
            #8b4513 75%,
            #8b4513 100%
          ) top center repeat-x,
           linear-gradient(
            180deg,
            #8b4513 25%,
            rgba(255, 255, 255, 0) 25%,
            rgba(255, 255, 255, 0) 50%,
            #8b4513 50%,
            #8b4513 75%,
            rgba(255, 255, 255, 0) 75%,
            rgba(255, 255, 255, 0) 100%
          ) bottom center repeat-x;
        `
      : css`
          background: linear-gradient(
            90deg,
            #8b4513 25%,
            rgba(255, 255, 255, 0) 25%,
            rgba(255, 255, 255, 0) 50%,
            #8b4513 50%,
            #8b4513 75%,
            rgba(255, 255, 255, 0) 75%,
            rgba(255, 255, 255, 0) 100%
          ) left center repeat-y,
           linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 25%,
            #8b4513 25%,
            #8b4513 50%,
            rgba(255, 255, 255, 0) 50%,
            rgba(255, 255, 255, 0) 75%,
            #8b4513 75%,
            #8b4513 100%
          ) right center repeat-y;

          margin-left: 1px;
        `}

  background-size: 20px 20px; /* Размер полосок */

  ${({ xStart, yStart, xEnd, yEnd }) => css`
    grid-row-start: ${xStart + 1};
    grid-row-end: ${xEnd + 2};
    grid-column-start: ${yStart + 1};
    grid-column-end: ${yEnd + 2};
  `}
`