/**
 * Category 页面
 */
import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useCategory } from '../hooks/useCategory';
import CategoryCard from '../components/CategoryCard';
import { Loading, ErrorView, EmptyView } from '../../../shared/components';
import { Category } from '../services/category.service';

const CategoryScreen: React.FC = () => {
  const { data, loading, error, refetch } = useCategory({
    page: 1,
    pageSize: 20,
  });

  if (loading && data.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  const handleCategoryPress = (category: Category) => {
    // TODO: 导航到分类详情或文章列表
    console.log('Press category:', category);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryCard data={item} onPress={handleCategoryPress} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyView message="暂无分类" />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
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
});

export default CategoryScreen;

