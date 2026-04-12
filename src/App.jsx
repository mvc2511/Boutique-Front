import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import AuthModal from './components/AuthModal';
import { useState } from 'react';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <ShopProvider>
      <Router>
        <div className="app-container">
          <Navbar openAuth={() => setIsAuthOpen(true)} />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          {isAuthOpen && <AuthModal close={() => setIsAuthOpen(false)} />}
          <footer className="footer glass">
            <div className="container">
              <p>&copy; 2026 Ventura Boutique. Elegancia por Ventura Castro.</p>
              <div className="footer-links">
                <a href="#">Privacidad</a>
                <a href="#">Términos</a>
                <a href="#">Contacto</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
