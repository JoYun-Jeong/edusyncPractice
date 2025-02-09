import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function SplashScreen({ loaded }) {
  const navigation = useNavigation();
  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(0.8);

  useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.ease,
    });
    logoTranslateY.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  if(loaded) {
    setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 1000);
  }

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoTranslateY.value }],
  }));

  return <View style={styles.container}>
    <Animated.Text style={[styles.logoText, animatedStyle]}>
        EDU{'\n'}SYNC
    </Animated.Text>
    <Text style={styles.subText}>I T I S M E</Text>
  </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#007AFF",
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 35,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        lineHeight: 35
    },
    subText: {
        position: 'absolute',
        bottom: 50,
        color: '#AAAAAA'
    }
});
