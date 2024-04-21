import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Level from './Level';
import LevelList from './LevelList';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/level/:id',
    element: <Level />
  },
  {
    path: '/',
    element: <LevelList />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
