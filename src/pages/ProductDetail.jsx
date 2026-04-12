import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, Heart, ChevronLeft, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites } = useShop();

  const product = products.find(p => p.id === parseInt(id));
  const isFavorite = favorites.includes(product?.id);

  if (!product) return <div className="container flex-center">Producto no encontrado</div>;

  return (
    <div className="product-detail-page container fade-in">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} /> Volver
      </button>

      <div className="detail-grid">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="product-image-container glass"
        >
          <img src={product.image} alt={product.name} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="product-info"
        >
          <span className="category-tag">{product.category === 'male' ? 'HOMBRE' : 'MUJER'}</span>
          <h1>{product.name}</h1>
          <div className="rating">
            <Star size={16} fill="var(--primary)" color="var(--primary)" />
            <Star size={16} fill="var(--primary)" color="var(--primary)" />
            <Star size={16} fill="var(--primary)" color="var(--primary)" />
            <Star size={16} fill="var(--primary)" color="var(--primary)" />
            <Star size={16} fill="var(--primary-glow)" color="var(--primary)" />
            <span>(4.5 / 5)</span>
          </div>
          
          <p className="price-tag">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>
          
          <div className="features">
            {product.features.map((f, i) => (
              <span key={i} className="feature-pill glass">{f}</span>
            ))}
          </div>

          <div className="actions">
            <button className="add-cart-btn neon-border" onClick={() => addToCart(product)}>
              AGREGAR AL CARRITO <ShoppingCart size={20} />
            </button>
            <button 
              className={`favorite-btn glass ${isFavorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .product-detail-page {
          padding-top: 2rem;
          padding-bottom: 6rem;
        }
        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          color: var(--text-muted);
          font-weight: 700;
          margin-bottom: 2rem;
          transition: var(--transition-fast);
        }
        .back-btn:hover { color: var(--primary); }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        .product-image-container {
          border-radius: 20px;
          overflow: hidden;
          padding: 1rem;
        }
        .product-image-container img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        
        .category-tag {
          font-size: 0.8rem;
          font-weight: 900;
          color: var(--primary);
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
          display: block;
        }
        h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          line-height: 1.1;
        }
        .rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-bottom: 2rem;
        }
        .rating span {
          margin-left: 1rem;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .price-tag {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 2rem;
          color: var(--text-main);
        }
        .description {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          line-height: 1.8;
        }
        .features {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .feature-pill {
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
        }
        
        .actions {
          display: flex;
          gap: 1.5rem;
        }
        .add-cart-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          background: var(--bg-color);
          color: var(--primary);
          padding: 1.2rem;
          border-radius: 12px;
          font-weight: 900;
          letter-spacing: 0.1em;
          transition: var(--transition-fast);
        }
        .add-cart-btn:hover {
          background: var(--primary);
          color: var(--bg-color);
        }
        .favorite-btn {
          padding: 1rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }
        .favorite-btn.active { color: var(--primary); border-color: var(--primary); }
        .favorite-btn:hover { background: var(--border-color); }

        @media (max-width: 992px) {
          .detail-grid { grid-template-columns: 1fr; gap: 3rem; }
          h1 { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
