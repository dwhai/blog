/**
 * Leave 模块自定义 Hook
 */
import { useState, useEffect } from 'react';
import {
  leaveService,
  LeaveMessage,
} from '../services/leave.service';
import { PaginationParams } from '../../../shared/services/api/types';

export const useLeave = (params?: PaginationParams) => {
  const [data, setData] = useState<LeaveMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await leaveService.getLeaveList(params);
      setData(result.list);
      setTotal(result.total);
    } catch (err: any) {
      setError(err.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params?.page, params?.pageSize]);

  return {
    data,
    loading,
    error,
    total,
    refetch: fetchData,
  };
};

