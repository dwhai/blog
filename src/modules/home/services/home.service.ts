/**
 * Home 模块服务
 */
import { BaseService } from '../../../shared/services/base.service';
import { apiRequest, PaginationParams, PaginationResponse } from '../../../shared/services/api';

/**
 * 标签信息
 */
export interface ArticleTag {
  id: number;
  name: string;
  articleNum?: number | null;
}

/**
 * 文章数据
 */
export interface Article {
  id: number;
  categoryId: number | null;
  userId: number;
  nickname: string;
  avatar: string;
  title: string;
  summary: string;
  cover: string;
  contentMd: string;
  quantity: number;
  isStick: number;
  isRecommend: number | null;
  status: number | null;
  categoryName: string;
  tags: ArticleTag[];
  commentNum: number | null;
  likeNum: number | null;
  createTime: string;
}

/**
 * 文章列表查询参数
 */
export interface ArticleListParams extends PaginationParams {
  pageNum?: number;
  pageSize?: number;
  categoryId?: number;
  tagId?: number;
  keyword?: string;
}

class HomeService extends BaseService {
  constructor() {
    // 与 Vue 项目保持一致，使用 /api 前缀
    super('/api/article');
  }

  /**
   * 获取首页文章列表（支持分页）
   */
  async getArticleList(params?: ArticleListParams): Promise<PaginationResponse<Article>> {
    return apiRequest.get<PaginationResponse<Article>>(`${this.baseUrl}/list`, params);
  }

  /**
   * 获取文章详情
   */
  async getArticleDetail(id: number): Promise<Article> {
    return apiRequest.get<Article>(`${this.baseUrl}/${id}`);
  }
}

export const homeService = new HomeService();

