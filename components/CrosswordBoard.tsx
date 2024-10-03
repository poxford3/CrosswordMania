import React, { useState } from 'react';
import { Word, createCrossword } from '@/utils/crosswordMaker';
import { SafeAreaView, Text, StyleSheet, ViewProps, View } from 'react-native';
import { Letter } from './Letter';

export type CrosswordBoardProps = ViewProps & {
  boardSize: number;
  wordsToUse: Word[];
};

const QuestionBox = ({questions}: {questions: {across: Word[], down: Word[]}}) => {
  return (
    <View style={{flexDirection: 'row', padding: 10}}>
        <View style={{padding: 10}}>
          <Text>Across</Text>
          {questions.across.map((acr: Word, idx_a: number) => {
            return (
              <View key={idx_a}>
                <Text>{acr.hint}</Text>
              </View>
            )
            }
          )}
        </View>
        <View>
          <Text>Down</Text>
          {questions.down.map((down: Word, idx_d: number) => {
            return (
              <View key={idx_d}>
                <Text>{down.hint}</Text>
              </View>
            )
            }
          )}
        </View>
      </View>
  )
}

export function CrosswordBoard({boardSize, wordsToUse}: CrosswordBoardProps) {
  const [inputs, setInputs] = useState(createCrossword(boardSize, wordsToUse));
  // let {words, crossword} = createCrossword(boardSize, wordsToUse);

  const questions = { 
    across: [] as Word[], 
    down: [] as Word[]
  }
  let acrossCount = 1;
  let downCount = 1;

  // get words in separate lists
  // 
  for (let i=0; i<inputs.words.length; i++) {
    if (inputs.words[i].orientation === 0) { // vertical
      inputs.words[i].position = downCount;
      questions.down.push(inputs.words[i]);
      downCount++;
    } else { // horizontal
      inputs.words[i].position = acrossCount;
      questions.across.push(inputs.words[i]);
      acrossCount++;
    }
  }

  return (
    <View style={styles.body}>
      <QuestionBox questions={questions} />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1
   }
});