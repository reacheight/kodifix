import React from 'react';
import { Wrapper, Button, ButtonFront, ButtonTop, LeftButtons } from './styled';
import playIcon from '../../assets/play.svg';
import pauseIcon from '../../assets/pause.svg';
import speedUpIcon from '../../assets/speed-up.svg';
import questionIcon from '../../assets/question.svg';

export const Controls = ({
  isRunning,
  isPaused,
  onStart,
  onContinue,
  onPause,
}) => {
  return (
    <Wrapper>
      <LeftButtons>
        {!isRunning && !isPaused && (
          <Button onClick={onStart}>
            <ButtonTop color="#1E9029" />
            <ButtonFront color="#3CB949">
              <img alt="play" src={playIcon} />
            </ButtonFront>
          </Button>
        )}

        {isRunning && (
          <Button onClick={onPause}>
            <ButtonTop color="#7C2828" />
            <ButtonFront color="#B93C3C">
              <img alt="play" src={pauseIcon} />
            </ButtonFront>
          </Button>
        )}

        {isPaused && (
          <Button onClick={onContinue}>
            <ButtonTop color="#D69C00" />
            <ButtonFront color="#FFBA00">
              <img alt="play" src={playIcon} />
            </ButtonFront>
          </Button>
        )}

        <Button>
          <ButtonTop color="#626763" />
          <ButtonFront color="#868A86">
            <img alt="play" src={speedUpIcon} />
          </ButtonFront>
        </Button>
      </LeftButtons>
      <Button>
        <ButtonTop color="#626763" />
        <ButtonFront color="#868A86">
          <img alt="play" src={questionIcon} />
        </ButtonFront>
      </Button>
    </Wrapper>
  );
};
