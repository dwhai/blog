/**
 * Auth 模块服务
 */
import { BaseService } from '../../../shared/services/base.service';
import { apiRequest } from '../../../shared/services/api';

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  password: string;
  email?: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  token: string;
}

class AuthService extends BaseService {
  constructor() {
    super('/auth');
  }

  /**
   * 登录
   */
  async login(params: LoginParams): Promise<UserInfo> {
    return apiRequest.post<UserInfo>(`${this.baseUrl}/login`, params);
  }

  /**
   * 注册
   */
  async register(params: RegisterParams): Promise<UserInfo> {
    return apiRequest.post<UserInfo>(`${this.baseUrl}/register`, params);
  }

  /**
   * 登出
   */
  async logout(): Promise<void> {
    return apiRequest.post(`${this.baseUrl}/logout`);
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(): Promise<UserInfo> {
    return apiRequest.get<UserInfo>(`${this.baseUrl}/user`);
  }

  /**
   * 刷新 token
   */
  async refreshToken(): Promise<{ token: string }> {
    return apiRequest.post<{ token: string }>(`${this.baseUrl}/refresh`);
  }
}

export const authService = new AuthService();

