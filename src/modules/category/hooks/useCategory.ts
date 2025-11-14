/**
 * Category 模块自定义 Hook
 */
import { useState, useEffect } from 'react';
import {
  categoryService,
  Category,
} from '../services/category.service';
import { PaginationParams } from '../../../shared/services/api/types';

export const useCategory = (params?: PaginationParams) => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await categoryService.getCategoryList(params);
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

