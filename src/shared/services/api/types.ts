/**
 * API 请求和响应的类型定义
 */

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

export interface ApiError {
  code: number;
  message: string;
  data?: any;
}

export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: any;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  showLoading?: boolean;
  showError?: boolean;
}

export interface PaginationParams {
  current?: number;
  size?: number;
  page?: number;
  pageSize?: number;
}

export interface PaginationResponse<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
  orders?: any[];
  optimizeCountSql?: boolean;
  searchCount?: boolean;
  countId?: string | null;
  maxLimit?: number | null;
}

