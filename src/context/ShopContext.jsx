import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, productService, orderService } from '../services/api';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('vc_user')) || null);
  const [token, setToken] = useState(localStorage.getItem('vc_token') || null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('vc_cart')) || []);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('vc_favorites')) || []);
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('vc_orders')) || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Persistencia en LocalStorage
  useEffect(() => {
    if (user) localStorage.setItem('vc_user', JSON.stringify(user));
    else localStorage.removeItem('vc_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('vc_token', token);
    else localStorage.removeItem('vc_token');
  }, [token]);

  useEffect(() => {
    localStorage.setItem('vc_cart', JSON.stringify(cart));
  }, [cart]);

  // Cargar productos iniciales
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productService.getAll();
      setProducts(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Sincronizar favoritos si hay usuario
  useEffect(() => {
    const syncFavorites = async () => {
      if (token) {
        try {
          const res = await productService.getFavorites();
          setFavorites(res.data ? res.data.map(f => f._id || f.id) : []);
        } catch (err) {
          console.error('Error syncing favorites:', err);
        }
      }
    };
    syncFavorites();
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await authService.login(credentials);
      setUser(data.user);
      setToken(data.token);
      return data;
    } catch (err) {
      throw err.response?.data?.message || 'Error al iniciar sesión';
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await authService.register(userData);
      setUser(data.user);
      setToken(data.token);
      return data;
    } catch (err) {
      throw err.response?.data?.message || 'Error al registrarse';
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setFavorites([]);
    localStorage.removeItem('vc_token');
    localStorage.removeItem('vc_user');
  };

  const addToCart = (product) => {
    const cartId = product.cartId || (product._id || product.id);
    const qtyToAdd = product.quantity || 1; // Soporte para cantidades de sumatoria múltiple
    setCart(prev => {
      const exists = prev.find(item => item.id === cartId);
      if (exists) {
        return prev.map(item => item.id === cartId ? { ...item, quantity: item.quantity + qtyToAdd } : item);
      }
      return [...prev, { ...product, id: cartId, quantity: qtyToAdd }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = async (productId) => {
    if (!token) {
      // Si no hay login, manejo local básico (opcional, usuario pidió sync)
      setFavorites(prev => 
        prev.includes(productId) 
          ? prev.filter(id => id !== productId) 
          : [...prev, productId]
      );
      return;
    }

    try {
      await productService.toggleFavorite(productId);
      setFavorites(prev => 
        prev.includes(productId) 
          ? prev.filter(id => id !== productId) 
          : [...prev, productId]
      );
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;
    if (!token) {
      throw new Error('Debes iniciar sesión para comprar');
    }

    try {
      const { sessionUrl } = await orderService.checkout(cart);
      if (sessionUrl) {
        window.location.href = sessionUrl; // Redirigir a Stripe
      }
    } catch (err) {
      console.error('Error in checkout:', err);
      throw err;
    }
  };

  const fetchOrderHistory = async () => {
    if (!token) return;
    try {
      const response = await orderService.getHistory();
      setOrders(response.data || []);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  return (
    <ShopContext.Provider value={{
      user, token, login, register, logout, loading, error,
      products, fetchProducts,
      cart, addToCart, removeFromCart, clearCart,
      favorites, toggleFavorite,
      orders, placeOrder, fetchOrderHistory
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
