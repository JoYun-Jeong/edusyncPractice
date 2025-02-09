import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function PrimaryAnimatedText({ children, fontSize, style }) {
  const anim1 = useSharedValue(-50);
  const anim2 = useSharedValue(0);

  useEffect(() => {
    anim1.value = withTiming(-5, {
      duration: 5000,
      easing: Easing.out(Easing.exp),
    });
    anim2.value = withTiming(0, {
      duration: 2000,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const anim1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: anim1.value }, { translateX: anim1.value }],
    color: "#00000022",
  }));

  const anim2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: anim2.value }],
    color: "#000000",
  }));

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.animText, anim1Style, style]}
      >
        {children}
      </Animated.Text>
      <Animated.Text
        style={[styles.animText, anim2Style, style]}
      >
        {children}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    minHeight: 40
  },
  animText: {
    fontStyle: "italic",
    position: "absolute",
    fontWeight: "bold",
  },
});
