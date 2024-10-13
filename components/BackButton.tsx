import React from 'react';
import { Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from './ThemedText';

export function BackButton() {
  return (
    <Pressable onPress={() => {
      router.back();
    }}>
      <ThemedText>BackButton</ThemedText>
    </Pressable>
  )
}