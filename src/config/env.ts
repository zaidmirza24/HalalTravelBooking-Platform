/**
 * Environment Configuration
 * Validates and exports environment variables for the application
 */

const requiredEnvVars = {
  VITE_LITEAPI_BASE_URL: import.meta.env.VITE_LITEAPI_BASE_URL,
  VITE_LITEAPI_KEY: import.meta.env.VITE_LITEAPI_KEY,
  VITE_API_MODE: import.meta.env.VITE_API_MODE,
} as const;

// Validate required env vars exist
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    console.warn(`⚠️  Missing environment variable: ${key}`);
  }
});

export const config = {
  api: {
    // Use proxy in development to avoid CORS issues
    baseUrl: import.meta.env.DEV
      ? '/api'
      : (requiredEnvVars.VITE_LITEAPI_BASE_URL || 'https://api.liteapi.travel'),
    apiKey: requiredEnvVars.VITE_LITEAPI_KEY || '',
    mode: (requiredEnvVars.VITE_API_MODE || 'mock') as 'mock' | 'real' | 'hybrid',
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Log configuration in development
if (config.isDevelopment) {
  console.log('🔧 API Configuration:', {
    mode: config.api.mode,
    baseUrl: config.api.baseUrl,
    hasApiKey: !!config.api.apiKey,
  });
}

export default config;
