import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-brand-orange pl-4">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/products" className="bg-brand-dark p-6 rounded-xl border border-gray-800 hover:border-brand-orange transition-all group shadow-lg hover:shadow-brand-orange/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white group-hover:text-brand-orange transition-colors">Productos</h2>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 group-hover:text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-gray-400">Gestionar inventario, precios y detalles de productos.</p>
        </Link>

        <Link to="/admin/orders" className="bg-brand-dark p-6 rounded-xl border border-gray-800 hover:border-brand-orange transition-all group shadow-lg hover:shadow-brand-orange/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white group-hover:text-brand-orange transition-colors">Órdenes</h2>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 group-hover:text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <p className="text-gray-400">Ver y actualizar el estado de los pedidos de los clientes.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
