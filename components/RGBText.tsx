import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue,
  withTiming,
  withRepeat,
  interpolateColor,
  useAnimatedStyle } from 'react-native-reanimated';

export const RGBText = ({ text }: { text: string }) => {

  const color = useSharedValue<number>(0);
  const duration = 15000; // ms

  const rgbColors: string[] =[
    "#000000", // 0
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#C0C0C0",
    "#808080",
    "#800000",
    "#808000",
    "#008000",
    "#800080",
    "#008080",
    "#000080" // 15
  ]

  const indeces = rgbColors.map((_, index) => index);

  const startLoop = () => {
    color.value = withRepeat(
          withTiming(indeces.length - 1, { duration: duration }), 
          -1,
          true);
  }

  useEffect(() => {
    startLoop();
  }, [color])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(color.value, indeces, rgbColors, "RGB")
    }
  })

    return (
        <Animated.Text style={[{fontSize: 48, textAlign: 'center'}, animatedStyle]}>
          {text}
        </Animated.Text>
    )
  }