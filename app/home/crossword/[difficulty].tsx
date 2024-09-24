import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function CorsswordView() {

  const { difficulty } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.body}>
      <Text>CorsswordView</Text>
      <Text>{difficulty}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
   }
});