import httpClient from './httpClient';

export const checkout = async () => {
  const response = await httpClient.post('/orders/checkout');
  return response.data;
};

export const getOrders = async () => {
  const response = await httpClient.get('/orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await httpClient.get(`/orders/${id}`);
  return response.data;
};

// Admin
export const getAllOrders = async () => {
  const response = await httpClient.get('/admin/orders');
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await httpClient.patch(`/admin/orders/${id}/status`, { status });
  return response.data;
};
