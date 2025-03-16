import { useContext } from 'react';
import { AppSettingsContext } from '@/contexts/AppSettingsContext';

// Hook para usar as configurações do aplicativo
export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error("useAppSettings deve ser usado dentro de um AppSettingsProvider");
  }
  return context;
} 