import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Href, router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { FrameSizes } from '@/constants/Sizes';


export type MenuButtonProps = {
  pathName: Href;
  text: string;
  color: string;
};

export function MenuButton({ pathName, text, color }: MenuButtonProps) {

  return (
      <Pressable onPress={() => {
        router.navigate(pathName);
      }}
      style={[ styles.box, {backgroundColor: color} ]}
      >
        <ThemedText type='bigTitle' style={{color: "white"}}>{text}</ThemedText>
      </Pressable>
  )
}

const styles = StyleSheet.create({
  box: {
    width: FrameSizes.normal,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderRadius: 6,
    marginVertical: 10,
  },
  label: {
    color: 'white', 
    fontSize: 30
  }
});