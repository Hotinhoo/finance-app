import React from 'react';

// Error boundary com foco na depuração
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Erro na renderização:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background text-foreground">
          <h1 className="text-2xl font-bold mb-4">Erro no carregamento</h1>
          <p className="text-xl mb-4">Ocorreu um erro ao renderizar a aplicação.</p>
          <pre className="bg-muted p-4 rounded overflow-auto max-w-full max-h-64">
            {this.state.error?.toString()}
          </pre>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 