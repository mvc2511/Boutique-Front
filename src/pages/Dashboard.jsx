import { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { User, Package, Heart, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { user, logout, favorites, orders, products, fetchOrderHistory } = useShop();
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (user && activeTab === 'orders') {
      fetchOrderHistory();
    }
  }, [user, activeTab, fetchOrderHistory]);

  if (!user) {
    return (
      <div className="container flex-center fade-in" style={{ height: '70vh', flexDirection: 'column', gap: '2rem' }}>
        <h2 className="section-title">ACCESO <span className="neon-text">RESTRINGIDO</span></h2>
        <p>Por favor, inicia sesión para acceder a tu panel de control.</p>
      </div>
    );
  }

  const favoriteProducts = products.filter(p => favorites.includes(p._id || p.id));

  return (
    <div className="dashboard-page container fade-in">
      <header className="dashboard-header glass">
        <div className="user-profile">
          <div className="avatar flex-center">{user.name[0]}</div>
          <div>
            <h1>Hola, {user.name}</h1>
            <p className="email">{user.email}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={logout}>
          Cerrar Sesión <LogOut size={18} />
        </button>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-nav glass">
          <button 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}
          >
            <Package size={20} /> Pedidos
          </button>
          <button 
            className={activeTab === 'favorites' ? 'active' : ''} 
            onClick={() => setActiveTab('favorites')}
          >
            <Heart size={20} /> Favoritos
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''} 
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} /> Ajustes
          </button>
        </aside>

        <main className="dashboard-main">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-content"
              >
                <h2 className="neon-text">Historial de Pedidos</h2>
                {orders.length > 0 ? (
                  <div className="orders-list">
                    {orders.map(order => (
                      <div key={order.id} className="order-card glass">
                        <div className="order-header">
                          <span className="order-id">{order.id}</span>
                          <span className="order-date">{order.date}</span>
                        </div>
                        <div className="order-items">
                          {order.items.map((item, i) => (
                            <span key={i}>{item.name} (x{item.quantity})</span>
                          ))}
                        </div>
                        <div className="order-footer">
                          <span className="status">{order.status}</span>
                          <span className="total">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-msg">Aún no has realizado ningún pedido.</p>
                )}
              </motion.div>
            )}

            {activeTab === 'favorites' && (
              <motion.div 
                key="favorites"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-content"
              >
                <h2 className="neon-text">Mis Favoritos</h2>
                {favoriteProducts.length > 0 ? (
                  <div className="favorites-grid">
                    {favoriteProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p className="empty-msg">No tienes productos en favoritos.</p>
                )}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-content"
              >
                <h2 className="neon-text">Ajustes de Cuenta</h2>
                <div className="settings-form glass">
                  <div className="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" defaultValue={user.name} />
                  </div>
                  <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" defaultValue={user.email} />
                  </div>
                  <button className="save-btn">Guardar Cambios</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <style jsx>{`
        .dashboard-page { padding-bottom: 6rem; }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2.5rem;
          border-radius: 20px;
          margin-bottom: 3rem;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          border-radius: 50%;
          font-size: 2rem;
          font-weight: 900;
          color: white;
        }
        .user-profile h1 { font-size: 1.8rem; }
        .email { color: var(--text-muted); }
        .logout-btn {
          background: rgba(255,0,0,0.1);
          color: #ff4d4d;
          padding: 0.8rem 1.5rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-weight: 700;
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 4rem;
          align-items: start;
        }
        .dashboard-nav {
          padding: 1rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: sticky;
          top: 120px;
        }
        .dashboard-nav button {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          color: var(--text-muted);
          background: transparent;
          text-align: left;
          font-weight: 700;
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }
        .dashboard-nav button:hover:not(.active) {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }
        .dashboard-nav button.active {
          background: var(--primary);
          color: var(--bg-color);
          box-shadow: 0 0 15px var(--primary-glow);
        }
        
        .tab-content h2 { margin-bottom: 2rem; font-size: 1.8rem; }
        .empty-msg { color: var(--text-muted); margin-top: 2rem; }

        .orders-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .order-card { padding: 2rem; border-radius: 15px; }
        .order-header { display: flex; justify-content: space-between; margin-bottom: 1.5rem; font-weight: 800; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
        .order-items { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; color: var(--text-muted); font-size: 0.95rem; }
        .order-footer { display: flex; justify-content: space-between; align-items: center; }
        .status { color: var(--primary); font-weight: 800; text-transform: uppercase; font-size: 0.8rem; }
        .total { font-size: 1.2rem; font-weight: 900; }

        .favorites-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }

        .settings-form { padding: 3rem; border-radius: 20px; max-width: 500px; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.9rem; }
        .form-group input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); padding: 0.8rem; border-radius: 8px; color: white; outline: none; }
        .save-btn { background: var(--primary); color: var(--bg-color); padding: 1rem 2rem; border-radius: 8px; font-weight: 800; margin-top: 1rem; }

        @media (max-width: 900px) {
          .dashboard-content { grid-template-columns: 1fr; }
          .dashboard-nav { flex-direction: row; justify-content: center; flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
