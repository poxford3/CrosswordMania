import React, { ReactElement, useEffect, useState } from 'react';
import { Word, createCrossword, Crossword } from '@/utils/crosswordMaker';
import { SafeAreaView, Text, StyleSheet, ViewProps, View, TextInput, Pressable } from 'react-native';
import { Letter } from './Letter';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

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

const generateInitialGrid = (boardSize: number, words: Word[]) => {
   const initialGrid = Array(boardSize - 1)
    .fill(0)
    .map(() => Array(boardSize).fill("X"));

    words.forEach((word) => {
      if (word.startx !== undefined && 
          word.starty !== undefined && 
          word.orientation !== undefined) {

        let x = word.startx - 1;
        let y = word.starty - 1;

        for (let i = 0; i < word.answer.length; i++) {
          if (word.orientation === 1) {
            initialGrid[y][x + i] = "";
          } else if (word.orientation === 0) {
            initialGrid[y + i][x] = "";
          }
        }
      }
    });

    return initialGrid;
}

const generateAnswerGrid = (boardSize: number, words: Word[]) => {
  const answerGrid = Array(boardSize - 1)
  .fill(0)
  .map(() => Array(boardSize).fill("X"));

  words.forEach((word) => {
    if (word.startx !== undefined && 
        word.starty !== undefined && 
        word.orientation !== undefined) {

      let x = word.startx - 1;
      let y = word.starty - 1;

      for (let i = 0; i < word.answer.length; i++) {
        if (word.orientation === 1) {
          answerGrid[y][x + i] = word.answer[i];
        } else if (word.orientation === 0) {
          answerGrid[y + i][x] = word.answer[i];
        }
      }
    }
  });

  return answerGrid
}

export function CrosswordBoard({boardSize, wordsToUse}: CrosswordBoardProps) {
  const [inputs, setInputs] = useState(createCrossword(boardSize, wordsToUse));
  const [grid, setGrid] = useState(generateInitialGrid(boardSize, wordsToUse));

  useEffect(() => {
    setGrid(generateInitialGrid(
              boardSize, 
              createCrossword(boardSize, wordsToUse).words)
              );
  }, [wordsToUse]);

  const handleInputChange = (row: number, col: number, text: string) => {
    const newGrid = [...grid];
    newGrid[row][col] = text.toUpperCase();
    setGrid(newGrid);
  }

  const handleGenerate = () => {
    setGrid(generateInitialGrid(boardSize, wordsToUse));
  };

  const handleVerify = () => {
    const answerGrid = generateAnswerGrid(boardSize, wordsToUse);
    const isCorrect = JSON.stringify(grid) === JSON.stringify(answerGrid);

    if (isCorrect) {
      alert("correct");
    } else {
      alert("wrong");
    }
  }

  const handleSolve = () => {
    const answerGrid = generateAnswerGrid(boardSize, wordsToUse);
    setGrid(answerGrid);
  }

  const renderGrid = () => {
    return (
      <View>
        {grid.map((row: string[], rowIdx: number) => {
          return (
          <View key={rowIdx} style={styles.row}>
            {row.map((cell: string, colIdx: number) => {
              return (
                <View key={colIdx} style={styles.cellCont}>
                  {wordsToUse.map((entry) => {
                    if (rowIdx + 1 == entry.starty && colIdx + 1 == entry.startx) {
                      return (
                        <ThemedText key={`digit-${entry.position}`} style={styles.smallDigit}>
                          {entry.position}
                        </ThemedText>
                      );
                    }
                    return null;
                  })}
                  <TextInput
                    style={[
                      styles.cell,
                      grid[rowIdx][colIdx] === "X" ? styles.staticCell : null,
                    ]}
                    value={cell}
                    editable={grid[rowIdx][colIdx] !== "X"}
                    onChangeText={(text) => {
                      handleInputChange(rowIdx, colIdx, text)
                    }}
                    maxLength={1}
                  />
                </View>
              )
            })}
            </View>
          )
        })}
      </View>
    )
  }

  const renderQuestions = () => {
    // 0th array: vertical/down, 1st array: horizontal/across
    const questions: ReactElement[][] = [ [], [] ];

    wordsToUse.forEach(( word ) => {
      const questionText = `${word.position}. ${word.hint}`;
      if (word.orientation !== undefined) {
        questions[word.orientation].push(
          <ThemedText key={`question-${word.position}`} style={styles.questionText}>
            {questionText}
          </ThemedText>
        )
      }
    })

    return (
      <ThemedView>
        <View style={styles.headingCont}>
          <ThemedText type='title'>
            Across
          </ThemedText>
        </View>
        <View>
          {questions[1].map((question, idx) => (
            <View key={`across-question-container-${idx}`}>
              {question}
            </View>
          ))}
        </View>
        <View style={styles.headingCont}>
          <ThemedText type='title'>
            Down
          </ThemedText>
        </View>
        <View>
          {questions[0].map((question, idx) => (
            <View key={`down-question-container-${idx}`}>
              {question}
            </View>
          ))}
        </View>
      </ThemedView>
    )
  }

  return (
    <ThemedView>
      {renderQuestions()}
      {renderGrid()}
      <View>
        <Pressable
          onPress={handleGenerate}
          style={styles.button}
        >
          <ThemedText>Generate</ThemedText>
        </Pressable>
        <View style={styles.gap} />
        <Pressable
          onPress={handleVerify}
          style={styles.button}
        >
          <ThemedText>Verify</ThemedText>
        </Pressable>
        <View style={styles.gap} />
        <Pressable
          onPress={handleGenerate}
          style={styles.button}
        >
          <ThemedText>Reset</ThemedText>
        </Pressable>
        <View style={styles.gap} />
        <Pressable
          onPress={handleSolve}
          style={styles.button}
        >
          <ThemedText>Solve</ThemedText>
        </Pressable>
        <View style={styles.gap} />
      </View>
    </ThemedView>
  )

  // const questions = { 
  //   across: [] as Word[], 
  //   down: [] as Word[]
  // }

  // // get words in separate lists
  // // 
  // for (let i=0; i<inputs.words.length; i++) {
  //   if (inputs.words[i].orientation === 0) { // vertical
  //     questions.down.push(inputs.words[i]);
  //   } else { // horizontal
  //     questions.across.push(inputs.words[i]);
  //   }
  // }

  // return (
  //   <View style={styles.body}>
  //     <QuestionBox questions={questions} />
  //   </View>
  // )
}

const styles = StyleSheet.create({
  body: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1
   },
   row: {},
   cell: {},
   cellCont: {},
   smallDigit: {},
   staticCell: {},
   questionText: {},
   headingCont: {},
   button: {
    flex: 1,
    backgroundColor: 'gray'
   },
   gap: {
    width: 10, // Adjust the width as needed for the desired gap
  },
});