import React, { useState, useEffect, useCallback } from 'react';
import { ControlWrapper, ControlButtons, PlayButtonWrapper } from './styled';
import playIcon from '../../assets/play.svg';
import { DemoButton } from './DemoButton';
import boldArrow from '../../assets/bold-arrow.svg';

export const DemoControls = ({
  isRunning,
  onStart,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldFloat, setShouldFloat] = useState(false);
  
  useEffect(() => {
    let timeoutId;
    
    if (!isHovered) {
      timeoutId = setTimeout(() => {
        setShouldFloat(true);
      }, 5000);
    } else {
      setShouldFloat(false);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isHovered]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <ControlWrapper 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ControlButtons>
        <PlayButtonWrapper>
          <DemoButton
            shadowColor="#1E9029"
            frontColor="#40BF4C"
            icon={playIcon}
            alt="play"
            onClick={onStart}
            width="50"
            height="40"
            shadowHeight={10}
            disabled={isRunning}
            isFloating={shouldFloat}
            animationDelay={0}
          />
        </PlayButtonWrapper>
        <DemoButton
          shadowColor="#1B4B82"
          frontColor="#2D7CD4"
          alt="left"
          icon={boldArrow}
          onClick={onMoveLeft}
          width="50"
          height="40"
          shadowHeight={10}
          disabled={isRunning}
          isFloating={shouldFloat}
          animationDelay={0.2}
        />
        <DemoButton
          shadowColor="#1B4B82"
          frontColor="#2D7CD4"
          alt="up"
          icon={boldArrow}
          onClick={onMoveUp}
          width="50"
          height="40"
          shadowHeight={10}
          disabled={isRunning}
          imageRotation={90}
          isFloating={shouldFloat}
          animationDelay={0.4}
        />
        <DemoButton
          shadowColor="#1B4B82"
          frontColor="#2D7CD4"
          alt="down"
          icon={boldArrow}
          onClick={onMoveDown}
          width="50"
          height="40"
          shadowHeight={10}
          disabled={isRunning}
          imageRotation={-90}
          isFloating={shouldFloat}
          animationDelay={0.6}
        />
        <DemoButton
          shadowColor="#1B4B82"
          frontColor="#2D7CD4"
          alt="right"
          icon={boldArrow}
          onClick={onMoveRight}
          width="50"
          height="40"
          shadowHeight={10}
          disabled={isRunning}
          imageRotation={180}
          isFloating={shouldFloat}
          animationDelay={0.8}
        />
      </ControlButtons>
    </ControlWrapper>
  );
}; 