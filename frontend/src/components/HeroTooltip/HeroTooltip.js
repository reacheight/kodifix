import React, { useEffect } from 'react';

import { StyledTooltip } from './styled';
import { useRefState } from '../../hooks/useRefState';
import smallPlay from '../../assets/small-play.svg';

const delay = 3000;

export const HeroTooltip = ({ texts }) => {
  const [intervalId, setIntervalId] = useRefState(null);
  const [textIndex, setTextIndex] = useRefState(0);

  useEffect(() => {
    if (!texts.length) {
      return;
    }

    const id = setInterval(() => {
      if (textIndex.current === texts.length - 1) {
        clearInterval(id);
        setIntervalId(null);
      } else {
        setTextIndex(textIndex.current + 1);
      }
    }, delay);

    setIntervalId(id);

    return () => {
      setIntervalId(null);
      setTextIndex(0);
    };
  }, [texts]);

  if (!intervalId.current) {
    return null;
  }

  return (
    <StyledTooltip
      id="wizard-tooltip"
      place="top-start"
      isOpen={!!intervalId.current}
      content={
        <span>
          {texts[textIndex.current]}
          {textIndex.current < texts.length - 1 && (
            <img src={smallPlay} alt="play" />
          )}
        </span>
      }
    />
  );
};
