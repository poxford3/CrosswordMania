import type {ReactElement} from 'react';
import React from 'react';
import { Stack } from 'expo-router';

function LoginNavigator(): ReactElement {

  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='new_account' />
    </Stack>
  );
}

export default LoginNavigator;