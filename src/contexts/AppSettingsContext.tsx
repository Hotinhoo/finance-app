import React, { createContext, useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { formatDate as formatDateUtil, formatNumber as formatNumberUtil } from "@/lib/formatters";
import { useTranslation } from "react-i18next";
import { applyLanguage } from "@/lib/utils";

// Tipos para as opções de configurações
export type LanguageOption = "pt-br" | "en" | "es" | "fr";
export type DateFormatOption = "dd/mm/yyyy" | "mm/dd/yyyy" | "yyyy-mm-dd";
export type ThemeOption = "light" | "dark" | "system";
export type NumberFormatOption = "dot" | "comma" | "space";

// Interface para as configurações do aplicativo
export interface AppSettings {
  language: LanguageOption;
  dateFormat: DateFormatOption;
  theme: ThemeOption;
  numberFormat: NumberFormatOption;
  compactView: boolean;
  animations: boolean;
}

// Definição das configurações padrão
const DEFAULT_SETTINGS: AppSettings = {
  language: "pt-br",
  dateFormat: "dd/mm/yyyy",
  theme: "light",
  numberFormat: "dot",
  compactView: false,
  animations: true
};

// Contexto para as configurações do aplicativo
export interface AppSettingsContextType {
  settings: AppSettings;
  tempSettings: AppSettings;
  updateTempSettings: (newSettings: Partial<AppSettings>) => void;
  saveSettings: () => void;
  formatNumber: (value: number, decimals?: number) => string;
  formatDate: (date: string | Date) => string;
}

// Criação do contexto
export const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

// Provedor para as configurações do aplicativo
export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  const { i18n } = useTranslation();
  
  const [settings, setSettings] = useState<AppSettings>(() => {
    // Carrega as configurações do localStorage se disponíveis
    try {
      const savedSettings = localStorage.getItem("app-settings");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (error) {
      console.error("Erro ao carregar configurações:", error);
    }
    return DEFAULT_SETTINGS;
  });

  // Estado temporário para armazenar configurações antes de salvar
  const [tempSettings, setTempSettings] = useState<AppSettings>(settings);

  // Atualiza o estado temporário quando as configurações reais mudam
  useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  // Aplicar configurações ao carregar o componente
  useEffect(() => {
    // Aplicar o tema
    if (settings.theme !== "system") {
      setTheme(settings.theme);
    }
    
    // Aplicar o idioma se for diferente do atual
    if (i18n.language !== settings.language) {
      applyLanguage(settings.language);
    }
    
    // Salvar configurações no localStorage
    localStorage.setItem("app-settings", JSON.stringify(settings));
  }, [settings, setTheme, i18n.language]);

  // Função para atualizar as configurações temporárias
  const updateTempSettings = (newSettings: Partial<AppSettings>) => {
    setTempSettings(prevSettings => {
      const updatedSettings = { ...prevSettings, ...newSettings };
      
      // Visualização em tempo real do tema
      if (newSettings.theme) {
        setTheme(newSettings.theme);
      }
      
      // Visualização em tempo real do idioma
      if (newSettings.language) {
        applyLanguage(newSettings.language);
      }
      
      return updatedSettings;
    });
  };

  // Função para salvar as configurações temporárias como definitivas
  const saveSettings = () => {
    setSettings(tempSettings);
  };

  // Funções de formatação adaptadas para usar as configurações atuais
  const formatNumber = (value: number, decimals = 2) => {
    return formatNumberUtil(value, decimals, settings.numberFormat);
  };

  const formatDate = (date: string | Date) => {
    return formatDateUtil(date, settings.dateFormat, settings.language);
  };

  return (
    <AppSettingsContext.Provider value={{ 
      settings, 
      tempSettings, 
      updateTempSettings, 
      saveSettings, 
      formatNumber, 
      formatDate 
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
} 