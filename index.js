import {createRoot} from 'react-dom/client';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './src/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 👇️ wrap App in Router

root.render(
  <Router>
    <App />
  </Router>
);

