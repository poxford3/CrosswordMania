import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsGear() {
  return (
    <View style={styles.body}>
      <Text>SettingsGear</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
   }
});