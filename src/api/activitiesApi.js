import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const getActivities = (stopId) => API.get(`/activities?stopId=${stopId}`);
export const addActivity = (data) => API.post('/activities', data);
export const updateActivity = (id, data) => API.put(`/activities/${id}`, data);
export const deleteActivity = (id) => API.delete(`/activities/${id}`);
export const searchActivities = (query) => API.get(`/activities/search?${query}`);
