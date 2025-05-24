import React, { memo } from 'react';
import {
  GameMapCard,
  GameMapContainer,
  Map,
  Level
} from '../styled';
import { LEVEL_POSITIONS } from '../constants';

const LevelButton = memo(({ 
  level, 
  bottom, 
  left, 
  onClick, 
  completed, 
  current, 
  available 
}) => (
  <Level
    bottomPercent={bottom}
    leftPercent={left}
    onClick={() => onClick(level)}
    completed={completed}
    current={current}
    available={available}
    role="button"
    tabIndex={available ? 0 : -1}
    aria-label={`Уровень ${level}${completed ? ' (завершен)' : ''}${current ? ' (текущий)' : ''}${!available ? ' (недоступен)' : ''}`}
    aria-disabled={!available}
    onKeyDown={(e) => {
      if (available && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick(level);
      }
    }}
  />
));

LevelButton.displayName = 'LevelButton';

export const GameMap = memo(({ 
  mapRef,
  theoreticalDimensions,
  convertCoordinates,
  isLayoutReady,
  onLevelClick,
  isLevelCompleted,
  isLevelCurrent,
  isLevelAvailable
}) => {
  const renderLevel = (levelData) => {
    const { level, bottom, left } = levelData;
    const coordinates = convertCoordinates(bottom, left);

    return (
      <LevelButton
        key={level}
        level={level}
        bottom={coordinates.bottom}
        left={coordinates.left}
        onClick={onLevelClick}
        completed={isLevelCompleted(level)}
        current={isLevelCurrent(level)}
        available={isLevelAvailable(level)}
      />
    );
  };

  return (
    <GameMapCard>
      <GameMapContainer>
        <Map 
          ref={mapRef}
          width={`${theoreticalDimensions.width}px`} 
          height={`${theoreticalDimensions.height}px`}
          role="img"
          aria-label="Карта игровых уровней"
        >
          {LEVEL_POSITIONS.map(renderLevel)}
        </Map>
      </GameMapContainer>
    </GameMapCard>
  );
});

GameMap.displayName = 'GameMap'; 