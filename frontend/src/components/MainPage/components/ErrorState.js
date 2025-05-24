import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
  padding: 20px;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  color: #e74c3c;
`;

const ErrorTitle = styled.h3`
  color: #e74c3c;
  margin: 0;
  font-size: 20px;
`;

const ErrorMessage = styled.p`
  color: #666;
  margin: 0;
  max-width: 400px;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background: #2980b9;
  }

  &:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`;

export const ErrorState = ({ 
  message = 'Произошла ошибка при загрузке данных', 
  onRetry 
}) => (
  <ErrorContainer role="alert">
    <ErrorIcon aria-hidden="true">⚠️</ErrorIcon>
    <ErrorTitle>Ошибка</ErrorTitle>
    <ErrorMessage>{message}</ErrorMessage>
    {onRetry && (
      <RetryButton onClick={onRetry}>
        Повторить попытку
      </RetryButton>
    )}
  </ErrorContainer>
); 