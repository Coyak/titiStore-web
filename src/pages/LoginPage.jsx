import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-darker">
      <div className="max-w-md w-full space-y-8 bg-brand-dark p-8 rounded-2xl shadow-2xl border border-gray-800 animate-slide-up">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white">Bienvenido de vuelta</h2>
          <p className="mt-2 text-center text-sm text-gray-400">Ingresa a tu cuenta para continuar</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo Electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent focus:z-10 sm:text-sm transition-all"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent focus:z-10 sm:text-sm transition-all"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center bg-red-900/20 py-2 rounded">{error}</div>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-brand-orange hover:bg-brand-orange-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all transform hover:scale-[1.02]"
            >
              Ingresar
            </button>
          </div>
          <div className="text-center">
            <Link to="/register" className="text-sm text-brand-orange hover:text-brand-orange-hover transition-colors">
              ¿No tienes cuenta? Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
