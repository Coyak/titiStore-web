import httpClient from './httpClient';

export const getCategories = async () => {
  const response = await httpClient.get('/categories');
  return response.data;
};
