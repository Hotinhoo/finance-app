import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import i18n from "@/i18n";
import { LanguageOption } from "@/contexts/AppSettingsContext";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Função para aplicar idioma
export function applyLanguage(language: LanguageOption): Promise<typeof i18n.t> {
  console.log(`Mudando idioma para: ${language}`);
  return i18n.changeLanguage(language);
}
