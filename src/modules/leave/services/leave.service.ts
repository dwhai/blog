/**
 * Leave 模块服务
 */
import { BaseService } from '../../../shared/services/base.service';
import { PaginationParams, PaginationResponse } from '../../../shared/services/api/types';

export interface LeaveMessage {
  id: string;
  content: string;
  author?: string;
  email?: string;
  replyTo?: string;
  replies?: LeaveMessage[];
  createdAt: string;
}

class LeaveService extends BaseService {
  constructor() {
    super('/leave');
  }

  /**
   * 获取留言列表
   */
  async getLeaveList(
    params?: PaginationParams
  ): Promise<PaginationResponse<LeaveMessage>> {
    return this.getList<LeaveMessage>('', params);
  }

  /**
   * 获取留言详情
   */
  async getLeaveDetail(id: string): Promise<LeaveMessage> {
    return this.getDetail<LeaveMessage>('', id);
  }

  /**
   * 创建留言
   */
  async createLeave(data: Partial<LeaveMessage>): Promise<LeaveMessage> {
    return this.create<LeaveMessage>('', data);
  }

  /**
   * 回复留言
   */
  async replyLeave(
    id: string,
    data: Partial<LeaveMessage>
  ): Promise<LeaveMessage> {
    return this.create<LeaveMessage>(`/${id}/reply`, data);
  }

  /**
   * 删除留言
   */
  async deleteLeave(id: string): Promise<void> {
    return this.delete('', id);
  }
}

export const leaveService = new LeaveService();

