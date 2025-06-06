import { useEffect } from 'react';
import { useFavoritesStore } from '../store/favoritesStore';
import { useLanguageStore } from '../store/languageStore';

export const useInitStores = () => {
  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);
  const initializeLanguage = useLanguageStore(
    (state) => state.initializeLanguage
  );

  useEffect(() => {
    loadFavorites();
    initializeLanguage();
  }, []);
};
