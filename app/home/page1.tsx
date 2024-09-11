import BackButton from '@/components/BackButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default function page1() {
  return (
    <ThemedView>
      <ThemedText>page1</ThemedText>
      <BackButton />
    </ThemedView>
  )
}