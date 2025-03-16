import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './App';
import './styles/globals.css';

try {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Elemento root não encontrado no DOM');
  }
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </React.StrictMode>
  );
} catch (err) {
  console.error("Erro fatal na inicialização:", err);
  document.body.innerHTML = `
    <div style="display: flex; height: 100vh; align-items: center; justify-content: center; font-family: sans-serif; flex-direction: column; padding: 20px;">
      <h1 style="margin-bottom: 20px; color: red;">Erro crítico de inicialização</h1>
      <p>Ocorreu um erro grave ao iniciar a aplicação.</p>
      <pre style="background: #f1f1f1; padding: 15px; margin: 20px 0; max-width: 100%; overflow: auto;">${err}</pre>
      <button onclick="window.location.reload()" style="padding: 10px 15px; background: #4c6ef5; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Recarregar página
      </button>
    </div>
  `;
}
