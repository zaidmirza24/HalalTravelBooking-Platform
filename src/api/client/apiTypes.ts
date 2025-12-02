/**
 * Common API Types
 * Shared types used across all API interactions
 */

export interface ApiError {
  message: string;
  status: number;
  data?: any;
  type: 'server' | 'network' | 'client';
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
