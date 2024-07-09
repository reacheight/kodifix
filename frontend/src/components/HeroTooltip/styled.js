import { styled } from 'styled-components';

import { Tooltip } from 'react-tooltip';

export const StyledTooltip = styled(Tooltip)`
  font-family: 'Raleway', sans-serif !important;
  font-size: 14px !important;
  line-height: 18px !important;
  color: #000 !important;
  background-color: #fff !important;
  opacity: 1 !important;
  padding: 16px !important;
  border-radius: 8px !important;
  white-space: break-spaces !important;
  transform: translateX(14px);
  z-index: 1;

  > div {
    transform: rotate(45deg) translate(-13px, 13px) !important;
  }

  img {
    position: absolute;
    bottom: 6px;
    right: 12px;
  }
`;
