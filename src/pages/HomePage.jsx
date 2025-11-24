import { useState, useEffect } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { getProducts } from '../api/productApi';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.data || []);
      } catch (err) {
        console.error('Failed to fetch products', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen text-brand-orange">Cargando productos...</div>;

  return (
    <div className="animate-fade-in">
      <div className="relative bg-brand-darker overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-brand-darker sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Tecnología de punta</span>{' '}
                  <span className="block text-brand-orange xl:inline">a tu alcance</span>
                </h1>
                <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Encuentra los mejores gadgets, smartphones y accesorios en titiStore. Calidad garantizada y envíos a todo Chile.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#products"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-orange hover:bg-brand-orange-hover md:py-4 md:text-lg transition-colors"
                    >
                      Ver Productos
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-800">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-60"
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Tech Setup"
          />
        </div>
      </div>

      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-white mb-8 border-l-4 border-brand-orange pl-4">Últimos Lanzamientos</h2>
        {error && <div className="text-red-500 mb-4">Error: {error}</div>}
        <div className="text-gray-400 mb-4">Productos encontrados: {products.length}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
