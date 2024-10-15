import { Link } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function Login() {
  return (
    <SafeAreaView style={styles.main}>
      <Text>Login</Text>
      <Link href={"/login/new_account"}>to new account</Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});