import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { Level } from './components/Level/Level';
import React from 'react';

export const browserRouter = createBrowserRouter([
  {
    path: '/level/:id',
    element: <Level />,
  },
  {
    path: '*',
    element: <Navigate to="/level/1" />,
  },
]);

export const Router = () => <RouterProvider router={browserRouter} />;
