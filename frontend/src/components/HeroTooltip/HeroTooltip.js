import React, { useEffect } from 'react';

import { StyledTooltip } from './styled';
import { useRefState } from '../../hooks/useRefState';
import smallPlay from '../../assets/small-play.svg';

const defaultDelay = 3000;

export const HeroTooltip = ({ texts }) => {
  const [isOpen, setIsOpen] = useRefState(false);
  const [text, setText] = useRefState(null);
  const [timeoutId, setTimeoutId] = useRefState(null);

  const showText = async (index) => {
    setText(texts[index]);

    const timeoutId = setTimeout(() => {
      if (index < texts.length - 1) {
        showText(index + 1);
      } else {
        setIsOpen(false);
      }
    }, texts[index].delay || defaultDelay);

    setTimeoutId(timeoutId);
  };

  useEffect(() => {
    if (texts.length) {
      setIsOpen(true);
      showText(0);
    } else {
      setIsOpen(false);
    }

    return () => clearTimeout(timeoutId.current);
  }, [texts]);

  return (
    <StyledTooltip
      id="wizard-tooltip"
      place="top-start"
      isOpen={!!isOpen.current}
      afterHide={() => setText(null)}
      content={
        <span>
          {text.current?.value}
          {texts.length > 1 && <img src={smallPlay} alt="play" />}
        </span>
      }
    />
  );
};
