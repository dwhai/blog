/**
 * Leave 页面
 */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useLeave } from '../hooks/useLeave';
import LeaveCard from '../components/LeaveCard';
import { Loading, ErrorView, EmptyView } from '../../../shared/components';
import { LeaveMessage } from '../services/leave.service';
import { leaveService } from '../services/leave.service';

const LeaveScreen: React.FC = () => {
  const { data, loading, error, refetch } = useLeave({
    page: 1,
    pageSize: 20,
  });
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      await leaveService.createLeave({ content: content.trim() });
      setContent('');
      refetch();
    } catch (err) {
      // 错误处理
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = (message: LeaveMessage) => {
    // TODO: 显示回复输入框
    console.log('Reply to:', message);
  };

  if (loading && data.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="写下你的留言..."
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.submitText}>
            {submitting ? '提交中...' : '提交'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LeaveCard data={item} onReply={handleReply} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyView message="暂无留言" />}
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
  inputContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  input: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  submitButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
});

export default LeaveScreen;

