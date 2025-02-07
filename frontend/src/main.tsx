import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx'
import LoaderProvider from './context/LoaderContext.tsx'

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </AuthProvider>
  </StrictMode>,
)
