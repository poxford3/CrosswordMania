import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Crossword, Word, createCrossword } from '@/utils/crosswordMaker';


export default function CorsswordView() {

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

  let newCrossword: Crossword = createCrossword(boardSize, words);

  const Body = () => {
    return (
      <>
        {newCrossword.map((row: string[]) => {
          row.map((val: string, index) => {
            return (
              <Text key={index}>{val != "~" ? val : ""}</Text>
            )
          })
        })}
      </>
    )
  }

  return (
    <SafeAreaView style={styles.body}>
      <Text>CorsswordView</Text>
      <Text>{difficulty}</Text>
      <Text>{boardSize}</Text>
      <Body />
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