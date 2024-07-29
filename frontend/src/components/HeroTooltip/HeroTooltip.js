import React, { useEffect } from 'react';

import { StyledTooltip } from './styled';
import { useRefState } from '../../hooks/useRefState';
import smallPlay from '../../assets/small-play.svg';
import { delay } from '../../utils/delay';

const defaultDelay = 3000;

export const HeroTooltip = ({ texts }) => {
  const [text, setText] = useRefState(null);

  const showText = async (index) => {
    setText(texts[index]);

    await delay(texts[index].delay || defaultDelay);

    if (index < texts.length - 1) {
      showText(index + 1);
    } else {
      setText(null);
    }
  };

  useEffect(() => {
    showText(0);
  }, [texts]);

  if (!text.current) {
    return null;
  }

  return (
    <StyledTooltip
      id="wizard-tooltip"
      place="top-start"
      isOpen={!!text}
      content={
        <span>
          {text.current.value}
          {texts.length > 1 && <img src={smallPlay} alt="play" />}
        </span>
      }
    />
  );
};
