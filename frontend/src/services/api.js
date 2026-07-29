import axios from 'axios';

const API_BASE =
  process.env.REACT_APP_API_URL || 'http://192.168.29.189:8000/api';

const api = axios.create({
  baseURL: API_BASE,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem('refresh_token');

      if (refresh) {
        try {
          const response = await axios.post(
            `${API_BASE}/auth/token/refresh/`,
            {
              refresh,
            }
          );

          const newAccessToken = response.data.access;

          localStorage.setItem('access_token', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (err) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');

          window.location.href = '/login';

          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

// =====================
// Authentication APIs
// =====================

export const login = (data) => api.post('/auth/login/', data);

export const logout = (refresh) =>
  api.post('/auth/logout/', { refresh });

export const register = (data) =>
  api.post('/auth/register/', data);

export const getMe = () =>
  api.get('/auth/me/');

export const updateMe = (data) =>
  api.patch('/auth/me/', data);

// =====================
// Trigger APIs
// =====================

export const getTriggers = () =>
  api.get('/triggers/');

export const createTrigger = (data) =>
  api.post('/triggers/', data);

export const updateTrigger = (id, data) =>
  api.put(`/triggers/${id}/`, data);

export const deleteTrigger = (id) =>
  api.delete(`/triggers/${id}/`);

// =====================
// Template APIs
// =====================

export const getTemplates = (triggerId) =>
  api.get('/templates/', {
    params: {
      trigger_id: triggerId,
    },
  });

export const createTemplate = (data) =>
  api.post('/templates/', data);

export const updateTemplate = (id, data) =>
  api.put(`/templates/${id}/`, data);

export const deleteTemplate = (id) =>
  api.delete(`/templates/${id}/`);

export const toggleTemplate = (id) =>
  api.patch(`/templates/${id}/toggle/`);

export const testSend = (id, data) =>
  api.post(`/templates/${id}/test/`, data);

// Export axios instance
export default api;