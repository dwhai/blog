/**
 * 登录页面
 */
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import LoginForm from '../components/LoginForm';

const LoginScreen: React.FC = () => {
  const handleLoginSuccess = () => {
    // TODO: 导航到主页
    console.log('Login success');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LoginForm onSuccess={handleLoginSuccess} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoginScreen;

