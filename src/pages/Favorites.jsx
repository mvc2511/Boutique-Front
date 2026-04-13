import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { products, favorites, loading } = useShop();

  const favoriteProducts = products.filter(p => favorites.includes(p._id || p.id));

  return (
    <div className="favorites-page container fade-in">
      <header className="catalog-header">
        <h1 className="section-title">TUS <span className="neon-text">FAVORITOS</span></h1>
      </header>

      {loading ? (
        <div className="no-results flex-center">
          <p>Cargando favoritos...</p>
        </div>
      ) : favoriteProducts.length > 0 ? (
        <div className="products-grid">
          {favoriteProducts.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="cart-empty flex-center fade-in">
          <Heart size={64} className="neon-text" />
          <h2>AÚN NO HAY FAVORITOS</h2>
          <p>Explora nuestro catálogo y marca con un corazón aquellos que más te apasionen.</p>
          <Link to="/catalog" className="btn-primary" style={{marginTop: '1.5rem', display: 'inline-block'}}>
            DESCUBRIR CATÁLOGO
          </Link>
        </div>
      )}

      <style jsx>{`
        .favorites-page {
          padding-bottom: 6rem;
        }
        .catalog-header {
          margin-bottom: 4rem;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 3rem;
        }
        .cart-empty {
          flex-direction: column;
          height: 50vh;
          gap: 1.5rem;
          text-align: center;
        }
        .cart-empty h2 { font-size: 2rem; }
        .cart-empty p { color: var(--text-muted); }
        .btn-primary {
          background: var(--primary);
          color: var(--bg-color);
          padding: 1rem 2.5rem;
          border-radius: 5px;
          font-weight: 800;
        }
        .btn-primary:hover {
          box-shadow: 0 0 15px var(--primary-glow);
        }
      `}</style>
    </div>
  );
};

export default Favorites;
