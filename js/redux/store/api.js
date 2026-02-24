import api from './apiClient';

export const fetchProtectedData = () => async () => {
  const response = await api.get('/protected-data');
  return response.data;
};