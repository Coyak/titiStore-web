import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import { getProducts } from '../api/productApi';
import ProductCard from '../components/ui/ProductCard';

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { categories, loadingCategories } = useCategories();
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const category = useMemo(
    () => categories.find((cat) => cat.slug === slug),
    [categories, slug]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      try {
        setLoadingProducts(true);
        const response = await getProducts({ categoryId: category.id, limit: 24 });
        setProducts(response.data || []);
        setError('');
      } catch (err) {
        console.error(err);
        setError('No pudimos cargar los productos de esta categoría.');
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    if (!loadingCategories && !category) {
      navigate('/');
    }
  }, [category, loadingCategories, navigate]);

  if (loadingCategories || !category) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-brand-orange text-lg">
        Cargando categoría...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10 text-center">
        <p className="text-brand-orange uppercase tracking-widest text-xs font-semibold">Categoría</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-white">{category.name}</h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Explora la selección curada de productos disponibles para {category.name.toLowerCase()}. Todos cuentan con despacho a nivel nacional.
        </p>
      </header>

      {error && <div className="mb-6 rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3 text-red-200">{error}</div>}

      {loadingProducts ? (
        <div className="flex items-center justify-center py-20 text-brand-orange">Preparando catálogo...</div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-gray-800 bg-brand-dark px-6 py-12 text-center text-gray-300">
          Aún no tenemos productos activos para esta categoría. Vuelve pronto.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryPage;
