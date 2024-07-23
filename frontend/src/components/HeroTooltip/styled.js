import { styled } from 'styled-components';

import { Tooltip } from 'react-tooltip';

export const StyledTooltip = styled(Tooltip)`
  &.react-tooltip {
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    line-height: 18px;
    color: #000;
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    white-space: break-spaces;
    transform: translateX(14px);
    z-index: 3;
  }

  &.react-tooltip__show {
    opacity: 1;
  }

  // стрелка
  > div {
    transform: rotate(45deg) translate(-13px, 13px) !important;
  }

  img {
    position: absolute;
    bottom: 6px;
    right: 12px;
  }
`;
