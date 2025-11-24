import { Link } from 'react-router-dom';
import { useCategories } from '../../context/CategoryContext';

const Footer = () => {
  const { categories } = useCategories();
  const topCategories = categories.slice(0, 4);

  return (
    <footer className="bg-brand-darker border-t border-gray-800 pt-12 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="text-2xl font-extrabold text-white">
              <span className="text-brand-orange">titi</span>Store
            </Link>
            <p className="mt-4 text-sm">
              Tecnología de primer nivel, entregas rápidas a todo Chile y soporte cercano para cada compra.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Inicio</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition">Contacto</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Carro</Link></li>
              {topCategories[0] && (
                <li>
                  <Link to={`/categorias/${topCategories[0].slug}`} className="hover:text-white transition">
                    {topCategories[0].name}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">Categorías</h4>
            <ul className="space-y-2 text-sm">
              {topCategories.length === 0 && <li className="text-gray-500">Cargando...</li>}
              {topCategories.map((category) => (
                <li key={category.id}>
                  <Link to={`/categorias/${category.slug}`} className="hover:text-white transition">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">Contacto</h4>
            <p className="text-sm">
              Av. Providencia 1234, Santiago<br />
              +56 2 1234 5678<br />
              contacto@titistore.cl
            </p>
            <Link
              to="/contacto"
              className="mt-4 inline-flex items-center text-brand-orange font-semibold hover:text-brand-orange-hover transition"
            >
              Escríbenos
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} titiStore. Diseñado en Chile con amor por el equipo de ingeniería.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
