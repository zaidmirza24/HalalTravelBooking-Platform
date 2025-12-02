import axios from 'axios';

const liteApiClient = axios.create({
  baseURL: process.env.LITEAPI_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.LITEAPI_KEY!, // Server-side only - hidden from browser!
  },
});

// Request interceptor for logging in development
liteApiClient.interceptors.request.use(
  (config) => {
    if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
      console.log('[LiteAPI Request]', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
liteApiClient.interceptors.response.use(
  (response) => {
    if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
      console.log('[LiteAPI Response]', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    console.error('[LiteAPI Error]', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export { liteApiClient };
