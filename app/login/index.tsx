import { Link } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default function Login() {
  return (
    <SafeAreaView>
      <Text>Login</Text>
      <Link href={"/login/new_account"}>to new account</Link>
    </SafeAreaView>
  )
}