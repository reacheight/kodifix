import React from 'react';
import { Wrapper } from './styled';
import playIcon from '../../assets/play.svg';
import pauseIcon from '../../assets/pause.svg';
import stopIcon from '../../assets/stop.svg';
import questionsIcon from '../../assets/questions.svg';
import { Button } from '../Button/Button';

export const Controls = ({
  isRunning,
  isPaused,
  hasGuide,
  onStart,
  onContinue,
  onPause,
  onStop,
  onGuideOpen,
}) => {
  return (
    <Wrapper>
      {!isRunning && !isPaused && (
        <Button
          shadowColor="#1E9029"
          frontColor="#40BF4C"
          icon={playIcon}
          alt="play"
          onClick={onStart}
        />
      )}

      {isRunning && (
        <Button
          shadowColor="#B47C11"
          frontColor="#D79D2C"
          icon={pauseIcon}
          alt="pause"
          onClick={onPause}
        />
      )}

      {isPaused && (
        <Button
          shadowColor="#1E9029"
          frontColor="#3CB949"
          icon={playIcon}
          alt="play"
          onClick={onContinue}
        />
      )}

      <Button
        disabled={!isRunning && !isPaused}
        shadowColor="#7C2828"
        frontColor="#B93C3C"
        icon={stopIcon}
        alt="stop"
        onClick={onStop}
      />

      <Button
        disabled={!hasGuide}
        shadowColor="#06719F"
        frontColor="#0AA1E2"
        icon={questionsIcon}
        alt="questions"
        onClick={onGuideOpen}
      />
    </Wrapper>
  );
};
