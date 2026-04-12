import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart, toggleFavorite, favorites } = useShop();
  const isFavorite = favorites.includes(product.id);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="product-card glass"
    >
      <div className="card-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <button 
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="card-info">
        <div className="card-header">
          <span className="category">{product.category === 'male' ? 'Hombre' : 'Mujer'}</span>
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
        <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        
        <button className="add-btn" onClick={() => addToCart(product)}>
          Añadir al Carrito <ShoppingCart size={18} />
        </button>
      </div>

      <style jsx>{`
        .product-card {
          border-radius: 15px;
          overflow: hidden;
          transition: var(--transition-slow);
        }
        .card-image {
          position: relative;
          height: 350px;
          overflow: hidden;
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-slow);
        }
        .product-card:hover .card-image img {
          transform: scale(1.1);
        }
        .fav-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(5px);
          color: white;
          padding: 0.6rem;
          border-radius: 50%;
          transition: var(--transition-fast);
        }
        .fav-btn.active {
          color: var(--primary);
        }
        .fav-btn:hover {
          background: var(--primary);
          color: var(--bg-color);
        }
        .card-info {
          padding: 1.5rem;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        .category {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-dim);
          letter-spacing: 0.1em;
        }
        .price {
          color: var(--primary);
        }
        h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .add-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-main);
          padding: 0.8rem;
          border-radius: 8px;
          font-weight: 700;
          transition: var(--transition-fast);
        }
        .add-btn:hover {
          background: var(--primary);
          color: var(--bg-color);
          box-shadow: 0 0 15px var(--primary-glow);
        }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;
