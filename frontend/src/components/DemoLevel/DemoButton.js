import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Button } from '../Button/Button';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const AnimatedWrapper = styled.div`
  ${({ isFloating, animationDelay }) =>
    isFloating &&
    css`
      animation: ${float} 2s ease-in-out infinite;
      animation-delay: ${animationDelay}s;
    `}
`;

export const DemoButton = ({ isFloating, animationDelay = 0, ...props }) => (
  <AnimatedWrapper isFloating={isFloating} animationDelay={animationDelay}>
    <Button {...props} />
  </AnimatedWrapper>
); 