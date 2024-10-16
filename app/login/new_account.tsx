import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput, Button } from 'react-native-paper';
import { useSession } from '@/auth/ctx';
import { router } from 'expo-router';


export default function NewAccount() {

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { signIn } = useSession();

  const handleSubmit = () => {
    console.log('submitted');
    signIn();
    router.replace("/")
  }

  return (
    <ThemedView style={styles.body}>
      <ThemedText type='title'>New Account</ThemedText>
      <TextInput 
        label={"Username"}
        value={username}
        onChangeText={text => setUsername(text)}
        // right={XButton(setUsername)}
        autoComplete={"username"}
        style={{ maxHeight: 100, width: "80%", marginVertical: 5}}
      />
      <TextInput 
        label={"Password"}
        value={password}
        secureTextEntry={true}
        passwordRules={"Ensure password contains 6 characters"}
        onChangeText={text => setPassword(text)}
        autoComplete={"new-password"}
        style={{ maxHeight: 100, width: "80%", marginVertical: 5}}
      />

      <ThemedText>user: {username}</ThemedText>
      <Button onPress={handleSubmit}>Submit</Button>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
   }
});