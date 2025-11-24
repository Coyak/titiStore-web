import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { checkout } from '../api/orderApi';
import formatCurrency from '../utils/formatCurrency';

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
      await clearCart();
      navigate('/checkout/success');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Ocurrió un problema al procesar el pago.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-gray-300">
        No tienes productos en el carro.
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-gray-500">Paso final</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Confirmar pedido</h1>
        <p className="mt-3 text-gray-400">Revisa el resumen de tu compra y confirma el pago seguro.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-3xl border border-gray-800 bg-brand-dark shadow-2xl">
          <div className="border-b border-gray-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">Resumen de productos</h2>
          </div>
          <ul className="divide-y divide-gray-800">
            {items.map((item) => (
              <li key={item.id} className="px-6 py-4 flex items-center justify-between text-sm text-gray-300">
                <div>
                  <p className="font-semibold text-white">{item.product?.name}</p>
                  <span className="text-xs text-gray-400">Cantidad: {item.quantity}</span>
                </div>
                <p className="font-semibold text-brand-orange">
                  {formatCurrency(Number(item.product?.price) * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between px-6 py-5 border-t border-gray-800">
            <span className="text-lg text-gray-300">Total a pagar</span>
            <span className="text-2xl font-extrabold text-brand-orange">{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-brand-darker p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white">Método de pago</h2>
          <p className="mt-2 text-sm text-gray-400">
            Utilizamos un flujo simulado para confirmar el pedido. En una integración real se conectaría con Webpay u otro procesador.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-gray-700 bg-brand-dark p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Tarjeta bancaria</p>
                  <p className="text-xs text-gray-400">Pagos con débito, crédito y prepago</p>
                </div>
                <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">Simulado</span>
              </div>
            </div>
            <div className="rounded-xl border border-gray-700 bg-brand-dark p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Factura electrónica</p>
                  <p className="text-xs text-gray-400">Despacho de documento tributario en 24h</p>
                </div>
                <span className="rounded-full bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-300">Incluido</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/50 bg-red-900/20 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-brand-orange px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-orange/30 transition hover:bg-brand-orange-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Procesando pago...' : 'Confirmar y pagar'}
          </button>
          <p className="mt-3 text-xs text-gray-500 text-center">
            Al confirmar aceptas nuestras políticas de cambios y devoluciones.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
