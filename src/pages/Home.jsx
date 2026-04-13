import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products, loading } = useShop();
  const featured = products.slice(0, 3);
  const heroProduct = products[2] || products[0];

  return (
    <div className="home-page fade-in">
      <section className="hero">
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <span className="badge-modern">NUEVA COLECCIÓN ATEMPORAL</span>
            <h1>ESTILO QUE <br/> <span className="neon-text">TRASCIENDE</span></h1>
            <p>Descubre la fusión perfecta entre funcionalidad tecnológica y moda juvenil. Elegancia curada por Ventura Castro.</p>
            <Link to="/catalog" className="cta-btn">
              Explorar Catálogo <ArrowRight size={20} />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hero-image"
          >
            <div className="hero-glow"></div>
            {heroProduct && <img src={heroProduct.images?.[0] || heroProduct.image || '/placeholder.png'} alt="Featured Fashion" />}
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="features-bar glass">
        <div className="container features-grid">
          <div className="feature-item">
            <Zap size={24} className="neon-text" />
            <div>
              <h3>Envío Rápido</h3>
              <p>Stock inmediato y envíos seguros.</p>
            </div>
          </div>
          <div className="feature-item">
            <Shield size={24} className="neon-text" />
            <div>
              <h3>Garantía Ventura</h3>
              <p>Calidad premium en cada hilo.</p>
            </div>
          </div>
          <div className="feature-item">
            <RotateCcw size={24} className="neon-text" />
            <div>
              <h3>Devolución Fácil</h3>
              <p>30 días para cambios sin costo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section container">
        <h2 className="section-title">LO MÁS <span className="neon-text">DESTACADO</span></h2>
        <div className="products-grid">
          {featured.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
        <div className="flex-center mt-4">
          <Link to="/catalog" className="text-link">Ver todo el catálogo</Link>
        </div>
      </section>

      <style jsx>{`
        .hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .badge-modern {
          background: var(--surface-color);
          padding: 0.5rem 1rem;
          border-radius: 5px;
          color: var(--primary);
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
          display: inline-block;
          border: 1px solid var(--primary-glow);
        }
        h1 {
          font-size: clamp(3rem, 8vw, 5rem);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: 900;
        }
        .hero-text p {
          font-size: 1.2rem;
          color: var(--text-muted);
          max-width: 500px;
          margin-bottom: 3rem;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: var(--text-main);
          color: var(--bg-color);
          padding: 1.2rem 2.5rem;
          border-radius: 5px;
          font-weight: 800;
          transition: var(--transition-fast);
        }
        .cta-btn:hover {
          background: var(--primary);
          box-shadow: 0 0 30px var(--primary-glow);
          transform: translateX(10px);
        }
        .hero-image {
          position: relative;
        }
        .hero-image img {
          width: 100%;
          border-radius: 20px;
          position: relative;
          z-index: 2;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .hero-glow {
          position: absolute;
          width: 120%;
          height: 120%;
          top: -10%;
          left: -10%;
          background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
          z-index: 1;
        }
        .features-bar {
          margin: 4rem 0;
          padding: 3rem 0;
          border-left: none;
          border-right: none;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .feature-item h3 { font-size: 1.1rem; }
        .feature-item p { font-size: 0.85rem; color: var(--text-muted); }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .mt-4 { margin-top: 4rem; }
        .text-link {
          color: var(--primary);
          font-weight: 800;
          text-decoration: underline;
        }

        @media (max-width: 992px) {
          .hero-content { grid-template-columns: 1fr; text-align: center; gap: 4rem; }
          .hero-text p { margin-left: auto; margin-right: auto; }
          .features-grid { grid-template-columns: 1fr; gap: 3rem; }
          .feature-item { justify-content: center; text-align: left; }
        }
      `}</style>
    </div>
  );
};

export default Home;
