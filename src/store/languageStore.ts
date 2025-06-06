import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { create } from 'zustand';

import en from '../i18n/locales/en';
import es from '../i18n/locales/es';

export const LANGUAGE_STORAGE_KEY = '@language';
export const DEFAULT_LANGUAGE = 'en';

export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
};

export const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  // @ts-ignore - compatibilityJSON es necesario para React Native pero el tipo no lo incluye correctamente
  resources: {
    [LANGUAGES.EN]: {
      translation: en,
    },
    [LANGUAGES.ES]: {
      translation: es,
    },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

interface LanguageState {
  language: string;
  isLoading: boolean;
  getStoredLanguage: () => Promise<string | null>;
  saveLanguage: (language: string) => Promise<void>;
  initializeLanguage: () => Promise<void>;
  changeLanguage: (lang: string) => Promise<void>;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: DEFAULT_LANGUAGE,
  isLoading: true,

  getStoredLanguage: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch (error) {
      console.error('Error al obtener el idioma guardado:', error);
      return null;
    }
  },

  saveLanguage: async (language: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error('Error al guardar el idioma:', error);
    }
  },

  initializeLanguage: async (): Promise<void> => {
    try {
      set({ isLoading: true });
      // Intentamos obtener el idioma guardado
      const savedLanguage = await get().getStoredLanguage();

      if (
        savedLanguage &&
        Object.values(LANGUAGES).includes(savedLanguage as any)
      ) {
        i18n.changeLanguage(savedLanguage);
        set({ language: savedLanguage, isLoading: false });
      } else {
        const deviceLanguage = Localization.locale.split('-')[0];

        const finalLanguage = Object.values(LANGUAGES).includes(
          deviceLanguage as any
        )
          ? deviceLanguage
          : DEFAULT_LANGUAGE;

        i18n.changeLanguage(finalLanguage);
        await get().saveLanguage(finalLanguage);
        set({ language: finalLanguage, isLoading: false });
      }
    } catch (error) {
      console.error('Error al inicializar el idioma:', error);
      set({ isLoading: false });
    }
  },

  changeLanguage: async (lang: string): Promise<void> => {
    if (Object.values(LANGUAGES).includes(lang as any)) {
      i18n.changeLanguage(lang);
      set({ language: lang });
      await get().saveLanguage(lang);
    }
  },
}));
