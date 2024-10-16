import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { useSession } from '@/auth/ctx';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function SignIn() {

  const { signIn } = useSession();

  return (
    <ThemedView style={styles.main}>
      <Pressable style={styles.button} onPress={() =>{
        signIn();
        // implement sign-in logic here for different auth
        // check success before next line
        router.replace("/")
      }}>
        <ThemedText>Sign In</ThemedText>
      </Pressable>
      <Pressable style={styles.button} onPress={() =>{
        router.navigate("/login/new_account")
      }}>
        <ThemedText>Create account</ThemedText>
      </Pressable>
      {/* <Link href={"/login/new_account"}>to new account</Link> */}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    margin: 10,
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});