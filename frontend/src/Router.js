import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { Level } from './components/Level/Level';
import React from 'react';
import { MainMenu } from './components/MainMenu/MainMenu';
import { YandexCallback } from './components/YandexCallback/YandexCallback';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainMenu />,
  },
  {
    path: '/:gameId/level/:id',
    element: <Level />,
  },
  {
    path: '/ya_callback',
    element: <YandexCallback />
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export const Router = () => <RouterProvider router={browserRouter} />;
