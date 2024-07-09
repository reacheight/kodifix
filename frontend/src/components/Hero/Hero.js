import React from 'react';
import { HeroTooltip } from '../HeroTooltip/HeroTooltip';
import { Wrapper } from './styled';

export const Hero = ({ x, y, shift, animated, texts }) => (
  <>
    <HeroTooltip
      key={texts.reduce((acc, text) => acc + text, '')}
      texts={texts}
    />
    <Wrapper
      x={x}
      y={y}
      shift={shift}
      animated={animated}
      data-tooltip-id="wizard-tooltip"
    />
  </>
);
