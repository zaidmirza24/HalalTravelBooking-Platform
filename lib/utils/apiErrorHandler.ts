/**
 * API Error Handler
 * Centralized error handling with user-friendly messages
 */

import { toast } from 'sonner';
import type { ApiError } from '../api/types';

export const handleApiError = (error: ApiError, context?: string): void => {
  const prefix = context ? `[${context}]` : '';
  console.error(`${prefix} API Error:`, error);

  switch (error.type) {
    case 'network':
      toast.error('Network Error', {
        description: 'Please check your internet connection and try again.',
      });
      break;

    case 'server':
      if (error.status === 401) {
        toast.error('Authentication Failed', {
          description: 'Your API key may be invalid. Please check your configuration.',
        });
      } else if (error.status === 429) {
        toast.error('Rate Limit Exceeded', {
          description: 'Too many requests. Please wait a moment and try again.',
        });
      } else if (error.status === 404) {
        toast.error('Not Found', {
          description: error.message || 'The requested resource was not found.',
        });
      } else if (error.status >= 500) {
        toast.error('Server Error', {
          description: 'Something went wrong on our end. Please try again later.',
        });
      } else {
        toast.error('Request Failed', {
          description: error.message || 'Something went wrong. Please try again.',
        });
      }
      break;

    case 'client':
      toast.error('Request Error', {
        description: error.message || 'Failed to process your request. Please try again.',
      });
      break;

    default:
      toast.error('Unexpected Error', {
        description: 'An unexpected error occurred. Please try again.',
      });
  }
};

/**
 * Determine if we should fallback to mock data based on error type
 */
export const shouldFallbackToMock = (error: ApiError): boolean => {
  // Fallback for network errors and server errors
  return (
    error.type === 'network' ||
    (error.type === 'server' && error.status >= 500) ||
    (error.type === 'server' && error.status === 401) // No API key
  );
};

/**
 * Silent error logging (no toast notification)
 */
export const logError = (error: ApiError, context?: string): void => {
  const prefix = context ? `[${context}]` : '';
  console.error(`${prefix} API Error:`, error);
};
