import React from 'react';

import { Wrapper, Name, Image } from './styled';

export const Lever = ({ x, y, name, enabled }) => (
  <Wrapper x={x} y={y}>
    <Image enabled={enabled} />
    <Name>{name}</Name>
  </Wrapper>
);
