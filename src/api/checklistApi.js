import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const getChecklist = (tripId) => API.get(`/checklist/${tripId}`);
export const addChecklistItem = (data) => API.post('/checklist', data);
export const toggleChecklistItem = (id) => API.patch(`/checklist/${id}`);
export const deleteChecklistItem = (id) => API.delete(`/checklist/${id}`);
export const resetChecklist = (tripId) => API.delete(`/checklist/reset/${tripId}`);
