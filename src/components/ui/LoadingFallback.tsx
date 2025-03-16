import React from 'react';

// Componente de carregamento
export const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="animate-spin h-10 w-10 rounded-full border-t-2 border-b-2 border-primary"></div>
  </div>
); 