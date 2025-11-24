import httpClient from './httpClient';

export const getProducts = async (params) => {
  const response = await httpClient.get('/products', { params });
  return response.data;
};

export const getProduct = async (id) => {
  const response = await httpClient.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await httpClient.post('/products', data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await httpClient.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await httpClient.delete(`/products/${id}`);
  return response.data;
};
