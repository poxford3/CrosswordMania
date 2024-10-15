import React, { useState } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';

type SettingsGearProps = {
  children: React.ReactNode;
  setModal: () => void;
}

export function SettingsGear({ setModal, children, ...props }: SettingsGearProps) {

  const gearColor = useThemeColor({}, 'text');

  return (
    <View style={styles.body} {...props}>
      <Pressable onPress={setModal}>
        <Ionicons name='settings' color={gearColor} size={30}/>
      </Pressable>
      {children}
  </View>
  )
}

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    bottom: 30,
    right: 30,
   },

});