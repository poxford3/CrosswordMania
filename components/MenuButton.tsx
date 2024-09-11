import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Href, router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { FrameSizes } from '@/constants/Sizes';


export type MenuButtonProps = {
  pathName: Href;
  text: string;
  color: string;
};

export default function MenuButton({ pathName, text, color }: MenuButtonProps) {

  return (
      <TouchableOpacity onPress={() => {
        router.navigate(pathName);
      }}
      style={[ styles.box, {backgroundColor: color} ]}
      >
        <ThemedText type='title' style={{color: "white"}}>{text}</ThemedText>
      </TouchableOpacity>
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