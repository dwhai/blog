/**
 * Home 卡片组件
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Article } from '../../services/home.service';

interface HomeCardProps {
  data: Article;
  onPress?: (data: Article) => void;
}

const HomeCard: React.FC<HomeCardProps> = ({ data, onPress }) => {
  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    const date = new Date(timeStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return minutes <= 0 ? '刚刚' : `${minutes}分钟前`;
      }
      return `${hours}小时前`;
    } else if (days < 7) {
      return `${days}天前`;
    } else {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(data)}
      activeOpacity={0.7}
    >
      {/* 顶部：置顶标识 */}
      {data.isStick === 1 && (
        <View style={styles.stickBadge}>
          <Text style={styles.stickText}>置顶</Text>
        </View>
      )}

      {/* 标题 */}
      <Text style={styles.title} numberOfLines={2}>
        {data.title}
      </Text>

      {/* 内容区域：封面图 + 摘要 */}
      <View style={styles.contentRow}>
        {data.cover ? (
          <Image
            source={{ uri: data.cover } as ImageSourcePropType}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : null}
        <View style={[styles.textContent, !data.cover && styles.textContentFull]}>
          <Text style={styles.summary} numberOfLines={data.cover ? 3 : 4}>
            {data.summary || '暂无摘要'}
          </Text>
        </View>
      </View>

      {/* 标签 */}
      {data.tags && data.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {data.tags
            .slice(0, 3)
            .map((tag, index) => (
              <View key={`tag-${tag.id}-${index}`} style={styles.tag}>
                <Text style={styles.tagText}>{tag.name}</Text>
              </View>
            ))}
        </View>
      )}

      {/* 底部信息：作者、时间、统计数据 */}
      <View style={styles.footer}>
        <View style={styles.authorInfo}>
          {data.avatar ? (
            <Image
              source={{ uri: data.avatar } as ImageSourcePropType}
              style={styles.avatar}
            />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>
                {data.nickname?.[0]?.toUpperCase() || 'U'}
              </Text>
            </View>
          )}
          <Text style={styles.nickname}>{data.nickname || '匿名'}</Text>
        </View>
        <View style={styles.metaInfo}>
          <Text style={styles.metaText}>{formatTime(data.createTime)}</Text>
          {data.commentNum !== null && (
            <Text style={styles.metaText}>评论 {data.commentNum}</Text>
          )}
          {data.likeNum !== null && (
            <Text style={styles.metaText}>点赞 {data.likeNum}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  stickBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  stickText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
    lineHeight: 26,
  },
  contentRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  coverImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  textContentFull: {
    flex: 1,
  },
  summary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f0f5ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#1890ff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  avatarPlaceholder: {
    backgroundColor: '#1890ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  nickname: {
    fontSize: 13,
    color: '#666',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 12,
  },
});

export default HomeCard;

