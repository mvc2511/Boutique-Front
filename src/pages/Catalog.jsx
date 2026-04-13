import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Loader2 } from 'lucide-react';

const Catalog = () => {
  const { products, loading, error } = useShop();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [sortOrder, setSortOrder] = useState('none');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');

  const availableSizes = [...new Set(products.flatMap(p => p.attributes?.size || []))];
  const availableColors = [...new Set(products.flatMap(p => p.attributes?.color || []))];

  let filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = selectedSize === 'all' || (p.attributes?.size || []).includes(selectedSize);
    const matchesColor = selectedColor === 'all' || (p.attributes?.color || []).includes(selectedColor);
    return matchesCategory && matchesSearch && matchesSize && matchesColor;
  });

  if (sortOrder === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="catalog-page container fade-in">
      <header className="catalog-header">
        <h1 className="section-title">EL <span className="neon-text">CATÁLOGO</span></h1>
        
        <div className="controls glass" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'stretch' }}>
          
          <div style={{ display: 'flex', gap: '2rem', width: '100%', flexWrap: 'wrap' }}>
            <div className="search-box" style={{ flex: '1', minWidth: '250px' }}>
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Buscar prendas..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group hide-scrollbar" style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
              <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Todo</button>
              <button className={filter === 'male' ? 'active' : ''} onClick={() => setFilter('male')}>Hombre</button>
              <button className={filter === 'female' ? 'active' : ''} onClick={() => setFilter('female')}>Mujer</button>
              <button className={filter === 'unisex' ? 'active' : ''} onClick={() => setFilter('unisex')}>Unisex</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <select className="glass-select" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
              <option value="none" style={{color: 'black'}}>Ordenar por Relevancia</option>
              <option value="price-asc" style={{color: 'black'}}>Precio: Menor a Mayor</option>
              <option value="price-desc" style={{color: 'black'}}>Precio: Mayor a Menor</option>
            </select>

            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              <select className="glass-select" value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                <option value="all" style={{color: 'black'}}>Cualquier Talla</option>
                {availableSizes.map(sz => <option key={sz} value={sz} style={{color: 'black'}}>{sz}</option>)}
              </select>

              <select className="glass-select" value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>
                <option value="all" style={{color: 'black'}}>Cualquier Color</option>
                {availableColors.map(clr => <option key={clr} value={clr} style={{color: 'black'}}>{clr}</option>)}
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="products-grid">
        {loading ? (
          <div className="no-results flex-center" style={{ flexDirection: 'column', gap: '1rem' }}>
            <Loader2 className="spin" size={40} color="var(--primary)" />
            <p>Descifrando catálogo...</p>
          </div>
        ) : error ? (
          <div className="no-results flex-center">
            <p className="error-msg" style={{ background: 'none' }}>{error}</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
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
          padding: 1.2rem 2rem;
          border-radius: 16px;
          gap: 2rem;
          margin-bottom: 4rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          backdrop-filter: blur(10px);
        }
        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 0.7rem 1.5rem;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          transition: var(--transition-fast);
        }
        .search-box:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 15px var(--primary-glow);
        }
        .search-box input {
          background: none;
          border: none;
          color: white;
          width: 100%;
          outline: none;
          font-size: 0.95rem;
        }
        .search-box input::placeholder {
          color: var(--text-dim);
        }
        .filter-group {
          display: flex;
          gap: 0.8rem;
        }
        .filter-group button {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: var(--transition-fast);
          border: 1px solid transparent;
        }
        .filter-group button:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
        .filter-group button.active {
          background: var(--primary);
          color: var(--bg-color);
          box-shadow: 0 0 20px var(--primary-glow);
          border-color: var(--primary);
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

        .glass-select {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          outline: none;
          font-family: inherit;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .glass-select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
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
