import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add interceptor to include token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDashboardTrips = () => API.get('/trips');
export const getStats = () => API.get('/trips/stats'); // Optional
