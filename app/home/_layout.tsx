import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '@/auth/ctx';
import { LoadingView } from '@/components/LoadingView';

function HomeNavigator() {

  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingView />;
  }

    // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='crossword/[difficulty]' />
    </Stack>
  );
}

export default HomeNavigator;