import React from 'react';
import { StyledButton, IconWrapper } from './styled';

export const ActionButton = ({ children, onClick, variant = 'primary', size, icon, ...props }) => {
  return (
    <StyledButton onClick={onClick} variant={variant} size={size} {...props}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  );
}; 