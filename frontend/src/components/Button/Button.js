import React from 'react';
import { Wrapper, ButtonFront, ButtonTop } from './styled';

export const Button = ({
  topColor,
  frontColor,
  icon,
  alt,
  onClick,
  disabled,
  children,
  width,
  height,
}) => (
  <Wrapper disabled={disabled} onClick={onClick}>
    <ButtonTop width={width} color={disabled ? '#626763' : topColor} />
    <ButtonFront
      width={width}
      height={height}
      color={disabled ? '#858A86' : frontColor}
    >
      <img alt={alt} src={icon} />
      {children}
    </ButtonFront>
  </Wrapper>
);
