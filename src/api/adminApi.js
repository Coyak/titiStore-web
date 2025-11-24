import httpClient from './httpClient';

export const getUsers = async () => {
  const response = await httpClient.get('/admin/users');
  return response.data;
};

export const updateUserRole = async (id, role) => {
  const response = await httpClient.patch(`/admin/users/${id}/role`, { role });
  return response.data;
};
