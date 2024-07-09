import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Level } from './components/Level/Level';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/level/:id',
    element: <Level />,
  },
  {
    path: '*',
    element: <Navigate to="/level/1" />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
