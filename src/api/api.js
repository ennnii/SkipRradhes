import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const joinQueue    = (data) => API.post('/queue/join', data);
export const getTicket    = (qr)   => API.get(`/queue/ticket/${qr}`);
export const getLiveQueue = (bizId) => API.get(`/business/${bizId}/queue`);
export const callTicket   = (id)   => API.put(`/business/ticket/${id}/call`);
export const blockTicket  = (id)   => API.put(`/business/ticket/${id}/block`);
export const login        = (data) => API.post('/auth/login', data);

export default API;