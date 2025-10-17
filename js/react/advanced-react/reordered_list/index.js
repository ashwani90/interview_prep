import React from 'react';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import App from './App';
import './index.css';

// Required for react-beautiful-dnd
import { resetServerContext } from 'react-beautiful-dnd';

resetServerContext();

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);