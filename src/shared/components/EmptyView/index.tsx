/**
 * 空状态组件
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyViewProps {
  message?: string;
  description?: string;
}

const EmptyView: React.FC<EmptyViewProps> = ({
  message = '暂无数据',
  description,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
});

export default EmptyView;

