import React, { useCallback, useEffect, useRef } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';

export default function Test() {


  return (
    <SafeAreaView style={styles.body}>
      <Text>test</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'black'
   }
});