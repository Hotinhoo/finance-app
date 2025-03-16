import React from 'react';

// Página inicial simples para teste
export const SimplePage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background text-foreground">
    <h1 className="text-4xl font-bold mb-4">Finances</h1>
    <p className="text-xl">Teste de carregamento</p>
    <div className="mt-8">
      <a href="/login" className="px-4 py-2 mr-2 bg-primary text-primary-foreground rounded">Login</a>
      <a href="/register" className="px-4 py-2 bg-secondary text-secondary-foreground rounded">Registro</a>
    </div>
  </div>
); 