import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { Level } from './components/Level/Level';
import React from 'react';
import { YandexCallback } from './components/YandexCallback/YandexCallback';
import { MainPage } from './components/MainPage/MainPage';
import { Module1 } from './components/Module1/Module1';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
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
    path: '/forest',
    element: <Module1 />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export const Router = () => <RouterProvider router={browserRouter} />;
