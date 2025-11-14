/**
 * Axios 网络请求封装
 */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { ApiResponse, ApiError, RequestConfig } from './types';
import { currentApiConfig } from '../../../core/config/api.config';

class ApiRequest {
  private instance: AxiosInstance;
  private loadingCount = 0;

  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL: baseURL || currentApiConfig.baseURL,
      timeout: currentApiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * 设置请求和响应拦截器
   */
  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 打印请求日志
        console.log('=== API 请求日志 ===');
        console.log('请求 URL:', config.url);
        console.log('完整 URL:', `${config.baseURL}${config.url}`);
        console.log('请求方法:', config.method?.toUpperCase());
        console.log('请求参数:', config.params);
        console.log('请求数据:', config.data);
        console.log('请求头:', config.headers);
        console.log('==================');
        
        // 添加 token（与 Vue 项目保持一致，直接使用 token 作为 Authorization）
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = token;
        }

        return config;
      },
      (error: AxiosError) => {
        console.error('=== 请求拦截器错误 ===');
        console.error('错误信息:', error);
        console.error('==================');
        return Promise.reject(error);
      }
    );

    // 响应拦截器（与 Vue 项目保持一致）
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const res = response.data;
        
        // 打印响应日志
        console.log('=== API 响应日志 ===');
        console.log('请求 URL:', response.config.url);
        console.log('请求方法:', response.config.method?.toUpperCase());
        console.log('HTTP 状态码:', response.status);
        console.log('业务状态码 (code):', res.code);
        console.log('响应消息 (message):', res.message);
        console.log('完整响应数据:', JSON.stringify(res, null, 2));
        console.log('==================');
        
        // code === 200 时返回响应（保持 AxiosResponse 结构，但将 data 设置为业务数据）
        if (res.code === 200) {
          // 返回完整的 AxiosResponse，但将 data 设置为业务响应对象
          return {
            ...response,
            data: res,
          } as AxiosResponse<ApiResponse>;
        }
        
        // 404 错误
        if (res.code === 404) {
          return Promise.reject(new Error('请求路径不存在'));
        }
        
        // 401 未授权
        if (res.code === 401) {
          this.handleUnauthorized();
          return Promise.reject(new Error('当前登录已过期，请重新登录'));
        }
        
        // 其他业务错误
        return Promise.reject(new Error(res.message || '请求失败'));
      },
      (error: AxiosError) => {
        // 打印错误日志
        console.log('=== API 错误日志 ===');
        if (error.response) {
          console.log('请求 URL:', error.config?.url);
          console.log('HTTP 状态码:', error.response.status);
          console.log('错误响应数据:', JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
          console.log('请求 URL:', error.config?.url);
          console.log('错误类型: 网络请求失败，未收到响应');
        } else {
          console.log('错误信息:', error.message);
        }
        console.log('==================');
        
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * 获取 token
   */
  private getToken(): string | null {
    // TODO: 从存储中获取 token（AsyncStorage 或其他）
    return null;
  }

  /**
   * 处理未授权
   */
  private handleUnauthorized() {
    // TODO: 清除 token，跳转到登录页
    console.warn('Token expired or unauthorized');
  }

  /**
   * 创建错误对象
   */
  private createError(data: ApiResponse): ApiError {
    return {
      code: data.code,
      message: data.message || '请求失败',
      data: data.data,
    };
  }

  /**
   * 处理 HTTP 错误
   */
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // 服务器返回了错误状态码
      const { status, data } = error.response;
      return {
        code: status,
        message:
          (data as any)?.message ||
          this.getErrorMessage(status) ||
          '请求失败',
        data: (data as any)?.data,
      };
    } else if (error.request) {
      // 请求已发出但没有收到响应
      return {
        code: -1,
        message: '网络连接失败，请检查网络设置',
      };
    } else {
      // 其他错误
      return {
        code: -1,
        message: error.message || '请求失败',
      };
    }
  }

  /**
   * 根据状态码获取错误信息
   */
  private getErrorMessage(status: number): string {
    const errorMessages: Record<number, string> = {
      400: '请求参数错误',
      401: '未授权，请重新登录',
      403: '拒绝访问',
      404: '请求的资源不存在',
      500: '服务器内部错误',
      502: '网关错误',
      503: '服务不可用',
      504: '网关超时',
    };
    return errorMessages[status] || '请求失败';
  }

  /**
   * 显示加载提示
   */
  private showLoading() {
    this.loadingCount++;
    // TODO: 显示全局 loading（可以使用 react-native 的 ActivityIndicator 或第三方库）
    if (this.loadingCount === 1) {
      console.log('Loading...');
    }
  }

  /**
   * 隐藏加载提示
   */
  private hideLoading() {
    this.loadingCount--;
    if (this.loadingCount <= 0) {
      this.loadingCount = 0;
      // TODO: 隐藏全局 loading
      console.log('Loading hidden');
    }
  }

  /**
   * 显示错误提示
   */
  private showError(message: string) {
    // TODO: 显示错误提示（可以使用 react-native 的 Alert 或第三方 toast 库）
    console.error('Error:', message);
  }

  /**
   * 通用请求方法
   */
  async request<T = any>(config: RequestConfig): Promise<T> {
    const {
      url,
      method = 'GET',
      params,
      data,
      headers,
      timeout,
      showLoading = false,
      showError = true,
    } = config;

    const requestConfig: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
      headers,
      timeout,
    };

    try {
      if (showLoading) {
        this.showLoading();
      }

      const response = await this.instance.request<ApiResponse<T>>(
        requestConfig
      );

      // 响应拦截器返回的是 AxiosResponse<ApiResponse>，response.data 是 ApiResponse 对象
      // 需要返回 ApiResponse.data 字段（与 Vue 项目中通过 res.data 获取数据的方式一致）
      return response.data.data;
    } catch (error) {
      const apiError = error as ApiError;
      if (showError) {
        this.showError(apiError.message);
      }
      throw apiError;
    } finally {
      if (showLoading) {
        this.hideLoading();
      }
    }
  }

  /**
   * GET 请求
   */
  get<T = any>(url: string, params?: any, config?: Partial<RequestConfig>) {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...config,
    });
  }

  /**
   * POST 请求
   */
  post<T = any>(url: string, data?: any, config?: Partial<RequestConfig>) {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config,
    });
  }

  /**
   * PUT 请求
   */
  put<T = any>(url: string, data?: any, config?: Partial<RequestConfig>) {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...config,
    });
  }

  /**
   * DELETE 请求
   */
  delete<T = any>(url: string, params?: any, config?: Partial<RequestConfig>) {
    return this.request<T>({
      url,
      method: 'DELETE',
      params,
      ...config,
    });
  }

  /**
   * PATCH 请求
   */
  patch<T = any>(url: string, data?: any, config?: Partial<RequestConfig>) {
    return this.request<T>({
      url,
      method: 'PATCH',
      data,
      ...config,
    });
  }
}

// 创建默认实例
export const apiRequest = new ApiRequest();

// 导出类以便创建自定义实例
export default ApiRequest;

