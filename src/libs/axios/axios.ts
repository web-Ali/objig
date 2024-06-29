/* eslint-disable no-restricted-imports */
import axios from 'axios';

import { getCookie } from '../../service/utils';

declare module 'axios' {
  interface AxiosRequestConfig {
    p0?: number;
  }
}

export const apiClient = axios.create({ baseURL: 'https://alumni.gstou.ru' });
// export const apiClient = axios.create({ baseURL: 'https://forms-dev.gstou.ru' });


apiClient.interceptors.request.use(
  (config) => {
    config.headers.authorization = getCookie('token');
    return config;
  },
  (error) => Promise.reject(error),
);


