import React, { useState, useEffect } from 'react';

import { Wrapper, Name, Image } from './styled';

const computeDirection = ({ y, heroY }) => (y >= heroY ? 'left' : 'right');

export const Enemy = ({ 
  x, 
  y, 
  heroX, 
  heroY, 
  name, 
  alive, 
  nameHidden, 
  spedUp, 
  isBig,
  shift
}) => {
  const [deathDirection, setDeathDirection] = useState(null);

  useEffect(() => {
    if (alive && deathDirection) {
      setDeathDirection(null);
    } else if (!alive) {
      setDeathDirection(computeDirection({ y, heroY }));
    }
  }, [alive]);

  const direction = deathDirection || computeDirection({ y, heroY });

  return (
    <Wrapper 
      x={x} 
      y={y} 
      heroX={heroX} 
      heroY={heroY} 
      nameHidden={nameHidden} 
      isBig={isBig} 
      shift={shift}
      spedUp={spedUp} 
    >
      {!nameHidden && <Name fade={!alive}>{name}</Name>}
      <Image x={x} y={y} heroX={heroX} heroY={heroY} direction={direction} alive={alive} spedUp={spedUp} />
    </Wrapper>
  );
};
