import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAllTrips = () => API.get('/trips');
export const deleteTrip = (id) => API.delete(`/trips/${id}`);
export const updateTrip = (id, data) => API.put(`/trips/${id}`, data);
export const createTrip = (data) => API.post('/trips', data);
