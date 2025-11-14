/**
 * Home 模块自定义 Hook
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { homeService, Article, ArticleListParams } from '../services/home.service';
import { PaginationResponse } from '../../../shared/services/api';

export const useHome = (initialParams?: ArticleListParams) => {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    size: 10,
    total: 0,
    pages: 0,
    pageNum: 1,
    pageSize: 10,
  });
  const [hasMore, setHasMore] = useState(true);
  
  // 使用 ref 存储当前分页状态，避免闭包问题
  const paginationRef = useRef(pagination);
  useEffect(() => {
    paginationRef.current = pagination;
  }, [pagination]);

  const fetchData = useCallback(async (params?: ArticleListParams, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const currentPagination = paginationRef.current;
      const requestParams: ArticleListParams = {
        current: append ? currentPagination.current + 1 : 1,
        size: currentPagination.size,
        pageNum: append ? (currentPagination.pageNum || currentPagination.current) + 1 : 1,
        pageSize: currentPagination.pageSize || currentPagination.size,
        ...params,
        ...initialParams,
      };

      const result: PaginationResponse<Article> = await homeService.getArticleList(requestParams);
      
      if (append) {
        setData((prev) => [...prev, ...result.records]);
      } else {
        setData(result.records);
      }
      
      setPagination({
        current: result.current,
        size: result.size,
        total: result.total,
        pages: result.pages,
        pageNum: result.current,
        pageSize: result.size,
      });
      
      setHasMore(result.current < result.pages);
    } catch (err: any) {
      setError(err.message || '加载失败');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [initialParams]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore && !loading) {
      fetchData(undefined, true);
    }
  }, [loadingMore, hasMore, loading, fetchData]);

  const refresh = useCallback(() => {
    setPagination((prev) => ({ ...prev, current: 1, pageNum: 1 }));
    fetchData(undefined, false);
  }, [fetchData]);

  useEffect(() => {
    fetchData(undefined, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    loadingMore,
    error,
    pagination,
    hasMore,
    refetch: refresh,
    loadMore,
  };
};

