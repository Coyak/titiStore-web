import { Link } from 'react-router-dom';

const CheckoutSuccessPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-900/30 mb-6 animate-fade-in">
        <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-4">¡Pedido Realizado con Éxito!</h2>
      <p className="text-gray-400 mb-8 text-lg">Gracias por tu compra. Hemos recibido tu orden correctamente.</p>
      <Link to="/" className="inline-block bg-brand-orange text-white px-8 py-3 rounded-md font-bold hover:bg-brand-orange-hover transition-colors shadow-lg shadow-brand-orange/20">
        Seguir Comprando
      </Link>
    </div>
  );
};

export default CheckoutSuccessPage;
