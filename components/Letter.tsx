import { View, Text, StyleSheet, ViewProps } from 'react-native';

export type LetterProps = ViewProps & {
    letter: string;
    idx: number
};

export function Letter({letter, idx}: LetterProps) {
  const re = new RegExp("[^a-zA-Z]", "i");
  let text2show: string = letter.replace(re, "");
  // console.log(text2show);
  return (
    <View style={styles.body} key={idx}>
      {idx == 0 ?<Text style={styles.xnum}>{idx}</Text> : null}
      <Text>{text2show}</Text>
    </View>
  )
}
const BOX_SIZE: number = 30
const styles = StyleSheet.create({
  body: {
    height: BOX_SIZE,
    width: BOX_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  xnum: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 10
  },
})