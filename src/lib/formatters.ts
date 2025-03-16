import { format, parseISO } from "date-fns";
import { ptBR, enUS, es, fr } from "date-fns/locale";

// Mapeamento de locales para date-fns
const locales = {
  "pt-br": ptBR,
  "en": enUS,
  "es": es,
  "fr": fr
};

// Mapeamento de formatos de data
const dateFormats = {
  "dd/mm/yyyy": "dd/MM/yyyy",
  "mm/dd/yyyy": "MM/dd/yyyy",
  "yyyy-mm-dd": "yyyy-MM-dd"
};

/**
 * Formata um número de acordo com as configurações do usuário
 * @param value Valor a ser formatado
 * @param decimals Número de casas decimais
 * @param format Formato (dot, comma, space)
 * @returns Número formatado como string
 */
export function formatNumber(
  value: number,
  decimals = 2,
  format?: "dot" | "comma" | "space"
): string {
  // Obtém o formato do atributo data-number-format no documento HTML
  // Ou usa o formato passado como parâmetro
  const numberFormat = format || 
    (document.documentElement.getAttribute("data-number-format") as "dot" | "comma" | "space") || 
    "dot";
    
  let thousandsSeparator = ".";
  let decimalSeparator = ",";

  // Define os separadores com base no formato
  switch (numberFormat) {
    case "dot":
      thousandsSeparator = ".";
      decimalSeparator = ",";
      break;
    case "comma":
      thousandsSeparator = ",";
      decimalSeparator = ".";
      break;
    case "space":
      thousandsSeparator = " ";
      decimalSeparator = ",";
      break;
  }

  // Divide o número em partes inteira e decimal
  const parts = value.toFixed(decimals).split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];
  
  // Formata a parte inteira com o separador de milhares
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  
  // Retorna o número formatado
  return `${formattedIntegerPart}${decimalSeparator}${decimalPart}`;
}

/**
 * Formata uma data de acordo com as configurações do usuário
 * @param date Data a ser formatada (string ISO ou objeto Date)
 * @param dateFormat Formato da data (dd/mm/yyyy, mm/dd/yyyy, yyyy-mm-dd)
 * @param language Idioma para a formatação
 * @returns Data formatada como string
 */
export function formatDate(
  date: string | Date,
  dateFormat?: "dd/mm/yyyy" | "mm/dd/yyyy" | "yyyy-mm-dd",
  language?: "pt-br" | "en" | "es" | "fr"
): string {
  // Obtém o formato do atributo data-date-format no documento HTML
  // Ou usa o formato passado como parâmetro
  const userDateFormat = dateFormat || 
    (document.documentElement.getAttribute("data-date-format") as "dd/mm/yyyy" | "mm/dd/yyyy" | "yyyy-mm-dd") || 
    "dd/mm/yyyy";
    
  // Obtém o idioma do atributo lang no documento HTML
  // Ou usa o idioma passado como parâmetro
  const userLanguage = language || 
    (document.documentElement.getAttribute("lang") as "pt-br" | "en" | "es" | "fr") || 
    "pt-br";
    
  // Converte para objeto Date se necessário
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  
  // Formata a data com base nas configurações
  return format(
    dateObj, 
    dateFormats[userDateFormat],
    { locale: locales[userLanguage] }
  );
} 