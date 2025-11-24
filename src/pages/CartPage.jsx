import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import formatCurrency from '../utils/formatCurrency';

const CartPage = () => {
  const { items, total, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-brand-dark border border-gray-800 rounded-3xl p-12 shadow-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 h-20 w-20 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-3xl font-extrabold text-white">Tu carro está vacío</h1>
          <p className="mt-4 text-gray-400">Comienza agregando tus productos favoritos y vuelve para finalizar la compra.</p>
          <Link to="/" className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-orange px-8 py-3 font-bold text-white shadow-lg hover:bg-brand-orange-hover transition">
            Explorar productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-widest text-gray-400">Resumen de compra</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Tu carro de compras</h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.id} className="flex flex-col sm:flex-row items-center sm:items-stretch rounded-2xl border border-gray-800 bg-brand-dark p-4 shadow-lg hover:border-brand-orange/40 transition">
              <div className="h-32 w-full sm:w-40 overflow-hidden rounded-xl bg-gray-900">
                {item.product?.imageUrl ? (
                  <img src={item.product.imageUrl} alt={item.product?.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">Sin imagen</div>
                )}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{item.product?.name}</h2>
                    <p className="text-sm text-gray-400">Stock disponible: {item.product?.stock ?? 0}</p>
                  </div>
                  <p className="text-lg font-bold text-brand-orange mt-2 sm:mt-0">{formatCurrency(item.product?.price)}</p>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex items-center rounded-full border border-gray-700 bg-brand-darker text-white">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-2 text-lg disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 text-sm font-semibold tracking-wide">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-2 text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="mt-3 sm:mt-0 text-sm text-red-400 hover:text-red-300"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="rounded-2xl border border-gray-800 bg-brand-dark p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white">Resumen</h2>
          <div className="mt-6 space-y-3 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Productos</span>
              <span>{items.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Despacho</span>
              <span className="text-green-400">Por calcular</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-white border-t border-gray-800 pt-4">
              <span>Total estimado</span>
              <span className="text-brand-orange">{formatCurrency(total)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-orange px-6 py-3 text-base font-semibold text-white shadow-brand-orange/30 shadow-lg hover:bg-brand-orange-hover transition"
          >
            Proceder al pago
          </Link>
          <p className="mt-3 text-xs text-gray-500">
            Podrás elegir método de envío y confirmar la dirección en el siguiente paso.
          </p>
        </aside>
      </div>
    </section>
  );
};

export default CartPage;
