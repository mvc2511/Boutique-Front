import { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('vc_user')) || null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('vc_cart')) || []);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('vc_favorites')) || []);
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('vc_orders')) || []);

  useEffect(() => {
    localStorage.setItem('vc_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vc_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vc_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('vc_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (userData) => {
    setUser({ ...userData, id: Date.now() });
  };

  const logout = () => {
    setUser(null);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: `VC-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      status: 'Procesando'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  return (
    <ShopContext.Provider value={{
      user, login, logout,
      cart, addToCart, removeFromCart, clearCart,
      favorites, toggleFavorite,
      orders, placeOrder
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
