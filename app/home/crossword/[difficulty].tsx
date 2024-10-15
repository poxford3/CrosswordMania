import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Word } from '@/utils/crosswordMaker';
import { CrosswordBoard } from '@/components/CrosswordBoard';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';


export default function CrosswordView() {

  const { difficulty } = useLocalSearchParams();

  const words = [
    {answer: "ONE", hint: "one"} as Word,
    {answer: "TWO", hint: "two"} as Word,
    {answer: "THREE", hint: "three"} as Word,
    {answer: "FOUR", hint: "four"} as Word,
    {answer: "FIVE", hint: "five"} as Word
  ]

  let boardSize: number;
  if ( difficulty === "easy") {
    boardSize = 10;
  } else if ( difficulty === "medium" ) {
    boardSize = 15;
  } else {
    boardSize = 20; // hard
  }


  return (
    <ThemedView style={styles.body}>
      <ThemedText>CrosswordView</ThemedText>
      <ThemedText>{difficulty}</ThemedText>
      <ThemedText>{boardSize}</ThemedText>
      <CrosswordBoard boardSize={boardSize} wordsToUse={words} />
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