import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { RGBText } from '@/components/RGBText';
import { Speaker } from '@/components/Speaker';
import { SettingsModal } from '@/components/SettingsModal';
import { MenuButton } from '@/components/MenuButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SettingsGear } from '@/components/SettingsGear';

import { useSession } from '@/auth/ctx';


export default function Home() {
  const { signOut } = useSession();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };


  return (
    <ThemedView style={styles.main}>
      <View>
        <RGBText text={"Crossword Mania"} />
      </View>
      <MenuButton pathName={"/home/crossword/easy"} color={"blue"} text="Easy" />
      <MenuButton pathName={"/home/crossword/medium"} color={"red"} text="Medium" />
      <MenuButton pathName={"/home/crossword/hard"} color={"gray"} text="Hard" />
      {/* <MenuButton pathName={"/_sitemap"} color={"purple"} text="All sites" /> */}
      <Pressable onPress={() => {
        signOut();
      }}>
        <ThemedText>Sign Out</ThemedText>
      </Pressable>
      {/* <View style={styles.footerContainer}>
        <ThemedText>hi</ThemedText>
      </View> */}
      <SettingsGear setModal={toggleModal}>
        <SettingsModal setModal={toggleModal} isVisible={modalOpen} />
      </SettingsGear>
      <Speaker />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});