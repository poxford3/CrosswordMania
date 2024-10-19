import React from 'react';
import { Text, StyleSheet, Modal, Button } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type SettingsProps = {
  isVisible: boolean;
  setModal: () => void;
}

export function SettingsModal({isVisible, setModal}: SettingsProps) {
  return (
    <Modal animationType="slide" visible={isVisible}>
      <ThemedView style={styles.body}>
        <ThemedText type='title'>Settings to do</ThemedText>
        <Button onPress={setModal} title="close modal" />
      </ThemedView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
   }
});