import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api/productApi';
import { useCart } from '../context/CartContext';
import formatCurrency from '../utils/formatCurrency';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('No se pudo cargar el producto', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) {
    return <div className="flex h-[60vh] items-center justify-center text-brand-orange text-lg">Cargando producto...</div>;
  }

  if (!product) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-800 bg-brand-dark p-4">
          <img
            src={product.imageUrl || 'https://images.unsplash.com/photo-1511376768163-246c6b1d25e7?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">{product.category?.name || 'Categoría'}</p>
            <h1 className="mt-3 text-4xl font-extrabold text-white">{product.name}</h1>
            <p className="mt-4 text-2xl font-bold text-brand-orange">{formatCurrency(product.price)}</p>
            <p className="mt-6 text-gray-300 leading-relaxed">{product.shortDescription || 'Producto sin descripción detallada.'}</p>
            <div className="mt-6 flex items-center space-x-3 text-sm">
              <span className="rounded-full border border-gray-700 px-4 py-1 text-gray-300">
                Stock: {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
              </span>
              <span className="rounded-full border border-gray-700 px-4 py-1 text-gray-300">
                Despacho en 48h hábiles
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="text-sm font-semibold text-gray-400" htmlFor="quantity">
              Cantidad
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="rounded-2xl border border-gray-700 bg-brand-dark px-4 py-3 text-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
            >
              {[...Array(Math.min(10, Math.max(product.stock, 1))).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 rounded-2xl bg-brand-orange px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-orange/30 transition hover:bg-brand-orange-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {product.stock > 0 ? 'Agregar al carro' : 'Sin stock'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
