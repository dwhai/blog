/**
 * Archive 模块自定义 Hook
 */
import { useState, useEffect } from 'react';
import {
  archiveService,
  Archive,
} from '../services/archive.service';
import { PaginationParams } from '../../../shared/services/api/types';

interface UseArchiveParams extends PaginationParams {
  categoryId?: string;
  tag?: string;
}

export const useArchive = (params?: UseArchiveParams) => {
  const [data, setData] = useState<Archive[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await archiveService.getArchiveList(params);
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
  }, [params?.page, params?.pageSize, params?.categoryId, params?.tag]);

  return {
    data,
    loading,
    error,
    total,
    refetch: fetchData,
  };
};

