import type {ReactElement} from 'react';
import React from 'react';
import { Stack } from 'expo-router';

function HomeNavigator(): ReactElement {

  return (
    // <Stack screenOptions={{
    //   headerShown: false
    // }} />
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='index' />
      {/* <Stack.Screen name='page1' />
      <Stack.Screen name='page2' /> */}
      <Stack.Screen name='crossword/[difficulty]' />
    </Stack>
  );
}

export default HomeNavigator;