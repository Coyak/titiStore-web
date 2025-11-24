import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api/productApi';
import { useCart } from '../context/CartContext';

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
        console.error('Failed to fetch product', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-brand-orange">Cargando producto...</div>;
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col-reverse">
          <div className="w-full aspect-w-1 aspect-h-1 bg-brand-dark rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3 border border-gray-800">
            <img
              src={product.imageUrl || "https://images.unsplash.com/photo-1511376768163-246c6b1d25e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
              alt={product.name}
              className="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">{product.name}</h1>

          <div className="mt-3">
            <h2 className="sr-only">Información del producto</h2>
            <p className="text-3xl text-brand-orange font-bold">${Number(product.price).toLocaleString('es-CL')}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Descripción</h3>
            <div className="text-base text-gray-300 space-y-6">
              <p>{product.shortDescription}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <h3 className="text-sm text-gray-400 font-medium mr-4">Stock:</h3>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
              </span>
            </div>
          </div>

          <div className="mt-10 flex sm:flex-col1">
            <div className="flex items-center mr-4">
               <label htmlFor="quantity" className="sr-only">Cantidad</label>
               <select
                 id="quantity"
                 name="quantity"
                 value={quantity}
                 onChange={(e) => setQuantity(Number(e.target.value))}
                 className="max-w-full rounded-md border border-gray-700 py-1.5 text-base leading-5 font-medium text-white text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange sm:text-sm bg-brand-dark"
               >
                 {[...Array(Math.min(10, product.stock)).keys()].map((i) => (
                   <option key={i + 1} value={i + 1}>{i + 1}</option>
                 ))}
               </select>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="max-w-xs flex-1 bg-brand-orange border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-brand-orange-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-orange sm:w-full disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-orange/20 transition-all"
            >
              {product.stock > 0 ? 'Agregar al Carro' : 'Agotado'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
