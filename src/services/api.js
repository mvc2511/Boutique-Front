import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token JWT a todas las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vc_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores globales (ej: token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si el backend devuelve 401, podríamos forzar el logout o refrescar el token
      localStorage.removeItem('vc_token');
      localStorage.removeItem('vc_user');
      // window.location.href = '/'; // Opcional: Redirigir al inicio
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getGoogleAuthUrl: () => {
    return `${import.meta.env.VITE_API_URL}/auth/google`;
  }
};

export const productService = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  getFavorites: async () => {
    const response = await api.get('/products/user/favorites');
    return response.data;
  },
  toggleFavorite: async (productId) => {
    const response = await api.post('/products/user/favorites/toggle', { productId });
    return response.data;
  }
};

export const orderService = {
  checkout: async (items) => {
    const response = await api.post('/orders/checkout', { items });
    return response.data; // Retorna la URL de la sesión de Stripe
  },
  getHistory: async () => {
    const response = await api.get('/orders/history');
    return response.data;
  }
};

export default api;
