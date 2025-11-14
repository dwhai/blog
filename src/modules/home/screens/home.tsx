/**
 * Home Screen
 * This file contains the implementation of the Home screen component.
 */
import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useHome } from '../hooks/useHome';
import HomeCard from '../components/HomeCard';
import { Loading, ErrorView, EmptyView } from '../../../shared/components';

const HomeScreen: React.FC = () => {
  const {
    data,
    loading,
    loadingMore,
    error,
    hasMore,
    refetch,
    loadMore,
  } = useHome();

  // 使用 ref 防止快速滚动时重复触发加载更多
  const loadingMoreRef = useRef(false);
  
  // 同步 loadingMore 状态到 ref，确保 ref 始终是最新的
  React.useEffect(() => {
    loadingMoreRef.current = loadingMore;
  }, [loadingMore]);

  if (loading && data.length === 0) {
    return <Loading />;
  }

  if (error && data.length === 0) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#1890ff" />
          <Text style={styles.footerText}>加载中...</Text>
        </View>
      );
    }
    
    if (!hasMore && data.length > 0) {
      return (
        <View style={styles.footerLoader}>
          <Text style={styles.footerEndText}>没有更多数据了</Text>
        </View>
      );
    }
    
    return null;
  };

  const handleEndReached = () => {
    // 防止重复触发：如果正在加载或已经触发过，则不再触发
    if (loadingMoreRef.current || loadingMore || loading || !hasMore) {
      return;
    }
    
    // 设置标志，防止快速滚动时重复触发
    loadingMoreRef.current = true;
    loadMore();
    
    // 延迟重置标志，确保加载完成后可以再次触发
    setTimeout(() => {
      loadingMoreRef.current = false;
    }, 500);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => `article-${item.id}`}
        renderItem={({ item }) => (
          <HomeCard
            data={item}
            onPress={(item) => {
              // TODO: 导航到详情页
              console.log('Press item:', item);
            }}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          data.length === 0 && styles.emptyContent,
        ]}
        ListEmptyComponent={
          !loading ? <EmptyView message="暂无文章" /> : null
        }
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={loading && data.length > 0}
            onRefresh={refetch}
            colors={['#1890ff']}
            tintColor="#1890ff"
          />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#999',
  },
  footerEndText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default HomeScreen;