/**
 * Archive 模块服务
 */
import { BaseService } from '../../../shared/services/base.service';
import { PaginationParams, PaginationResponse } from '../../../shared/services/api/types';

export interface Archive {
  id: string;
  title: string;
  content: string;
  categoryId?: string;
  categoryName?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

class ArchiveService extends BaseService {
  constructor() {
    super('/archive');
  }

  /**
   * 获取归档列表
   */
  async getArchiveList(
    params?: PaginationParams & { categoryId?: string; tag?: string }
  ): Promise<PaginationResponse<Archive>> {
    return this.getList<Archive>('', params);
  }

  /**
   * 获取归档详情
   */
  async getArchiveDetail(id: string): Promise<Archive> {
    return this.getDetail<Archive>('', id);
  }

  /**
   * 创建归档
   */
  async createArchive(data: Partial<Archive>): Promise<Archive> {
    return this.create<Archive>('', data);
  }

  /**
   * 更新归档
   */
  async updateArchive(id: string, data: Partial<Archive>): Promise<Archive> {
    return this.update<Archive>('', id, data);
  }

  /**
   * 删除归档
   */
  async deleteArchive(id: string): Promise<void> {
    return this.delete('', id);
  }
}

export const archiveService = new ArchiveService();

