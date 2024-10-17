import React, { useCallback, useEffect, useRef } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Animated, Easing } from 'react-native';

export default function Test() {

  const colorAnim = useRef(new Animated.Value(0)).current;

  const animateText = useCallback(() => {
    Animated.loop(
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
      )
    ).start()
  }, [colorAnim]);

  useEffect(() => {
    animateText();
    // console.log("Hi")
  }, [animateText]);


  // https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
  function HSVtoRGB(h: number, s: number, v: number) {
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    if (r && g && b) {
      return {
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255)
      };
    }
}

  function rainbow(p: number): string {
      var rgb = HSVtoRGB(p/100.0*0.85, 1.0, 1.0);
      if (rgb) {
        return 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
      }
      return 'rgb(1,1,1)';
  }


  const RGBHeader = () => {

    var color = colorAnim.interpolate({
      inputRange: [0, 1],
      // outputRange: ['#858a91', '#ff33cc']
      outputRange: ['#000000', '#ff33cc']
    });

    
    return (
      <View>
        <Animated.Text style={{
          // transform: [
          //   {
          //     colorAnim: colorAnim.interpolate({
          //       inputRange: [0, 1],
          //       outputRange: ['#858a91', '#ff33cc']
          //     }),
          //   },
          // ],
          color: color, 
          fontSize: 40
          }}>
            HEADER</Animated.Text>
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.body}>
      <RGBHeader />
      <Text>test</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
   }
});