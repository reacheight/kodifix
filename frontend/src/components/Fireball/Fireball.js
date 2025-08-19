import React from 'react';
import { FireballProjectile } from './styled';

export const Fireball = ({ 
  startX, 
  startY, 
  endX, 
  endY,
  range
}) => {
  return (
    <FireballProjectile
      startX={startX}
      startY={startY}
      endX={endX}
      endY={endY}
      range={range}
    />
  );
};
