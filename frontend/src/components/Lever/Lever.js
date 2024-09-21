import React from 'react';

import { Wrapper, Name, Image } from './styled';

export const Lever = ({ x, y, name, enabled, hidden }) => (
  <Wrapper x={x} y={y}>
    <Image enabled={enabled} />
    {!hidden && <Name>{name}</Name>}
  </Wrapper>
);
