import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const getCities = () => API.get('/cities');
export const searchCities = (q) => API.get(`/cities/search?q=${q}`);
