/**
 * Auth 模块自定义 Hook
 */
import { useState, useCallback } from 'react';
import {
  authService,
  LoginParams,
  RegisterParams,
  UserInfo,
} from '../services/auth.service';

export const useAuth = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (params: LoginParams) => {
    try {
      setLoading(true);
      setError(null);
      const userInfo = await authService.login(params);
      setUser(userInfo);
      // TODO: 保存 token 到本地存储
      return userInfo;
    } catch (err: any) {
      setError(err.message || '登录失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (params: RegisterParams) => {
    try {
      setLoading(true);
      setError(null);
      const userInfo = await authService.register(params);
      setUser(userInfo);
      // TODO: 保存 token 到本地存储
      return userInfo;
    } catch (err: any) {
      setError(err.message || '注册失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      // TODO: 清除本地存储的 token
    } catch (err: any) {
      setError(err.message || '登出失败');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };
};

