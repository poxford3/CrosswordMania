import type {ReactElement} from 'react';
import React from 'react';
import { Stack } from 'expo-router';

function HomeNavigator(): ReactElement {

  return (
    <Stack screenOptions={{
      headerShown: false
    }} />
  );
}

export default HomeNavigator;