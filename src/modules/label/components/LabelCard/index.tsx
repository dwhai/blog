/**
 * Label 卡片组件
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Label } from '../../services/label.service';

interface LabelCardProps {
  data: Label;
  onPress?: (data: Label) => void;
}

const LabelCard: React.FC<LabelCardProps> = ({ data, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(data)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.colorIndicator,
            data.color && { backgroundColor: data.color },
          ]}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{data.name}</Text>
          {data.count !== undefined && (
            <Text style={styles.count}>{data.count} 篇文章</Text>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 4,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 2,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  count: {
    fontSize: 12,
    color: '#999',
  },
});

export default LabelCard;

