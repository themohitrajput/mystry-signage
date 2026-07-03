import axios from 'axios';

// Central Axios instance. baseURL comes from env so dev/staging/prod
// can point at different API hosts without code changes.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // send the httpOnly auth cookie automatically
});

// Attach bearer token as a fallback for environments where cookies
// aren't available (kept in sync with AuthContext).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ms_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalizes error messages so components can just read err.message
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.response?.data?.errors?.[0]?.message ||
      err.message ||
      'Something went wrong';
    return Promise.reject({ ...err, message });
  }
);

export default api;
