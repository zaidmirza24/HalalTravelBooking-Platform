import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Points to Next.js API routes (not LiteAPI directly)
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging in development
apiClient.interceptors.request.use(
  (config) => {
    if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
      console.log('[API Request]', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
      console.log('[API Response]', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    console.error('[API Error]', error.response?.status, error.message);

    // Structured error response
    const errorResponse = {
      message: error.response?.data?.error || error.message || 'An error occurred',
      status: error.response?.status || 500,
      type: error.response ? 'server' : error.request ? 'network' : 'client',
    };

    return Promise.reject(errorResponse);
  }
);

export { apiClient };
