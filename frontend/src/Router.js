import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { Level } from './components/Level/Level';
import React from 'react';
import { YandexCallback } from './components/YandexCallback/YandexCallback';
import { MainPage } from './components/MainPage/MainPage';
import { LandingPage } from './components/LandingPage/LandingPage';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/game',
    element: <MainPage />,
  },
  {
    path: '/ya_callback',
    element: <YandexCallback />
  },
  {
    path: '/:gameId/level/:id',
    element: <Level />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export const Router = () => <RouterProvider router={browserRouter} />;
