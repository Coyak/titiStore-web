import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useCategories } from '../../context/CategoryContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { categories } = useCategories();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMobileOpen(false);
    setShowCategories(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderCategoryLinks = (className = 'block px-4 py-2 text-sm text-gray-200 hover:bg-brand-dark hover:text-white rounded-lg transition') =>
    categories.map((category) => (
      <Link
        key={category.id}
        to={`/categorias/${category.slug}`}
        className={className}
      >
        {category.name}
      </Link>
    ));

  return (
    <nav className="bg-brand-darker/90 backdrop-blur border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-2xl font-extrabold text-white tracking-tight">
              <span className="text-brand-orange">titi</span>Store
            </Link>
            <div className="hidden md:flex items-center space-x-4 text-sm font-semibold text-gray-300">
              <Link to="/" className="px-3 py-2 rounded-md hover:text-white hover:bg-brand-dark transition">
                Inicio
              </Link>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategories((prev) => !prev)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md hover:text-white hover:bg-brand-dark transition"
                >
                  <span>Categorías</span>
                  <svg className={`h-4 w-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showCategories && (
                  <div className="absolute left-0 mt-3 w-64 rounded-2xl border border-gray-800 bg-brand-darker p-4 shadow-2xl">
                    <p className="pb-2 text-xs uppercase tracking-widest text-gray-500">Explorar</p>
                    <div className="space-y-1 max-h-72 overflow-y-auto">
                      {categories.length > 0 ? renderCategoryLinks() : (
                        <span className="text-gray-400 text-sm">Sin categorías activas</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Link to="/contacto" className="px-3 py-2 rounded-md hover:text-white hover:bg-brand-dark transition">
                Contacto
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/cart" className="relative rounded-full p-2 text-gray-200 hover:bg-brand-dark hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-orange px-1 text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-300">
                <span>Hola, <span className="text-white font-semibold">{user.name}</span></span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="rounded-full border border-brand-orange/40 px-3 py-1 text-brand-orange hover:bg-brand-orange hover:text-white transition">
                    Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition">Salir</button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 text-sm font-semibold">
                <Link to="/login" className="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-brand-dark transition">Ingresar</Link>
                <Link to="/register" className="px-3 py-2 rounded-md bg-brand-orange text-white hover:bg-brand-orange-hover transition">Crear cuenta</Link>
              </div>
            )}

            <button
              className="md:hidden rounded-md p-2 text-gray-200 hover:bg-brand-dark focus:outline-none"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-800 bg-brand-darker px-4 pb-6 pt-4 space-y-4">
          <Link to="/" className="block rounded-md px-3 py-2 text-gray-200 hover:bg-brand-dark">Inicio</Link>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Categorías</p>
            <div className="space-y-2">
              {categories.length > 0 ? renderCategoryLinks('block px-3 py-2 rounded-md bg-brand-dark/40 text-gray-200') : (
                <span className="text-gray-400 text-sm">Sin categorías activas</span>
              )}
            </div>
          </div>
          <Link to="/contacto" className="block rounded-md px-3 py-2 text-gray-200 hover:bg-brand-dark">Contacto</Link>
          {user ? (
            <div className="space-y-3">
              {user.role === 'admin' && (
                <Link to="/admin" className="block rounded-md border border-brand-orange/40 px-3 py-2 text-brand-orange text-center">
                  Panel de administración
                </Link>
              )}
              <button onClick={handleLogout} className="w-full rounded-md bg-gray-800 px-3 py-2 text-center text-gray-200">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link to="/login" className="rounded-md bg-gray-800 px-3 py-2 text-center text-gray-200">Ingresar</Link>
              <Link to="/register" className="rounded-md bg-brand-orange px-3 py-2 text-center text-white">Crear cuenta</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
