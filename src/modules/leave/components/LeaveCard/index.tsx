/**
 * Leave 卡片组件
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LeaveMessage } from '../../services/leave.service';

interface LeaveCardProps {
  data: LeaveMessage;
  onReply?: (data: LeaveMessage) => void;
}

const LeaveCard: React.FC<LeaveCardProps> = ({ data, onReply }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.author}>{data.author || '匿名用户'}</Text>
        <Text style={styles.date}>{data.createdAt}</Text>
      </View>
      <Text style={styles.content}>{data.content}</Text>
      {onReply && (
        <TouchableOpacity
          style={styles.replyButton}
          onPress={() => onReply(data)}
        >
          <Text style={styles.replyText}>回复</Text>
        </TouchableOpacity>
      )}
      {data.replies && data.replies.length > 0 && (
        <View style={styles.replies}>
          {data.replies.map((reply) => (
            <View key={reply.id} style={styles.replyItem}>
              <Text style={styles.replyAuthor}>
                {reply.author || '匿名用户'}
              </Text>
              <Text style={styles.replyContent}>{reply.content}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  content: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  replyButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  replyText: {
    fontSize: 12,
    color: '#007AFF',
  },
  replies: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  replyItem: {
    marginBottom: 8,
  },
  replyAuthor: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007AFF',
    marginBottom: 4,
  },
  replyContent: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});

export default LeaveCard;

