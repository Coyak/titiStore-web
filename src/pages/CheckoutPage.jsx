import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { checkout } from '../api/orderApi';

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      await checkout();
      await clearCart(); // Ensure cart is cleared locally too, though backend does it
      navigate('/checkout/success');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Falló el proceso de pago');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <div className="text-center py-10 text-white">Tu carro está vacío.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-brand-orange pl-4">Confirmar Pedido</h1>
      
      <div className="bg-brand-dark shadow-2xl overflow-hidden sm:rounded-lg border border-gray-800 mb-8">
        <div className="px-6 py-5 border-b border-gray-800">
          <h3 className="text-lg leading-6 font-medium text-white">Resumen de la Orden</h3>
        </div>
        <ul className="divide-y divide-gray-800">
          {items.map((item) => (
            <li key={item.id} className="px-6 py-4 flex justify-between items-center">
              <span className="text-gray-300">{item.product?.name} <span className="text-gray-500">x {item.quantity}</span></span>
              <span className="text-white font-medium">${(Number(item.product?.price) * item.quantity).toLocaleString('es-CL')}</span>
            </li>
          ))}
        </ul>
        <div className="px-6 py-5 bg-brand-darker flex justify-between font-bold text-xl text-white border-t border-gray-800">
          <span>Total a Pagar</span>
          <span className="text-brand-orange">${total.toLocaleString('es-CL')}</span>
        </div>
      </div>

      {error && <div className="text-red-500 mb-4 text-center bg-red-900/20 py-2 rounded">{error}</div>}

      <div className="flex justify-end">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-green-600 text-white px-8 py-3 rounded-md font-bold hover:bg-green-700 disabled:opacity-50 transition-colors shadow-lg shadow-green-600/20"
        >
          {loading ? 'Procesando...' : 'Confirmar y Pagar'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
