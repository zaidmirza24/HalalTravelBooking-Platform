/**
 * LiteAPI SDK Client Wrapper
 *
 * Centralized LiteAPI SDK instance for server-side use only.
 * Ensures API key is never exposed to the client.
 */

import liteApiSdk from 'liteapi-node-sdk';

// Validate API key exists
const apiKey = process.env.LITEAPI_KEY;

if (!apiKey) {
  throw new Error(
    'LITEAPI_KEY environment variable is not set. Please check your .env.local file.'
  );
}

// Initialize the LiteAPI SDK client
export const liteApiClient = liteApiSdk(apiKey);

// Log initialization in development
if (process.env.NODE_ENV === 'development') {
  console.log('✅ LiteAPI SDK initialized successfully');
}
