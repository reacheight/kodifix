import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Level } from './components/Level/Level';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/level/:id',
    element: <Level />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
