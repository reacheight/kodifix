import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Level from './Level';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Level id={2} />
  </React.StrictMode>
);
