import React from 'react';
import { Router } from './Router';
import { UserProvider } from './contexts/UserContext';

export const App = () => {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
};
