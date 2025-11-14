/**
 * Category 模块服务
 */
import { BaseService } from '../../../shared/services/base.service';
import { PaginationParams, PaginationResponse } from '../../../shared/services/api/types';

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  count?: number;
  createdAt: string;
}

class CategoryService extends BaseService {
  constructor() {
    super('/category');
  }

  /**
   * 获取分类列表
   */
  async getCategoryList(
    params?: PaginationParams
  ): Promise<PaginationResponse<Category>> {
    return this.getList<Category>('', params);
  }

  /**
   * 获取分类详情
   */
  async getCategoryDetail(id: string): Promise<Category> {
    return this.getDetail<Category>('', id);
  }

  /**
   * 创建分类
   */
  async createCategory(data: Partial<Category>): Promise<Category> {
    return this.create<Category>('', data);
  }

  /**
   * 更新分类
   */
  async updateCategory(
    id: string,
    data: Partial<Category>
  ): Promise<Category> {
    return this.update<Category>('', id, data);
  }

  /**
   * 删除分类
   */
  async deleteCategory(id: string): Promise<void> {
    return this.delete('', id);
  }
}

export const categoryService = new CategoryService();

