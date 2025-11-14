import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconProps } from '../../shared/icons/TabIcons';

export interface BottomTabConfig {
  key: string;
  label: string;
  icon: React.ComponentType<IconProps>;
  badge?: number;
}

interface BottomTabBarProps {
  tabs: BottomTabConfig[];
  activeKey: string;
  onTabPress: (key: string, event?: GestureResponderEvent) => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  tabs,
  activeKey,
  onTabPress,
}) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 10);

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        const Icon = tab.icon;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.8}
            style={styles.tabItem}
            onPress={(event) => onTabPress(tab.key, event)}
          >
            <View style={styles.iconWrapper}>
              <Icon active={active} />
              {typeof tab.badge === 'number' && tab.badge > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  labelActive: {
    color: '#ff7a00',
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: -4,
    minWidth: 16,
    paddingHorizontal: 4,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ff4d4f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
  },
});

export default BottomTabBar;


