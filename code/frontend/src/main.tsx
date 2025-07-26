// src/main.tsx or main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Only here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
