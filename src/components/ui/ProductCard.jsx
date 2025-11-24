import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-brand-dark rounded-xl shadow-lg overflow-hidden hover:shadow-brand-orange/20 transition-all duration-300 border border-gray-800 group">
      <div className="relative">
        <img 
          className="h-48 w-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
          src={product.imageUrl || "https://images.unsplash.com/photo-1511376768163-246c6b1d25e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
          alt={product.name} 
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white truncate" title={product.name}>{product.name}</h3>
          <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold px-2 py-1 rounded-full">
            ${Number(product.price).toLocaleString('es-CL')}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">{product.shortDescription}</p>
        <div className="flex justify-between items-center mt-4">
          <Link 
            to={`/products/${product.id}`} 
            className="text-sm text-gray-300 hover:text-brand-orange font-medium transition-colors"
          >
            Ver Detalles
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="bg-brand-orange text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-orange-hover transform active:scale-95 transition-all shadow-lg shadow-brand-orange/20"
          >
            Agregar al Carro
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
