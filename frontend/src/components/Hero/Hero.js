import React from 'react';
import { HeroTooltip } from '../HeroTooltip/HeroTooltip';
import { Wrapper } from './styled';

export const Hero = ({ x, y, zIndex, shift, animated, texts, spedUp }) => (
  <>
    <HeroTooltip texts={texts} />
    <Wrapper
      x={x}
      y={y}
      zIndex={zIndex}
      shift={shift}
      animated={animated}
      spedUp={spedUp}
      data-tooltip-id="wizard-tooltip"
    />
  </>
);
