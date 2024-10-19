import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { storeData, getData } from '@/utils/asyncStorage';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Pressable } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export function Speaker() {

  const speakerColor = useThemeColor({}, 'text');

  // TODO refactor to set the initial state of the soundOn using a function instead
  // of null then passing value into
  const [soundOn, setSoundOn] = useState<string>();
  const [sound, setSound] = useState<Audio.Sound>();

  async function playSound() {
    console.log('play')
    const { sound } = await Audio.Sound.createAsync( require('../assets/music/sample-9s.mp3')
    );
    setSound(sound);

    // console.log('Playing Sound');
    await sound.playAsync();
  }


  function pauseSound() {
    console.log('pause')
    if (!sound) return;

    sound.pauseAsync();
  };


  async function getSoundPref() {
    try {
      const soundPref = await getData("volume-pref");

      if (soundPref) {
        console.log(soundPref, 'pref')
        setSoundOn(soundPref);
        soundOn === "on" ? playSound() : pauseSound();
      }
    } catch ({ message }) {
      console.log("fetch sound pref poke error", message);
    }
  }

  useEffect(() => {
    getSoundPref();

    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
  }, []);

  useEffect(() => {
    return sound
    ? () => {
        // console.log('Unloading Sound');
        sound.unloadAsync();
      }
    : undefined;
  }, [sound])


  const toggleMusic = () => {
    if (soundOn === "on") {
      storeData("volume-pref", "off");
      pauseSound();
    } else {
      storeData("volume-pref", "on");
      playSound();
    }
    setSoundOn(soundOn === "on" ? "off": "on");
  }

  return (
    <View style={styles.body}>
      <Pressable onPress={toggleMusic}>
        <Ionicons name={soundOn === "on" ? 'volume-high-outline': 'volume-mute-outline'} color={speakerColor} size={30} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    bottom: 30,
    left: 30,
   }
});