import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from './ThemedText';

export function BackButton() {
  return (
    <TouchableOpacity onPress={() => {
      router.back();
    }}>
      <ThemedText>BackButton</ThemedText>
    </TouchableOpacity>
  )
}