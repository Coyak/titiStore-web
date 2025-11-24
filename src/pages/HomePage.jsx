import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { getProducts } from '../api/productApi';
import { useCategories } from '../context/CategoryContext';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categories } = useCategories();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ limit: 12 });
        setProducts(data.data || []);
      } catch (err) {
        console.error('No se pudieron cargar los productos', err);
        setError('No pudimos cargar los productos destacados.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-brand-orange text-lg">
        Cargando catálogo...
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden bg-brand-darker">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand-dark/60 to-transparent pointer-events-none hidden lg:block" />
          <img
            className="h-full w-full object-cover opacity-30"
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=80"
            alt="Setup tecnológico"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-orange">Tecnología chilena</p>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-white max-w-3xl">
            Gadgets premium con despacho a todo Chile
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            Smartphones, audio profesional y accesorios que llegan a tu puerta desde 48 horas.
            Garantía oficial y soporte local.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#products"
              className="inline-flex items-center rounded-full bg-brand-orange px-8 py-3 text-base font-semibold text-white shadow-lg shadow-brand-orange/40 hover:bg-brand-orange-hover transition"
            >
              Ver catálogo
            </a>
            <Link
              to="/contacto"
              className="inline-flex items-center rounded-full border border-gray-700 px-8 py-3 text-base font-semibold text-white hover:border-brand-orange transition"
            >
              Hablar con un asesor
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 text-gray-300 text-sm">
            <div>
              <p className="text-3xl font-extrabold text-white">24h</p>
              <span>Confirmación de despacho</span>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white">+500</p>
              <span>Clientes felices</span>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white">12</p>
              <span>Marcas oficiales</span>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white">100%</p>
              <span>Garantía chilena</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="products">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400">Novedades</p>
            <h2 className="text-3xl font-extrabold text-white mt-2">Lanzamientos destacados</h2>
            <p className="text-gray-400 mt-2">Seleccionamos los equipos más solicitados por nuestra comunidad.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                to={`/categorias/${cat.slug}`}
                className="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-200 hover:border-brand-orange hover:text-white transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {error && <div className="mt-6 rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3 text-red-200">{error}</div>}

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-brand-dark/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-white text-xl font-bold">Soporte local</h3>
            <p className="text-gray-400 mt-2">
              Centro de servicio en Santiago y red de técnicos certificados para regiones.
            </p>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold">Pagos seguros</h3>
            <p className="text-gray-400 mt-2">
              Integración con Webpay Plus, transferencia y pagos corporativos con factura.
            </p>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold">Despacho transparente</h3>
            <p className="text-gray-400 mt-2">
              Seguimiento en línea y notificaciones automáticas hasta que recibes tu compra.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
