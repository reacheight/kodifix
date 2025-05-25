import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  font-family: 'Inter', sans-serif;
  color: #666;
  font-size: 16px;
  margin: 0;
`;

export const LoadingState = ({ message = 'Загрузка...' }) => (
  <LoadingContainer role="status" aria-live="polite">
    <Spinner aria-hidden="true" />
    <LoadingText>{message}</LoadingText>
  </LoadingContainer>
); 