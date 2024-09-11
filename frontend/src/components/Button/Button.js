import React from 'react';
import { Wrapper, ButtonFront } from './styled';

export const Button = ({
  shadowColor,
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
    <ButtonFront
      width={width}
      height={height}
      color={disabled ? '#858A86' : frontColor}
      shadowColor={disabled ? '#626763' : shadowColor}
      disabled={disabled}
    >
      <img alt={alt} src={icon} />
      {children}
    </ButtonFront>
  </Wrapper>
);
