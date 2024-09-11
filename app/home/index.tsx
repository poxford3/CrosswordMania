import MenuButton from '@/components/MenuButton';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <ThemedView style={styles.main}>
      <MenuButton pathName={"/home/page1"} color={"purple"} text="Play" />
      <MenuButton pathName={"/home/page2"} color={"green"} text="Saved" />
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