import { MenuButton } from '@/components/MenuButton';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <ThemedView style={styles.main}>
      <MenuButton pathName={"/home/crossword/easy"} color={"blue"} text="Easy" />
      <MenuButton pathName={"/home/crossword/medium"} color={"red"} text="Medium" />
      <MenuButton pathName={"/home/crossword/hard"} color={"gray"} text="Hard" />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});