# 项目结构说明

本项目采用模块化和组件化的架构设计，便于维护和扩展。

## 目录结构

```
src/
├── core/                    # 核心配置
│   ├── config/             # 配置文件（API 配置等）
│   ├── constants/          # 常量定义
│   └── navigation/         # 导航配置
├── modules/                # 业务模块
│   ├── home/              # 首页模块
│   ├── auth/              # 认证模块
│   ├── category/          # 分类模块
│   ├── archive/           # 归档模块
│   ├── label/             # 标签模块
│   └── leave/             # 留言模块
└── shared/                # 共享资源
    ├── components/        # 共享组件
    ├── services/          # 共享服务（API 封装等）
    ├── styles/            # 共享样式
    └── utils/             # 工具函数
```

## 模块结构

每个模块都遵循相同的目录结构：

```
module/
├── components/            # 模块专用组件
├── hooks/                # 自定义 Hooks
├── screens/              # 页面组件
├── services/             # 模块服务（API 调用）
└── index.ts              # 模块统一导出
```

## 核心功能

### 1. API 请求封装

位置：`src/shared/services/api/`

- **request.ts**: Axios 封装，包含请求/响应拦截器、错误处理
- **types.ts**: API 相关类型定义
- **base.service.ts**: 基础服务类，提供通用的 CRUD 方法

使用示例：

```typescript
import { apiRequest } from '@/shared/services/api';

// GET 请求
const data = await apiRequest.get('/api/users');

// POST 请求
const result = await apiRequest.post('/api/users', { name: 'John' });
```

### 2. 模块服务

每个模块都有自己的服务类，继承自 `BaseService`：

```typescript
import { BaseService } from '@/shared/services/base.service';

class HomeService extends BaseService {
  constructor() {
    super('/home');
  }

  async getHomeData() {
    return this.getList<HomeData>('');
  }
}
```

### 3. 自定义 Hooks

每个模块提供自定义 Hooks 用于数据获取和状态管理：

```typescript
import { useHome } from '@/modules/home';

const { data, loading, error, refetch } = useHome();
```

### 4. 共享组件

位置：`src/shared/components/`

- **Loading**: 加载组件
- **ErrorView**: 错误视图组件
- **EmptyView**: 空状态组件

## 使用指南

### 添加新模块

1. 在 `src/modules/` 下创建新模块目录
2. 按照标准结构创建子目录（components, hooks, screens, services）
3. 创建服务类继承 `BaseService`
4. 创建自定义 Hooks
5. 创建页面和组件
6. 在模块根目录创建 `index.ts` 统一导出

### 添加新的 API 接口

1. 在对应模块的 `services/` 目录下的服务类中添加方法
2. 在 `hooks/` 中创建或更新对应的 Hook
3. 在页面或组件中使用 Hook

### 使用共享组件

```typescript
import { Loading, ErrorView, EmptyView } from '@/shared/components';
```

### 使用工具函数

```typescript
import { formatDate, debounce, throttle } from '@/shared/utils';
```

## 配置说明

### API 配置

编辑 `src/core/config/api.config.ts` 来配置不同环境的 API 地址：

```typescript
export const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
  },
  production: {
    baseURL: 'https://api.example.com',
    timeout: 10000,
  },
};
```

## 注意事项

1. 所有模块都应该通过 `index.ts` 统一导出
2. 共享资源放在 `shared/` 目录下
3. 模块之间应该保持独立，避免直接依赖
4. 使用 TypeScript 类型定义，确保类型安全
5. 遵循 React Native 最佳实践

