import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';

const Catalog = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="catalog-page container fade-in">
      <header className="catalog-header">
        <h1 className="section-title">EL <span className="neon-text">CATÁLOGO</span></h1>
        
        <div className="controls glass">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Buscar prendas..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              Todo
            </button>
            <button 
              className={filter === 'male' ? 'active' : ''} 
              onClick={() => setFilter('male')}
            >
              Hombre
            </button>
            <button 
              className={filter === 'female' ? 'active' : ''} 
              onClick={() => setFilter('female')}
            >
              Mujer
            </button>
          </div>
        </div>
      </header>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results flex-center">
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .catalog-page {
          padding-bottom: 6rem;
        }
        .catalog-header {
          margin-bottom: 4rem;
        }
        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-radius: 15px;
          gap: 2rem;
        }
        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255,255,255,0.05);
          padding: 0.8rem 1.5rem;
          border-radius: 10px;
          border: 1px solid var(--border-color);
        }
        .search-box input {
          background: none;
          border: none;
          color: white;
          width: 100%;
          outline: none;
        }
        .filter-group {
          display: flex;
          gap: 1rem;
        }
        .filter-group button {
          background: rgba(255,255,255,0.05);
          color: var(--text-muted);
          padding: 0.8rem 1.5rem;
          border-radius: 10px;
          font-weight: 700;
          transition: var(--transition-fast);
        }
        .filter-group button.active {
          background: var(--primary);
          color: var(--bg-color);
          box-shadow: 0 0 15px var(--primary-glow);
        }
        .filter-group button:hover {
          color: white;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 3rem;
        }
        .no-results {
          grid-column: 1 / -1;
          height: 300px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .controls { flex-direction: column; align-items: stretch; }
          .filter-group { justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default Catalog;
