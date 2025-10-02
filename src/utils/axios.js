// utils/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: '', // relative to Next app
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res.data, // return data only
  (error) => {
    const status = error?.response?.status ?? 0;
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong';
    return Promise.reject({ status, message, code: error?.response?.data?.code });
  }
);

export default api;
