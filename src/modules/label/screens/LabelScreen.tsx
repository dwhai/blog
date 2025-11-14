/**
 * Label 页面
 */
import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useLabel } from '../hooks/useLabel';
import LabelCard from '../components/LabelCard';
import { Loading, ErrorView, EmptyView } from '../../../shared/components';
import { Label } from '../services/label.service';

const LabelScreen: React.FC = () => {
  const { data, loading, error, refetch } = useLabel({
    page: 1,
    pageSize: 20,
  });

  if (loading && data.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  const handleLabelPress = (label: Label) => {
    // TODO: 导航到标签详情或文章列表
    console.log('Press label:', label);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LabelCard data={item} onPress={handleLabelPress} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyView message="暂无标签" />}
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

export default LabelScreen;

