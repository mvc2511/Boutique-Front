import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useShop();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Guardamos el token y forzamos un login con los datos del usuario (que el backend debería devolver o pediremos)
      // Por simplicidad, el backend redirige con el token. 
      // Podríamos hacer un fetch /auth/me para obtener el usuario completo.
      localStorage.setItem('vc_token', token);
      
      // Redirigir al home o dashboard
      window.location.href = '/'; 
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <div className="flex-center" style={{ height: '60vh' }}>
      <div className="text-center">
        <h2 className="neon-text">AUTENTICACIÓN EXITOSA</h2>
        <p>Sincronizando tu cuenta...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
