/**
 * Category 卡片组件
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Category } from '../../services/category.service';

interface CategoryCardProps {
  data: Category;
  onPress?: (data: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(data)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{data.name}</Text>
        {data.description && (
          <Text style={styles.description} numberOfLines={2}>
            {data.description}
          </Text>
        )}
        {data.count !== undefined && (
          <Text style={styles.count}>{data.count} 篇文章</Text>
        )}
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
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  count: {
    fontSize: 12,
    color: '#999',
  },
});

export default CategoryCard;

