/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useMemo, useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen } from './modules/home';
import BottomTabBar, {
  BottomTabConfig,
} from './core/navigation/BottomTabBar';
import {
  DiscoverIcon,
  HomeIcon,
  MessageIcon,
  MineIcon,
  VideoIcon,
} from './shared/icons/TabIcons';
import { PlaceholderScreen } from './shared/components';

const VideoPlaceholder = () => (
  <PlaceholderScreen title="视频" description="视频内容正在搭建中，敬请期待～" />
);

const DiscoverPlaceholder = () => (
  <PlaceholderScreen title="发现" description="更多精彩内容即将上线" />
);

const MessagePlaceholder = () => (
  <PlaceholderScreen
    title="消息中心"
    description="你还没有新的消息，去逛逛社区吧"
  />
);

const ProfilePlaceholder = () => (
  <PlaceholderScreen title="我的主页" description="登录后即可查看个人信息" />
);

type TabRoute = BottomTabConfig & {
  component: React.ComponentType;
};

const TAB_ROUTES: TabRoute[] = [
  { key: 'home', label: '微博', icon: HomeIcon, component: HomeScreen },
  { key: 'video', label: '视频', icon: VideoIcon, component: VideoPlaceholder },
  {
    key: 'discover',
    label: '发现',
    icon: DiscoverIcon,
    component: DiscoverPlaceholder,
  },
  {
    key: 'message',
    label: '消息',
    icon: MessageIcon,
    component: MessagePlaceholder,
    badge: 8,
  },
  { key: 'profile', label: '我', icon: MineIcon, component: ProfilePlaceholder },
];

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [activeTab, setActiveTab] = useState<string>(TAB_ROUTES[0].key);
  const ActiveScreen = useMemo(
    () =>
      TAB_ROUTES.find((tab) => tab.key === activeTab)?.component ||
      TAB_ROUTES[0].component,
    [activeTab],
  );
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.content}>
          <ActiveScreen />
        </View>
        <BottomTabBar
          tabs={TAB_ROUTES}
          activeKey={activeTab}
          onTabPress={(key) => setActiveTab(key)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});

export default App;
