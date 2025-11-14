/**
 * 加载组件
 */
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

interface LoadingProps {
  text?: string;
  size?: 'small' | 'large';
}

const Loading: React.FC<LoadingProps> = ({
  text = '加载中...',
  size = 'large',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#007AFF" />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
});

export default Loading;

