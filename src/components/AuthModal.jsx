import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthModal = ({ close }) => {
  const { login } = useShop();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: formData.name || formData.email.split('@')[0], email: formData.email });
    close();
  };

  return (
    <div className="modal-overlay flex-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-modal glass"
      >
        <button className="close-btn" onClick={close}><X size={20}/></button>
        
        <h2 className="neon-text">{isLogin ? 'BIENVENIDO' : 'CREAR CUENTA'}</h2>
        <p className="subtitle">{isLogin ? 'Ingresa tus credenciales' : 'Únete a Ventura Boutique'}</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <User size={18} />
              <input 
                type="text" 
                placeholder="Nombre Completo" 
                required 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="input-group">
            <Mail size={18} />
            <input 
              type="email" 
              placeholder="Correo Electrónico" 
              required 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="input-group">
            <Lock size={18} />
            <input 
              type="password" 
              placeholder="Contraseña" 
              required 
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="submit-btn primary-glow">
            {isLogin ? 'ENTRAR' : 'REGISTRARSE'}
          </button>
        </form>

        <button className="google-btn">
          <img src="https://www.google.com/favicon.ico" alt="Google" />
          Continuar con Google
        </button>

        <p className="toggle-text">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} 
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ' Regístrate' : ' Inicia Sesión'}
          </span>
        </p>
      </motion.div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          z-index: 2000;
          backdrop-filter: blur(5px);
        }
        .auth-modal {
          width: 100%;
          max-width: 400px;
          padding: 3rem 2rem;
          position: relative;
          text-align: center;
          border-radius: 20px;
        }
        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          color: var(--text-muted);
        }
        h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
        }
        .subtitle {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .input-group {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 0.5rem 1rem;
          color: var(--text-muted);
        }
        .input-group input {
          background: none;
          border: none;
          color: white;
          width: 100%;
          padding: 0.5rem;
          outline: none;
        }
        .submit-btn {
          background: var(--primary);
          color: var(--bg-color);
          padding: 1rem;
          border-radius: 10px;
          font-weight: 800;
          margin-top: 1rem;
          transition: var(--transition-fast);
        }
        .submit-btn:hover {
          box-shadow: 0 0 20px var(--primary-glow);
          transform: translateY(-2px);
        }
        .google-btn {
          width: 100%;
          background: white;
          color: black;
          padding: 0.8rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        .toggle-text {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .toggle-text span {
          color: var(--primary);
          cursor: pointer;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
