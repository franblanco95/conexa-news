import NewsCard from '@/components/NewsCard';
import { useFavoritesStore } from '@/src/store/favoritesStore';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/src/store/favoritesStore', () => ({
  useFavoritesStore: jest.fn(),
}));

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('NewsCard', () => {
  const mockToggleFavorite = jest
    .fn()
    .mockImplementation(() => Promise.resolve());
  const mockIsFavorite = jest.fn();

  // Datos mock de una noticia
  const mockNews = {
    id: 1,
    title: 'Noticia de prueba',
    content: 'Contenido de prueba para la noticia',
    publishedAt: '01/01/2023',
    category: 'Tecnología',
    image: 'https://example.com/image.jpg',
    slug: 'noticia-prueba',
    url: 'https://example.com/news/1',
    status: 'published',
    thumbnail: 'https://example.com/thumbnail.jpg',
    updatedAt: '02/01/2023',
    userId: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      toggleFavorite: mockToggleFavorite,
      isFavorite: mockIsFavorite,
    });
  });

  it('debería renderizar correctamente una noticia', () => {
    // Configurar mockIsFavorite para devolver false (no es favorito)
    mockIsFavorite.mockReturnValue(false);

    // Renderizar el componente
    const { getByText } = render(<NewsCard news={mockNews} />);

    // Verificar que se muestra el título y contenido
    expect(getByText('Noticia de prueba')).toBeTruthy();
    expect(getByText('Contenido de prueba para la noticia')).toBeTruthy();

    // Verificar que se muestra la categoría y fecha
    expect(getByText('Tecnología')).toBeTruthy();
    expect(getByText('01/01/2023')).toBeTruthy();
  });

  it('debería recortar el título si es demasiado largo', () => {
    // Crear una noticia con un título muy largo
    const longTitleNews = {
      ...mockNews,
      title:
        'Este es un título extremadamente largo que debería ser recortado por el componente para una mejor visualización',
    };

    // Configurar mockIsFavorite para devolver false
    mockIsFavorite.mockReturnValue(false);

    // Renderizar el componente con el título largo
    const { queryByText } = render(<NewsCard news={longTitleNews} />);

    // Verificar que el título se ha recortado y termina con "..."
    expect(
      queryByText(/Este es un título extremadamente largo que/)
    ).toBeTruthy();
    expect(
      queryByText(
        /Este es un título extremadamente largo que debería ser recortado por el componente para una mejor visualización/
      )
    ).toBeFalsy();
  });

  it('debería llamar a toggleFavorite al hacer click en el botón de favorito', () => {
    // Configurar mockIsFavorite para devolver false
    mockIsFavorite.mockReturnValue(false);

    // Mockear e.preventDefault para evitar error
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    // Renderizar el componente
    const { getByTestId } = render(<NewsCard news={mockNews} />);

    // Simular click en el botón de favorito con evento mock
    fireEvent.press(getByTestId('favorite-button'), mockEvent);

    // Verificar que se llamó a toggleFavorite con la noticia
    expect(mockToggleFavorite).toHaveBeenCalled();
  });
});
