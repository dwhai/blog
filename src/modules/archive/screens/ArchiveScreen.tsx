/**
 * Archive 页面
 */
import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useArchive } from '../hooks/useArchive';
import ArchiveCard from '../components/ArchiveCard';
import { Loading, ErrorView, EmptyView } from '../../../shared/components';
import { Archive } from '../services/archive.service';

const ArchiveScreen: React.FC = () => {
  const { data, loading, error, refetch } = useArchive({
    page: 1,
    pageSize: 20,
  });

  if (loading && data.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  const handleArchivePress = (archive: Archive) => {
    // TODO: 导航到详情页
    console.log('Press archive:', archive);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArchiveCard data={item} onPress={handleArchivePress} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyView message="暂无归档" />}
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

export default ArchiveScreen;

