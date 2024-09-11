import BackButton from '@/components/BackButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default function page2() {
  return (
    <ThemedView>
      <ThemedText>page2</ThemedText>
      <BackButton />
    </ThemedView>
  )
}