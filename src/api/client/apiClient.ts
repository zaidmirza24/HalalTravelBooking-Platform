/**
 * LiteAPI Client
 * Centralized Axios instance with authentication and error handling
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { config } from '../../config/env';
import { ApiError } from './apiTypes';

const getApiKey = (): string => {
  const apiKey = config.api.apiKey;
  if (!apiKey && config.api.mode === 'real') {
    console.error('❌ LiteAPI key is missing. Please add VITE_LITEAPI_KEY to your .env file.');
  }
  return apiKey;
};

const handleError = (error: AxiosError): ApiError => {
  if (error.response) {
    // Server responded with error
    const responseData = error.response.data as any;
    return {
      message: responseData?.message || responseData?.error || 'An error occurred',
      status: error.response.status,
      data: error.response.data,
      type: 'server',
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'No response from server. Please check your connection.',
      status: 0,
      type: 'network',
    };
  } else {
    // Request setup error
    return {
      message: error.message || 'Failed to make request',
      status: 0,
      type: 'client',
    };
  }
};

// Create Axios instance
const client: AxiosInstance = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - Add API key to every request
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      config.headers = {} as any;
    }

    const apiKey = getApiKey();
    if (apiKey) {
      config.headers['X-API-Key'] = apiKey;
    }

    // Log requests in development
    if (import.meta.env.DEV) {
      console.log('[LiteAPI Request]', config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
client.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log('[LiteAPI Response]', response.status, response.config.url);
    }
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(handleError(error));
  }
);

// Export the configured client
export const apiClient = client;
export default apiClient;
