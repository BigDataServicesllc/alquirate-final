// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
// ✅ 1. Importamos el BrowserRouter
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ✅ 2. Envolvemos toda la aplicación con el Router */}
    <BrowserRouter>
      {/* ✅ 3. Envolvemos toda la aplicación con el AuthProvider */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);