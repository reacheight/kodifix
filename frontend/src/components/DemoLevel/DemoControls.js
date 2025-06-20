import React from 'react';
import { ControlWrapper, ControlButtons, PlayButtonWrapper } from './styled';
import playIcon from '../../assets/play.svg';
import { Button } from '../Button/Button';
import boldArrow from '../../assets/bold-arrow.svg';

export const DemoControls = ({
  isRunning,
  onStart,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
}) => (
  <ControlWrapper>
    <ControlButtons>
      <PlayButtonWrapper>
        <Button
          shadowColor="#1E9029"
          frontColor="#40BF4C"
          icon={playIcon}
          alt="play"
          onClick={onStart}
          width="50"
          height="40"
          shadowHeight="10"
          disabled={isRunning}
        />
      </PlayButtonWrapper>
      <Button
        shadowColor="#1B4B82"
        frontColor="#2D7CD4"
        alt="left"
        icon={boldArrow}
        onClick={onMoveLeft}
        width="50"
        height="40"
        shadowHeight="10"
        disabled={isRunning}
      />
      <Button
        shadowColor="#1B4B82"
        frontColor="#2D7CD4"
        alt="up"
        icon={boldArrow}
        onClick={onMoveUp}
        width="50"
        height="40"
        shadowHeight="10"
        disabled={isRunning}
        imageRotation={90}
      />
      <Button
        shadowColor="#1B4B82"
        frontColor="#2D7CD4"
        alt="down"
        icon={boldArrow}
        onClick={onMoveDown}
        width="50"
        height="40"
        shadowHeight="10"
        disabled={isRunning}
        imageRotation={-90}
      />
      <Button
        shadowColor="#1B4B82"
        frontColor="#2D7CD4"
        alt="right"
        icon={boldArrow}
        onClick={onMoveRight}
        width="50"
        height="40"
        shadowHeight="10"
        disabled={isRunning}
        imageRotation={180}
      />
    </ControlButtons>
  </ControlWrapper>
); 