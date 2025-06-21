import React from 'react';
import { StyledButton } from './styled';

export const ActionButton = ({ children, onClick, variant = 'primary', size, ...props }) => {
  return (
    <StyledButton onClick={onClick} variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
}; 