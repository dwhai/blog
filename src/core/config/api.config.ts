/**
 * API 配置文件
 * 
 * 注意：Vue 项目通过 Vite 代理将请求转发到实际服务器
 * React Native 需要直接配置实际的 API 地址
 */

//  API 服务器地址（与 Vue 项目的代理目标地址一致）
const API_SERVER_URL = 'https://anlk.com.cn/api/anlk';

export const API_CONFIG = {
  // 开发环境（直接使用实际 API 地址，因为 React Native 无法使用 Vite 代理）
  development: {
    baseURL: API_SERVER_URL,
    timeout: 10000,
  },
  // 生产环境
  production: {
    baseURL: API_SERVER_URL,
    timeout: 10000,
  },
};

// 获取当前环境
const getEnv = (): 'development' | 'production' => {
  // TODO: 根据实际环境变量判断
  // @ts-ignore - __DEV__ is a global variable in React Native
  return typeof __DEV__ !== 'undefined' && __DEV__ ? 'development' : 'production';
};

// 导出当前环境的配置
export const currentApiConfig = API_CONFIG[getEnv()];

