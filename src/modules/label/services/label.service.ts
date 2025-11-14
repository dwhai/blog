/**
 * Label 模块服务
 */
import { BaseService } from '../../../shared/services/base.service';
import { PaginationParams, PaginationResponse } from '../../../shared/services/api/types';

export interface Label {
  id: string;
  name: string;
  color?: string;
  count?: number;
  createdAt: string;
}

class LabelService extends BaseService {
  constructor() {
    super('/label');
  }

  /**
   * 获取标签列表
   */
  async getLabelList(
    params?: PaginationParams
  ): Promise<PaginationResponse<Label>> {
    return this.getList<Label>('', params);
  }

  /**
   * 获取标签详情
   */
  async getLabelDetail(id: string): Promise<Label> {
    return this.getDetail<Label>('', id);
  }

  /**
   * 创建标签
   */
  async createLabel(data: Partial<Label>): Promise<Label> {
    return this.create<Label>('', data);
  }

  /**
   * 更新标签
   */
  async updateLabel(id: string, data: Partial<Label>): Promise<Label> {
    return this.update<Label>('', id, data);
  }

  /**
   * 删除标签
   */
  async deleteLabel(id: string): Promise<void> {
    return this.delete('', id);
  }
}

export const labelService = new LabelService();

