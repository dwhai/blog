/**
 * 基础服务类
 * 所有模块服务都应该继承此类
 */
import { apiRequest } from './api';
import { PaginationParams, PaginationResponse } from './api/types';

export class BaseService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * 获取列表
   */
  protected async getList<T>(
    endpoint: string,
    params?: PaginationParams & Record<string, any>
  ): Promise<PaginationResponse<T>> {
    return apiRequest.get<PaginationResponse<T>>(
      `${this.baseUrl}${endpoint}`,
      params
    );
  }

  /**
   * 获取详情
   */
  protected async getDetail<T>(
    endpoint: string,
    id: string | number
  ): Promise<T> {
    return apiRequest.get<T>(`${this.baseUrl}${endpoint}/${id}`);
  }

  /**
   * 创建
   */
  protected async create<T>(
    endpoint: string,
    data: Partial<T>
  ): Promise<T> {
    return apiRequest.post<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * 更新
   */
  protected async update<T>(
    endpoint: string,
    id: string | number,
    data: Partial<T>
  ): Promise<T> {
    return apiRequest.put<T>(`${this.baseUrl}${endpoint}/${id}`, data);
  }

  /**
   * 删除
   */
  protected async delete(
    endpoint: string,
    id: string | number
  ): Promise<void> {
    return apiRequest.delete(`${this.baseUrl}${endpoint}/${id}`);
  }
}

