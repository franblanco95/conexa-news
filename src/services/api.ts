import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.org',
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    const contentType = response.headers['content-type'];
    if (!contentType?.includes('application/json')) {
      throw new Error('Formato de respuesta inválido');
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
