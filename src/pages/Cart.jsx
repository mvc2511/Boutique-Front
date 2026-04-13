import { useShop } from '../context/ShopContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, placeOrder, user } = useShop();
  const navigate = useNavigate();

  const exclusionCategories = ['shoes', 'calzado', 'zapatos'];
  const categoryStats = {};
  
  cart.forEach(item => {
    const cat = (item.category || 'unknown').toLowerCase();
    if (!categoryStats[cat]) categoryStats[cat] = { quantity: 0, subtotal: 0 };
    categoryStats[cat].quantity += item.quantity;
    categoryStats[cat].subtotal += (item.price * item.quantity);
  });

  let subtotal = 0;
  let wholesaleDiscount = 0;

  cart.forEach(item => {
    subtotal += (item.price * item.quantity);
  });

  Object.keys(categoryStats).forEach(cat => {
    if (!exclusionCategories.includes(cat) && categoryStats[cat].quantity > 10) {
      wholesaleDiscount += categoryStats[cat].subtotal * 0.25;
    }
  });

  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal - wholesaleDiscount + shipping;

  const handleCheckout = async () => {
    if (!user) {
      alert("Por favor inicia sesión para completar tu compra.");
      return;
    }
    try {
      await placeOrder();
      // Si todo va bien, placeOrder redirigirá a Stripe.
      // Ya no necesitamos navegar al dashboard aquí directamente.
    } catch (error) {
      alert("Hubo un problema al procesar el pago: " + error.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container cart-empty flex-center fade-in">
        <ShoppingBag size={64} className="neon-text" />
        <h2>TU CARRITO ESTÁ VACÍO</h2>
        <p>Parece que aún no has añadido nada a tu selección.</p>
        <Link to="/catalog" className="btn-primary">CONTINUAR COMPRANDO</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container fade-in">
      <h1 className="section-title">TU <span className="neon-text">CARRITO</span></h1>

      <div className="cart-grid">
        <div className="cart-items">
          {cart.map(item => (
            <motion.div 
              layout
              key={item._id || item.id} 
              className="cart-item glass"
            >
              <img src={item.images?.[0] || item.image || '/placeholder.png'} alt={item.name} />
              <div className="item-info">
                <h3>{item.name}</h3>
                {item.selectedSize && <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem'}}>Talla: {item.selectedSize}</p>}
                <p className="item-price">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </div>

        <aside className="cart-summary glass">
          <h2>RESUMEN</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {wholesaleDiscount > 0 && (
            <div className="summary-row" style={{ color: 'var(--primary)' }}>
              <span>Desc. Mayoreo (-25%)</span>
              <span>-${wholesaleDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>Envío</span>
            <span>{shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span className="neon-text">${total.toFixed(2)}</span>
          </div>
          
          <button className="checkout-btn" onClick={handleCheckout}>
            FINALIZAR COMPRA <ArrowRight size={20} />
          </button>
          
          <p className="promo-text">Envíos gratis en compras superiores a $100</p>
        </aside>
      </div>

      <style jsx>{`
        .cart-empty {
          flex-direction: column;
          height: 60vh;
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

        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 3rem;
          align-items: start;
        }
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 1.5rem;
          border-radius: 15px;
        }
        .cart-item img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
        }
        .item-info { flex: 1; }
        .item-info h3 { font-size: 1.1rem; margin-bottom: 0.3rem; }
        .item-price { color: var(--primary); font-weight: 800; }
        .remove-btn {
          background: none;
          color: var(--text-dim);
          transition: var(--transition-fast);
        }
        .remove-btn:hover { color: #ff4d4d; }

        .cart-summary {
          padding: 2.5rem;
          border-radius: 20px;
          position: sticky;
          top: 100px;
        }
        .cart-summary h2 { margin-bottom: 2rem; font-size: 1.5rem; }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .total {
          font-size: 1.4rem;
          font-weight: 900;
          margin-top: 1rem;
        }
        hr { border: none; border-top: 1px solid var(--border-color); margin: 1.5rem 0; }
        .checkout-btn {
          width: 100%;
          background: var(--text-main);
          color: var(--bg-color);
          padding: 1.2rem;
          border-radius: 8px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
          transition: var(--transition-fast);
        }
        .checkout-btn:hover {
          background: var(--primary);
          box-shadow: 0 0 20px var(--primary-glow);
        }
        .promo-text {
          font-size: 0.75rem;
          text-align: center;
          margin-top: 1.5rem;
          color: var(--text-dim);
        }

        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Cart;
