import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, total, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-brand-dark p-10 rounded-2xl border border-gray-800 inline-block shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-600 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-3xl font-extrabold text-white mb-4">Tu carro está vacío</h2>
          <p className="text-gray-400 mb-8">Parece que aún no has agregado productos.</p>
          <Link to="/" className="inline-block bg-brand-orange text-white px-8 py-3 rounded-md font-bold hover:bg-brand-orange-hover transition-colors shadow-lg shadow-brand-orange/20">
            Ir a Comprar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-brand-orange pl-4">Tu Carro de Compras</h1>
      <div className="bg-brand-dark shadow-2xl overflow-hidden sm:rounded-lg border border-gray-800">
        <ul className="divide-y divide-gray-800">
          {items.map((item) => (
            <li key={item.id} className="px-4 py-6 sm:px-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors">
              <div className="flex items-center">
                <div className="h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-700">
                  {item.product?.imageUrl ? (
                    <img className="h-full w-full object-cover" src={item.product.imageUrl} alt={item.product.name} />
                  ) : (
                    <div className="h-full w-full bg-gray-800 flex items-center justify-center text-xs text-gray-500">Sin Img</div>
                  )}
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-bold text-white">{item.product?.name}</h3>
                  <p className="text-sm text-brand-orange font-medium">${Number(item.product?.price).toLocaleString('es-CL')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-gray-700 rounded-md bg-brand-darker">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-white font-medium min-w-[2rem] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 hover:text-red-400 font-medium transition-colors p-2 hover:bg-red-900/20 rounded"
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-4 py-6 sm:px-6 bg-brand-darker border-t border-gray-800 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Total: <span className="text-brand-orange">${total.toLocaleString('es-CL')}</span>
          </div>
          <Link to="/checkout" className="bg-brand-orange text-white px-8 py-3 rounded-md font-bold hover:bg-brand-orange-hover transition-colors shadow-lg shadow-brand-orange/20">
            Ir a Pagar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
