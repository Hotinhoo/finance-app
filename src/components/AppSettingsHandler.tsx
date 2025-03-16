import { useEffect } from "react";
import { useAppSettings } from "@/contexts/hooks/useAppSettings";
import { useTranslation } from 'react-i18next';

export function AppSettingsHandler() {
  // Hooks precisam estar no nível superior, fora de condicionais
  const { settings } = useAppSettings();
  const { i18n } = useTranslation();

  useEffect(() => {
    try {
      // Aplicar configurações ao documento HTML
      const html = document.documentElement;
      
      // Aplicar configurações de visualização
      if (settings.compactView) {
        html.classList.add("compact-view");
      } else {
        html.classList.remove("compact-view");
      }

      // Aplicar configurações de animação
      if (!settings.animations) {
        html.classList.add("no-animations");
      } else {
        html.classList.remove("no-animations");
      }

      // Aplicar formato de número
      html.setAttribute("data-number-format", settings.numberFormat);
      
      // Aplicar formato de data
      html.setAttribute("data-date-format", settings.dateFormat);

      // Aplicar idioma ao elemento HTML
      html.setAttribute("lang", settings.language);

      // Garantir que o idioma está correto
      if (i18n.language !== settings.language) {
        i18n.changeLanguage(settings.language);
      }
    } catch (err) {
      console.error("Erro ao aplicar configurações:", err);
    }
  }, [settings, i18n]);

  // Este componente não renderiza nada
  return null;
} 