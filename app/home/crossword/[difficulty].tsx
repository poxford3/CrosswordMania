import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createCrossword, Word } from '@/utils/crosswordMaker';
import { CrosswordBoard } from '@/components/CrosswordBoard';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';


export default function CrosswordView() {

  const { difficulty } = useLocalSearchParams();

  // const words_in = [
  //   {answer: "ONE", hint: "one"} as Word,
  //   {answer: "TWO", hint: "two"} as Word,
  //   {answer: "THREE", hint: "three"} as Word,
  //   {answer: "FOUR", hint: "four"} as Word,
  //   {answer: "FIVE", hint: "five"} as Word
  // ]

  let a: Word = {answer: "ELEPHANT", hint: "elephant"};
  let b: Word = {answer: "FAST", hint: "fast"};
  let c: Word = {answer: "TABLES", hint: "tables"};
  let d: Word = {answer: "QUICK", hint: "quick"};
  let e: Word = {answer: "EAT", hint: "eat"};
  let f: Word = {answer: "DOG", hint: "dog"};
  let g: Word = {answer: "SMILE", hint: "smile"};
  let h: Word = {answer: "BUDDY", hint: "buddy"};
  const words_in: Word[] = [
    a,b,c,d,e,f,g,h,
    // {answer: "hey", hint: "hey"} as Word // option to define list
  ];

  let boardSize: number;
  if ( difficulty === "easy") {
    boardSize = 10;
  } else if ( difficulty === "medium" ) {
    boardSize = 15;
  } else {
    boardSize = 20; // hard
  }

  const [words, setWords] = useState<Word[]>(createCrossword(boardSize, words_in).words)


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