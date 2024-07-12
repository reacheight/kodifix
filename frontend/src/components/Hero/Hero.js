import React from 'react';
import { HeroTooltip } from '../HeroTooltip/HeroTooltip';
import { Wrapper } from './styled';

export const Hero = ({ x, y, shift, animated, texts }) => (
  <>
    {texts.length ? <HeroTooltip texts={texts} /> : null}
    <Wrapper
      x={x}
      y={y}
      shift={shift}
      animated={animated}
      data-tooltip-id="wizard-tooltip"
    />
  </>
);
