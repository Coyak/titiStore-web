import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../api/orderApi';
import formatCurrency from '../../utils/formatCurrency';

const statusLabel = {
  pending: 'Pendiente',
  paid: 'Pagado',
  failed: 'Fallido',
  cancelled: 'Cancelado',
};

const statusClass = {
  pending: 'bg-yellow-900/30 text-yellow-300',
  paid: 'bg-green-900/30 text-green-300',
  failed: 'bg-red-900/30 text-red-300',
  cancelled: 'bg-gray-700 text-gray-200',
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('No se pudieron obtener las órdenes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('No se pudo actualizar el estado de la orden', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-brand-orange">Cargando...</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400">Operaciones</p>
        <h1 className="text-3xl font-bold text-white border-l-4 border-brand-orange pl-4 mt-2">Gestión de órdenes</h1>
      </div>

      <div className="rounded-3xl border border-gray-800 bg-brand-dark shadow-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-brand-darker">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Orden</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Actualizar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 text-sm text-gray-300">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-white">{order.user?.name}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-brand-orange">{formatCurrency(order.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[order.status] || 'bg-gray-700 text-gray-200'}`}>
                      {statusLabel[order.status] || order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="w-full rounded-xl border border-gray-700 bg-brand-darker px-3 py-2 text-sm text-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="paid">Pagado</option>
                      <option value="failed">Fallido</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminOrdersPage;
