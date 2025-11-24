import { useState } from 'react';

const initialState = {
  nombre: '',
  correo: '',
  asunto: '',
  mensaje: '',
};

const ContactPage = () => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({
      type: 'success',
      message: 'Gracias por escribirnos. Te responderemos dentro de las próximas 24 horas hábiles.',
    });
    setForm(initialState);
  };

  return (
    <section className="bg-brand-darker text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand-orange font-semibold tracking-wide uppercase">Contáctanos</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold">Estamos aquí para ayudarte</h1>
          <p className="mt-4 text-lg text-gray-300">
            Escríbenos para coordinar compras corporativas, resolver dudas sobre productos o dar seguimiento a tus pedidos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-brand-dark rounded-2xl border border-gray-800 p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Atención Telefónica</h3>
            <p className="text-gray-300 mb-4">
              Lunes a viernes de 9:00 a 18:00 hrs. y sábados de 10:00 a 14:00 hrs.
            </p>
            <a href="tel:+56212345678" className="text-brand-orange font-semibold">+56 2 1234 5678</a>
          </div>
          <div className="bg-brand-dark rounded-2xl border border-gray-800 p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Correo Electrónico</h3>
            <p className="text-gray-300 mb-4">
              Escríbenos y recibirás respuesta dentro de un día hábil.
            </p>
            <a href="mailto:contacto@titistore.cl" className="text-brand-orange font-semibold">contacto@titistore.cl</a>
          </div>
          <div className="bg-brand-dark rounded-2xl border border-gray-800 p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Tienda Principal</h3>
            <p className="text-gray-300">
              Av. Providencia 1234, Santiago.
              <br />Atendemos retiro en tienda y demostraciones personalizadas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="bg-brand-dark rounded-2xl border border-gray-800 p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-1">Asunto</label>
              <input
                type="text"
                name="asunto"
                value={form.asunto}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-1">Mensaje</label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows="4"
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>

            {status.message && (
              <div className={`mt-6 rounded-lg px-4 py-3 text-sm ${status.type === 'success' ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-brand-orange px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-orange/20 transition hover:bg-brand-orange-hover"
            >
              Enviar mensaje
            </button>
          </form>

          <div className="bg-gradient-to-b from-brand-dark to-brand-darker rounded-2xl border border-gray-800 p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Horarios y canales de atención</h2>
              <p className="text-gray-300 mb-6">
                Tenemos un equipo especializado para asesorarte en compras personales y corporativas. También coordinamos instalaciones en terreno dentro de la Región Metropolitana.
              </p>
              <ul className="space-y-4 text-sm text-gray-300">
                <li>
                  <span className="text-white font-semibold block text-base">WhatsApp ventas:</span>
                  +56 9 2345 6789 (respuesta en horario hábil)
                </li>
                <li>
                  <span className="text-white font-semibold block text-base">Soporte post venta:</span>
                  soporte@titistore.cl
                </li>
                <li>
                  <span className="text-white font-semibold block text-base">Cobertura:</span>
                  Enviamos a todo Chile mediante Chilexpress y Starken con seguimiento en línea.
                </li>
              </ul>
            </div>
            <div className="mt-10 text-sm text-gray-400">
              <p>
                ¿Prefieres visitarnos? Agenda una demostración privada en nuestra sala de experiencia para probar los productos antes de comprar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
