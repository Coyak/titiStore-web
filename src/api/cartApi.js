import httpClient from './httpClient';

export const getCart = async () => {
  const response = await httpClient.get('/cart');
  return response.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await httpClient.post('/cart', { productId, quantity });
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await httpClient.put(`/cart/${productId}`, { quantity });
  return response.data;
};

export const removeCartItem = async (productId) => {
  const response = await httpClient.delete(`/cart/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await httpClient.delete('/cart');
  return response.data;
};
