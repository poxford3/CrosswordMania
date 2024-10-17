import React from "react";
import { Redirect, Stack } from "expo-router";
import { LoadingView } from "@/components/LoadingView";
import { SessionProvider, useSession } from "@/auth/ctx";

export default function RootLayout() {

  return (
    <SessionProvider>
      <Stack screenOptions={{
        headerShown: false
      }}>
        {/* <Stack.Screen name="index" /> */}
        <Stack.Screen name="home" />
        <Stack.Screen name="test" />
        <Stack.Screen name="login" />
      </Stack>
    </SessionProvider>
  );
}
