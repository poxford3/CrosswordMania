import React, { useEffect, useState } from 'react';
import { Word, createCrossword, Crossword } from '@/utils/crosswordMaker';
import { SafeAreaView, Text, StyleSheet, ViewProps, View } from 'react-native';
import { Letter } from './Letter';
import { ThemedText } from './ThemedText';

export type CrosswordBoardProps = ViewProps & {
  boardSize: number;
  wordsToUse: Word[];
};

const QuestionBox = ({questions}: {questions: {across: Word[], down: Word[]}}) => {
  return (
    <View style={{flexDirection: 'row', padding: 10}}>
        <View style={{padding: 10}}>
          <ThemedText>Across</ThemedText>
          {questions.across.map((acr: Word, idx_a: number) => {
            return (
              <View key={idx_a}>
                <ThemedText>{acr.hint}</ThemedText>
              </View>
            )
            }
          )}
        </View>
        <View>
          <ThemedText>Down</ThemedText>
          {questions.down.map((down: Word, idx_d: number) => {
            return (
              <View key={idx_d}>
                <ThemedText>{down.hint}</ThemedText>
              </View>
            )
            }
          )}
        </View>
      </View>
  )
}

// const CrosswordGrid = ({ words, crossword }: CrosswordBoardProps) => {
//   return (
//     <View>
//       {crossword.map((row, rowIdx) => (
//         <View key={rowIdx} style={styles.row}>
//           {row.map((cell, cellIdx) => (
//             <View>

//             </View>
//           ))}
//         </View>
//       ))}
//     </View>
//   )
// }

export function CrosswordBoard({boardSize, wordsToUse}: CrosswordBoardProps) {
  const [inputs, setInputs] = useState(createCrossword(boardSize, wordsToUse));
  // let {words, crossword} = createCrossword(boardSize, wordsToUse);

  // useEffect(() => {
  //   setInputs(createCrossword(boardSize, wordsToUse));
  // }, [])

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
   },
   row: {

   },
});