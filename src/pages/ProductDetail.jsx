import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, Heart, ChevronLeft, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites, products } = useShop();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => (p._id || p.id).toString() === id);
  const isFavorite = favorites.includes(product?._id || product?.id);

  if (!product) return <div className="container flex-center">Producto no encontrado</div>;

  const sizes = product.attributes?.size || [];
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      alert("Por favor escoge una talla antes de añadir al carrito.");
      return;
    }
    const cartProduct = { ...product, quantity }; // Añade la cantidad elegida
    if (selectedSize) {
      cartProduct.selectedSize = selectedSize;
      // Añadimos la talla al ID para que sean items separados en el carrito
      cartProduct.cartId = `${product._id || product.id}_${selectedSize}`; 
    } else {
      cartProduct.cartId = product._id || product.id;
    }
    addToCart(cartProduct);
  };

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
          <img src={product.images?.[0] || product.image || '/placeholder.png'} alt={product.name} />
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
          
          {sizes.length > 0 && (
            <div className="size-selector">
              <p>SELECCIONA TALLA:</p>
              <div className="sizes">
                {sizes.map(size => (
                  <button 
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="features">
            {product.features?.map((f, i) => (
              <span key={i} className="feature-pill glass">{f}</span>
            ))}
          </div>

          <div className="quantity-selector">
            <p>CANTIDAD:</p>
            <div className="qty-controls">
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                disabled={isOutOfStock}
              >-</button>
              <span>{quantity}</span>
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))} 
                disabled={isOutOfStock}
              >+</button>
            </div>
          </div>

          <div className="actions">
            <button 
              className="add-cart-btn neon-border" 
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              style={{ opacity: isOutOfStock ? 0.5 : 1, cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
            >
              {isOutOfStock ? "AGOTADO" : "AGREGAR AL CARRITO"} <ShoppingCart size={20} />
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

        .size-selector { margin-bottom: 2rem; }
        .size-selector p { font-size: 0.85rem; font-weight: 800; letter-spacing: 0.1em; color: var(--text-dim); margin-bottom: 0.8rem; }
        .sizes { display: flex; gap: 0.8rem; flex-wrap: wrap; }
        .size-btn { 
          background: rgba(255,255,255,0.05); 
          border: 1px solid var(--border-color); 
          color: var(--text-main); 
          padding: 0.8rem 1.5rem; 
          border-radius: 8px; 
          font-weight: 700; 
          transition: var(--transition-fast);
        }
        .size-btn:hover { background: rgba(255,255,255,0.1); }
        .size-btn.active { 
          background: var(--primary); 
          color: var(--bg-color); 
          border-color: var(--primary); 
          box-shadow: 0 0 15px var(--primary-glow); 
        }
        
        .quantity-selector { margin-bottom: 2.5rem; }
        .quantity-selector p { font-size: 0.85rem; font-weight: 800; letter-spacing: 0.1em; color: var(--text-dim); margin-bottom: 0.8rem; }
        .qty-controls {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: rgba(255,255,255,0.05);
          display: inline-flex;
          padding: 0.5rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }
        .qty-controls span {
          font-weight: 800;
          font-size: 1.2rem;
          min-width: 2rem;
          text-align: center;
        }
        .qty-btn {
          background: none;
          color: var(--text-main);
          font-size: 1.5rem;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          transition: var(--transition-fast);
        }
        .qty-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.1);
        }
        .qty-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
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
