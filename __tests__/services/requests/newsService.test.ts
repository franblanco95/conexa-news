import { getNews, getNewsDetail } from '@/src/services/requests/newsService';
import { sanitizeNews } from '@/src/services/sanitizers/newsSanitizer';
import axios from 'axios';

// Mock de sanitizador
jest.mock('@/src/services/sanitizers/newsSanitizer', () => ({
  sanitizeNews: jest.fn((data) => ({ ...data, sanitized: true })),
}));

// Mock de axios
jest.mock('axios', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
  };
  return {
    create: jest.fn(() => mockAxiosInstance),
  };
});

describe('NewsService', () => {
  // Obtener el mock de axios después de que se haya inicializado
  const axiosMock = axios.create();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getNews', () => {
    it('debería obtener la lista de noticias y sanitizar los datos', async () => {
      // Datos mock de respuesta
      const mockData = [
        { id: 1, title: 'Noticia 1', content: 'Contenido 1' },
        { id: 2, title: 'Noticia 2', content: 'Contenido 2' },
      ];

      // Configurar mock de axios
      (axiosMock.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      // Llamar a la función
      const result = await getNews();

      // Verificar que se llamó a axios con la URL correcta
      expect(axiosMock.get).toHaveBeenCalledWith('/posts');

      // Verificar que se llamó al sanitizador para cada elemento
      expect(sanitizeNews).toHaveBeenCalledTimes(2);

      // Verificar que el resultado tiene los datos sanitizados
      expect(result).toEqual([
        { id: 1, title: 'Noticia 1', content: 'Contenido 1', sanitized: true },
        { id: 2, title: 'Noticia 2', content: 'Contenido 2', sanitized: true },
      ]);
    });

    it('debería manejar errores correctamente', async () => {
      // Configurar mock para simular un error
      const error = new Error('Error al obtener noticias');
      (axiosMock.get as jest.Mock).mockRejectedValueOnce(error);

      // Verificar que la promesa es rechazada con el error
      await expect(getNews()).rejects.toThrow('Error al obtener noticias');
    });
  });

  describe('getNewsDetail', () => {
    it('debería obtener el detalle de una noticia', async () => {
      // Datos mock de respuesta
      const mockData = { id: 1, title: 'Noticia 1', content: 'Contenido 1' };

      // Configurar mock de axios
      (axiosMock.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      // Llamar a la función
      const result = await getNewsDetail('1');

      // Verificar que se llamó a axios con la URL correcta
      expect(axiosMock.get).toHaveBeenCalledWith('/posts/1');

      // Verificar que el resultado es el esperado
      expect(result).toEqual(mockData);
    });
  });
});
