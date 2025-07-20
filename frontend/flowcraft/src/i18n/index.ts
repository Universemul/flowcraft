import { en } from './translations/en';
import { fr } from './translations/fr';

export const translations = {
  en,
  fr,
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;