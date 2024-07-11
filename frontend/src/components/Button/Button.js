import React from 'react';
import { Wrapper, ButtonFront, ButtonTop } from './styled';

export const Button = ({
  topColor,
  frontColor,
  icon,
  alt,
  onClick,
  disabled,
}) => (
  <Wrapper disabled={disabled} onClick={onClick}>
    <ButtonTop color={disabled ? '#626763' : topColor} />
    <ButtonFront color={disabled ? '#858A86' : frontColor}>
      <img alt={alt} src={icon} />
    </ButtonFront>
  </Wrapper>
);
