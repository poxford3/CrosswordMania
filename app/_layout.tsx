import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerStyle: {
          backgroundColor: 'black'
        }
      }} />
      <Stack.Screen name="login" options={{
        headerShown: false
      }} />
      <Stack.Screen name="home" options={{
        headerShown: false
      }} />
    </Stack>
  );
}
