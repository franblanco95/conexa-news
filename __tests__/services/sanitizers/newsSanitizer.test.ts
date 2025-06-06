import { sanitizeNews } from '@/src/services/sanitizers/newsSanitizer';
import moment from 'moment';

// � Hacemos un mock completo y tipado de moment
jest.mock('moment', () => {
  const formatMock = jest.fn().mockReturnValue('01/01/2023');
  const momentMock = jest.fn(() => ({
    format: formatMock,
  }));

  // � Adjuntamos también el método `format` al constructor por si se accede así
  (momentMock as any).format = formatMock;

  return momentMock;
});

describe('NewsSanitizer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería dar formato a la fecha publishedAt', () => {
    const mockNewsData = {
      id: 1,
      title: 'Noticia de prueba',
      content: 'Contenido de prueba',
      publishedAt: '01/01/2023 12:00:00',
    };

    const result = sanitizeNews(mockNewsData);

    expect(moment).toHaveBeenCalledWith(
      '01/01/2023 12:00:00',
      'DD/MM/YYYY HH:mm:ss',
      true
    );

    expect(result).toEqual({
      ...mockNewsData,
      publishedAt: '01/01/2023',
    });
  });

  it('debería mantener el resto de propiedades sin cambios', () => {
    const mockNewsData = {
      id: 1,
      title: 'Noticia de prueba',
      content: 'Contenido de prueba',
      category: 'Tecnología',
      image: 'https://example.com/image.jpg',
      publishedAt: '01/01/2023 12:00:00',
    };

    const result = sanitizeNews(mockNewsData);

    expect(result.category).toBe('Tecnología');
    expect(result.image).toBe('https://example.com/image.jpg');
  });
});
