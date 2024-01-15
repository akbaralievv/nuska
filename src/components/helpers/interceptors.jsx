import axios from 'axios';
import API_URLS from '../../config/api';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from './tokens';

const urlRefresh = API_URLS.refresh_token;

const refreshToken = async () => {
  try {
    const response = await axios.post(urlRefresh, {
      refresh: getRefreshToken(),
    });
    setAccessToken(response.data.access);
    return response.data.access;
  } catch (error) {
    removeAccessToken();
    removeRefreshToken();
    window.location.href = '/auth';
    throw new Error('Не удалось обновить токен');
  }
};

const createApiInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    async (config) => {
      const accessToken = getAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401 && getRefreshToken()) {
        try {
          const newAccessToken = await refreshToken();
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const api = createApiInstance(API_URLS.base_url);
