import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthModal = ({ close }) => {
  const { login, register, loading } = useShop();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
      close();
    } catch (err) {
      setLocalError(err);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
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

        {localError && <p className="error-msg">{localError}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <User size={18} />
              <input 
                type="text" 
                placeholder="Nombre Completo" 
                required 
                value={formData.name}
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
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="input-group">
            <Lock size={18} />
            <input 
              type="password" 
              placeholder="Contraseña" 
              required 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="submit-btn primary-glow" disabled={loading}>
            {loading ? 'CARGANDO...' : (isLogin ? 'ENTRAR' : 'REGISTRARSE')}
          </button>
        </form>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img src="https://www.google.com/favicon.ico" alt="Google" />
          Continuar con Google
        </button>

        <p className="toggle-text">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} 
          <span onClick={() => {
            setIsLogin(!isLogin);
            setLocalError('');
          }}>
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
          background: rgba(0,0,0,0.85);
          z-index: 2000;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .auth-modal {
          width: 90%;
          max-width: 400px;
          padding: 3rem 2rem;
          position: relative;
          text-align: center;
          border-radius: 20px;
          box-shadow: 0 0 40px rgba(0,0,0,0.5);
        }
        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          color: var(--text-muted);
          transition: var(--transition-fast);
        }
        .close-btn:hover { color: white; }
        h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
        }
        .subtitle {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 2.5rem;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-bottom: 2rem;
        }
        .input-group {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.08);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 0.5rem 1.2rem;
          color: var(--primary);
        }
        .input-group input {
          background: none;
          border: none;
          color: white;
          width: 100%;
          padding: 0.8rem;
          outline: none;
          font-size: 1rem;
        }
        .input-group input::placeholder {
          color: #888;
        }
        .submit-btn {
          background: var(--primary);
          color: var(--bg-color);
          padding: 1.1rem;
          border-radius: 10px;
          font-weight: 800;
          margin-top: 0.5rem;
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
          padding: 0.9rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        .toggle-text {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .toggle-text span {
          color: var(--primary);
          cursor: pointer;
          font-weight: 700;
        }
        .error-msg {
          color: #ff4444;
          background: rgba(255, 68, 68, 0.1);
          padding: 0.8rem;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(255, 68, 68, 0.2);
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
