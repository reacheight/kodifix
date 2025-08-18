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
  shadowHeight,
  imageRotation,
  fontFamily = 'Nunito',
}) => (
  <Wrapper disabled={disabled} onClick={onClick}>
    <ButtonFront
      width={width}
      height={height}
      shadowHeight={shadowHeight ?? 15}
      color={disabled ? '#858A86' : frontColor}
      shadowColor={disabled ? '#626763' : shadowColor}
      disabled={disabled}
      fontFamily={fontFamily}
    >
      {icon ? (
        <img 
          alt={alt} 
          src={icon} 
          style={imageRotation ? { transform: `rotate(${imageRotation}deg)` } : undefined}
        />
      ) : alt}
      {children}
    </ButtonFront>
  </Wrapper>
);
