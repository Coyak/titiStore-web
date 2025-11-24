import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/productApi';
import { getAllOrders } from '../../api/orderApi';
import { getUsers } from '../../api/adminApi';
import formatCurrency from '../../utils/formatCurrency';

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    products: 0,
    orders: 0,
    pendingOrders: 0,
    paidOrders: 0,
    cancelledOrders: 0,
    revenue: 0,
    users: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productRes, ordersRes, usersRes] = await Promise.all([
          getProducts(),
          getAllOrders(),
          getUsers(),
        ]);

        const orders = ordersRes || [];
        const revenue = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
        const pendingOrders = orders.filter((order) => order.status === 'pending').length;
        const paidOrders = orders.filter((order) => order.status === 'paid').length;
        const cancelledOrders = orders.filter((order) => order.status === 'cancelled').length;

        setMetrics({
          products: productRes.total || productRes.data?.length || 0,
          orders: orders.length,
          pendingOrders,
          paidOrders,
          cancelledOrders,
          revenue,
          users: usersRes.length || 0,
        });
      } catch (error) {
        console.error('Error al cargar los datos del panel', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="flex h-[60vh] items-center justify-center text-brand-orange">Preparando panel...</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-widest text-gray-400">Panel administrativo</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Resumen general</h1>
        <p className="text-gray-400 mt-2">Controla productos, órdenes y clientes desde una sola vista.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-800 bg-brand-dark p-6 shadow-lg">
          <p className="text-sm text-gray-400">Ventas del mes</p>
          <h2 className="mt-2 text-3xl font-extrabold text-white">{formatCurrency(metrics.revenue)}</h2>
          <p className="text-xs text-green-400 mt-2">+18% vs. mes anterior</p>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-brand-dark p-6 shadow-lg">
          <p className="text-sm text-gray-400">Órdenes procesadas</p>
          <h2 className="mt-2 text-3xl font-extrabold text-white">{metrics.orders}</h2>
          <p className="text-xs text-gray-500 mt-2">{metrics.pendingOrders} pendientes</p>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-brand-dark p-6 shadow-lg">
          <p className="text-sm text-gray-400">Productos activos</p>
          <h2 className="mt-2 text-3xl font-extrabold text-white">{metrics.products}</h2>
          <p className="text-xs text-gray-500 mt-2">Gestiona el catálogo completo</p>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-brand-dark p-6 shadow-lg">
          <p className="text-sm text-gray-400">Usuarios registrados</p>
          <h2 className="mt-2 text-3xl font-extrabold text-white">{metrics.users}</h2>
          <p className="text-xs text-gray-500 mt-2">Clientes y administradores activos</p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-800 bg-brand-dark p-6 shadow-2xl">
          <h3 className="text-xl font-semibold text-white mb-4">Accesos rápidos</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/admin/products" className="rounded-2xl border border-gray-700 bg-brand-darker p-4 hover:border-brand-orange transition">
              <p className="text-sm text-gray-400">Catálogo</p>
              <p className="text-lg font-bold text-white mt-2">Gestionar productos</p>
            </Link>
            <Link to="/admin/orders" className="rounded-2xl border border-gray-700 bg-brand-darker p-4 hover:border-brand-orange transition">
              <p className="text-sm text-gray-400">Logística</p>
              <p className="text-lg font-bold text-white mt-2">Órdenes y pagos</p>
            </Link>
            <Link to="/admin/products/new" className="rounded-2xl border border-gray-700 bg-brand-darker p-4 hover:border-brand-orange transition">
              <p className="text-sm text-gray-400">Nuevo ingreso</p>
              <p className="text-lg font-bold text-white mt-2">Crear producto</p>
            </Link>
            <Link to="/contacto" className="rounded-2xl border border-gray-700 bg-brand-darker p-4 hover:border-brand-orange transition">
              <p className="text-sm text-gray-400">Soporte</p>
              <p className="text-lg font-bold text-white mt-2">Contactar equipo</p>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-brand-dark p-6 shadow-2xl">
          <h3 className="text-xl font-semibold text-white mb-4">Estado de órdenes</h3>
          <div className="space-y-4">
            {['pending', 'paid', 'cancelled'].map((status) => {
              const total = metrics.orders || 1;
              const count =
                status === 'pending'
                  ? metrics.pendingOrders
                  : status === 'paid'
                  ? metrics.paidOrders
                  : metrics.cancelledOrders;
              const percent = Math.round((count / total) * 100);
              const label = status === 'pending' ? 'Pendientes' : status === 'paid' ? 'Pagadas' : 'Canceladas';
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>{label}</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-800">
                    <div
                      className={`h-full rounded-full ${
                        status === 'pending' ? 'bg-yellow-500' : status === 'paid' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
