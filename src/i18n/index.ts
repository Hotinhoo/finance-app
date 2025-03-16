import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importação direta dos arquivos de tradução
import ptBR from './locales/pt-br.json';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

// Inicialização simplificada do i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-br': {
        translation: ptBR
      },
      en: {
        translation: en
      },
      es: {
        translation: es
      },
      fr: {
        translation: fr
      }
    },
    lng: 'pt-br', // Idioma inicial
    fallbackLng: 'pt-br', // Idioma de fallback (se a tradução não existir)
    
    interpolation: {
      escapeValue: false // Não é necessário escapar em React
    },
    
    // Detectar idioma salvo no localStorage
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    },
    
    // Permite recarregar traduções sem recarregar a página
    react: {
      useSuspense: false
    }
  });

// Exportar para uso na aplicação
export default i18n; 