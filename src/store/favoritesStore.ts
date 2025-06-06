import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { News } from '../services/requests/newsService';

const FAVORITES_STORAGE_KEY = '@favorites';

interface FavoritesState {
  favorites: News[];
  favoritesIds: number[];
  isLoading: boolean;
  toggleFavorite: (news: News) => Promise<void>;
  isFavorite: (id: number) => boolean;
  removeFavorite: (id: number) => Promise<void>;
  loadFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  favoritesIds: [],
  isLoading: true,

  isFavorite: (id: number) => get().favoritesIds.includes(id),

  loadFavorites: async () => {
    try {
      set({ isLoading: true });
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites) as News[];
        const favoritesIds = favorites.map((fav) => fav.id);
        set({ favorites, favoritesIds, isLoading: false });
      } else {
        set({ favorites: [], favoritesIds: [], isLoading: false });
      }
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      set({ isLoading: false });
    }
  },

  toggleFavorite: async (news: News) => {
    const { favorites, favoritesIds } = get();
    const isCurrentlyFavorite = favoritesIds.includes(news.id);

    let newFavorites: News[];
    let newFavoritesIds: number[];

    if (isCurrentlyFavorite) {
      newFavorites = favorites.filter((fav) => fav.id !== news.id);
      newFavoritesIds = favoritesIds.filter((id) => id !== news.id);
    } else {
      newFavorites = [...favorites, news];
      newFavoritesIds = [...favoritesIds, news.id];
    }

    try {
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
      // Actualizar el estado
      set({ favorites: newFavorites, favoritesIds: newFavoritesIds });
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  },

  removeFavorite: async (id: number) => {
    const { favorites, favoritesIds } = get();
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    const newFavoritesIds = favoritesIds.filter((favId) => favId !== id);

    try {
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
      set({ favorites: newFavorites, favoritesIds: newFavoritesIds });
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
    }
  },
}));
