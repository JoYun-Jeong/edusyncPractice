import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import PrimaryAnimatedText from "../components/PrimaryAnimatedText";
import PrimaryInputField from "../components/PrimaryInputField";
import PrimaryButton from "../components/PrimaryButton";
import LinkText from "../components/LinkText";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function LoginScreen({ navigation, onPress }) {
  const anim = useSharedValue(0);
  const opacityAnim = useSharedValue(1);

  function loginFinished() {
    anim.value = withTiming(-200, { duration: 300 });
    opacityAnim.value = withTiming(0, { duration : 300 });
    setTimeout(() => {
        onPress();
    }, 300);
  }

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacityAnim.value,
    transform: [{ translateX: anim.value}]
  }));

  return (
    <Animated.View style={[animatedStyle, {flex: 1}]}>
        <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.container, animatedStyle]}>
          <View style={styles.logoContainer}>
            <PrimaryAnimatedText
              fontSize={30}
              style={styles.primaryAnimatedText}
            >
              EDU SYNC
            </PrimaryAnimatedText>
            <PrimaryAnimatedText fontSize={12} style={styles.subAnimatedText}>
              당신이 수업에 집중할 수 있도록 하는 학생 관리 서비스, 에듀싱크
            </PrimaryAnimatedText>
          </View>
          <PrimaryInputField
            placeholder={"예) Edu_Sync@edusync.com"}
            style={{ marginBottom: 32 }}
          >
            이메일 주소
          </PrimaryInputField>
          <PrimaryInputField>비밀번호</PrimaryInputField>
          <PrimaryButton onPress={loginFinished}>로그인</PrimaryButton>
          <View style={styles.linksContainer}>
            <LinkText>회원가입</LinkText>
            <LinkText>비밀번호 찾기</LinkText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 96,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  primaryAnimatedText: {
    fontSize: 30,
  },
  subAnimatedText: {
    fontSize: 10,
    marginTop: 10,
    color: "#000000AA",
  },
  linksContainer: {
    flexDirection: "row",
  },
});
