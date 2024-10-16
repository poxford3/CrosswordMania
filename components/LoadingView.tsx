import React, { useContext, useEffect, useMemo, useCallback } from "react";
import { View, Text, StyleSheet, Animated, Easing, Image } from "react-native";

import { useThemeColor } from '@/hooks/useThemeColor';


export function LoadingView() {
  const textColor = useThemeColor({}, 'text');
  const loadingColor = useThemeColor({}, 'background');

  const rotate = useMemo(() => new Animated.Value(0), []);

  // functionality borrowed from
  // https://github.com/MatheusPires99/pokedex
  const rotateLoading = useCallback(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 360,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotate]);

  useEffect(() => {
    rotateLoading();
  }, [rotateLoading]);

  return (
    <View
      style={[styles.loading, { backgroundColor: loadingColor }]}
    >
      {/* <ActivityIndicator
        size="large"
        animating={true}
        style={{ padding: 10 }}
        color={activeColors.accent}
      />
      <Text style={{ color: activeColors.textColor }}>Loading...</Text> */}
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotate.interpolate({
                inputRange: [0, 360],
                outputRange: ["0deg", "360deg"],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Image
          source={require("../assets/images/react-logo.png")}
          style={{ height: 50, width: 50 }}
        />
      </Animated.View>
      <Text style={{ color: textColor }}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});