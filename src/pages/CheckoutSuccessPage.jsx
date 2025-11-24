import { Link } from 'react-router-dom';

const CheckoutSuccessPage = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="mx-auto h-24 w-24 rounded-full bg-green-900/30 flex items-center justify-center shadow-inner shadow-green-600/30">
        <svg className="h-12 w-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mt-6 text-4xl font-extrabold text-white">¡Pedido confirmado!</h1>
      <p className="mt-4 text-lg text-gray-400">
        Te enviamos los detalles a tu correo. Recibirás novedades del despacho dentro de las próximas horas hábiles.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center rounded-full bg-brand-orange px-8 py-3 font-semibold text-white shadow-lg hover:bg-brand-orange-hover transition"
      >
        Volver al catálogo
      </Link>
    </section>
  );
};

export default CheckoutSuccessPage;
