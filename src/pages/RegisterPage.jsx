import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-brand-darker px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg rounded-3xl border border-gray-800 bg-brand-dark p-8 shadow-2xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-orange">Registro</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white">Crea tu cuenta</h1>
          <p className="mt-2 text-sm text-gray-400">Obtén beneficios exclusivos y seguimiento rápido de pedidos.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
              placeholder="Ej: Camila Pérez"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
              placeholder="tu@correo.cl"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/50 bg-red-900/20 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/30 transition hover:bg-brand-orange-hover"
          >
            Crear cuenta
          </button>

          <p className="text-center text-sm text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-semibold text-brand-orange hover:text-brand-orange-hover">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
