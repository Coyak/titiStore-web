import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../api/orderApi';

const statusLabel = {
  pending: 'Pendiente',
  paid: 'Pagado',
  failed: 'Fallido',
  cancelled: 'Cancelado',
};

const statusClass = {
  pending: 'bg-yellow-900/30 text-yellow-400',
  paid: 'bg-green-900/30 text-green-400',
  failed: 'bg-red-900/30 text-red-400',
  cancelled: 'bg-gray-700 text-gray-300',
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
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64 text-brand-orange">Cargando...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-brand-orange pl-4">Gestión de órdenes</h1>

      <div className="bg-brand-dark shadow-2xl overflow-hidden sm:rounded-lg border border-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-brand-darker">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID Orden</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Usuario</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-brand-dark divide-y divide-gray-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{order.user?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-orange font-bold">${Number(order.totalAmount).toLocaleString('es-CL')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass[order.status] || 'bg-gray-700 text-gray-300'}`}>
                      {statusLabel[order.status] || order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm text-white"
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
    </div>
  );
};

export default AdminOrdersPage;
