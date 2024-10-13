import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Settings } from '@/components/Settings';
import { MenuButton } from '@/components/MenuButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SettingsGear } from '@/components/SettingsGear';

export default function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };


  return (
    <ThemedView style={styles.main}>
      <MenuButton pathName={"/home/crossword/easy"} color={"blue"} text="Easy" />
      <MenuButton pathName={"/home/crossword/medium"} color={"red"} text="Medium" />
      <MenuButton pathName={"/home/crossword/hard"} color={"gray"} text="Hard" />
      <SettingsGear setModal={toggleModal}>
        <Settings setModal={toggleModal} isVisible={modalOpen} />
      </SettingsGear>
      <View style={styles.footerContainer}>
        <ThemedText>hi</ThemedText>
        </View>
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