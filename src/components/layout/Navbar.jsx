import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-brand-darker border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-brand-orange">titiStore</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-300 hover:text-brand-orange hover:border-brand-orange inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Inicio
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/cart" className="p-2 text-gray-300 hover:text-brand-orange relative transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-orange rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <div className="ml-4 flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-300">Hola, {user.name}</span>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-sm text-brand-orange hover:text-brand-orange-hover font-medium">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link to="/login" className="text-gray-300 hover:text-brand-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Ingresar
                  </Link>
                  <Link to="/register" className="bg-brand-orange text-white hover:bg-brand-orange-hover px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
