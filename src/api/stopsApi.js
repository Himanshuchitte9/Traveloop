import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const getStops = (tripId) => API.get(`/stops?tripId=${tripId}`);
export const addStop = (data) => API.post('/stops', data);
export const updateStop = (id, data) => API.put(`/stops/${id}`, data);
export const deleteStop = (id) => API.delete(`/stops/${id}`);
export const reorderStops = (data) => API.patch('/stops/reorder', data);
