import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ openAuth }) => {
  const { cart, user } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="logo neon-text">
          VENTURA <span style={{ color: 'var(--primary)' }}>BOUTIQUE</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link to="/">Inicio</Link>
          <Link to="/catalog">Catálogo</Link>
        </div>

        <div className="nav-actions">
          <button className="nav-icon" onClick={() => navigate('/cart')}>
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          
          <button className="nav-icon" onClick={() => navigate('/dashboard')}>
            <Heart size={20} />
          </button>

          <button className="nav-icon profile-btn" onClick={user ? () => navigate('/dashboard') : openAuth}>
            <User size={20} />
            <span className="desktop-only">{user ? user.name : 'Ingresar'}</span>
          </button>

          <button className="mobile-only nav-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu glass"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            <Link to="/catalog" onClick={() => setIsMenuOpen(false)}>Catálogo</Link>
            <button onClick={() => { openAuth(); setIsMenuOpen(false); }}>Autenticación</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 1000;
          border-bottom: 1px solid var(--border-color);
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 0.1em;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-links a {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
        }
        .nav-links a:hover {
          color: var(--primary);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav-icon {
          background: none;
          color: var(--text-main);
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        .nav-icon:hover {
          color: var(--primary);
        }
        .badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--primary);
          color: var(--bg-color);
          font-size: 0.7rem;
          font-weight: 800;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .profile-btn {
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 30px;
          background: rgba(255,255,255,0.05);
        }
        .mobile-only { display: none; }
        .mobile-menu {
          position: absolute;
          top: 80px;
          left: 0;
          width: 100%;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: center;
        }
        @media (max-width: 768px) {
          .desktop-only { display: none; }
          .mobile-only { display: block; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
