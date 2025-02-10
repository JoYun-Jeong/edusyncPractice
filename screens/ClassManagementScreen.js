import { memo, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { classManagementDummy } from "../data/dummy-data";
import PrimaryButton from "../components/PrimaryButton";
import { SwipeListView } from "react-native-swipe-list-view";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

function RenderCMItem({ studName, subject, date, time }) {
  const [hiddenItemHeight, setHiddenItemHeight] = useState(0);
  const translateX = useSharedValue(0);

  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.translationX < -100) {
      translateX.value = withSpring(-100);
    } else {
      translateX.value = withSpring(0);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[styles.hiddenButtonContainer, { height: hiddenItemHeight }]}
      >
        <Pressable style={[styles.editButton, { height: hiddenItemHeight }]}>
          <Text>수정</Text>
        </Pressable>
        <Pressable style={[styles.deleteButton, { height: hiddenItemHeight }]}>
          <Text>삭제</Text>
        </Pressable>
      </View>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View
          style={[styles.renderCMItemContainer, animatedStyle]}
          onLayout={(event) =>
            setHiddenItemHeight(event.nativeEvent.layout.height)
          }
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {studName} 학생
          </Text>
          <Text style={{ fontSize: 12, color: "gray" }}>
            {subject} | {date} {time}
          </Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

export default function ClassManagementScreen({ addNewClassBtnPress }) {
  const [classManagementData, setClassManagementData] =
    useState(classManagementDummy);
  const cnt = useRef(4);
  const scrollViewRef = useRef(null);

  const stackTranslateXAnim = useSharedValue(0);
  const stackOpacityAnim = useSharedValue(1);

  function addClassManagementData(studName, subject, date, time) {
    if (
      studName !== undefined &&
      subject !== undefined &&
      date !== undefined &&
      time !== undefined
    ) {
      setClassManagementData((prevData) => [
        ...prevData,
        { id: ++cnt.current, studName, subject, date, time },
      ]);
    }
  }

  function stackToAddClassScreen() {
    stackOpacityAnim.value = withTiming(0, { duration: 300 });
    stackTranslateXAnim.value = withTiming(-150, { duration: 300 });
    addNewClassBtnPress('ClassManagement');
  }

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: stackOpacityAnim.value,
    transform: [{ translateX: stackTranslateXAnim.value }],
  }));

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <FlatList
        ref={scrollViewRef}
        rightOpenValue={-150}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={classManagementData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <RenderCMItem {...item} />
          </View>
        )}
        ListFooterComponent={
          <View>
            <PrimaryButton
              style={styles.buttonStyle}
              textStyle={{ color: "#3674B5" }}
              onPress={stackToAddClassScreen}
            >
              수업 추가하기
            </PrimaryButton>
          </View>
        }
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  renderCMItemContainer: {
    paddingVertical: 16,
    gap: 8,
    backgroundColor: "white",
    marginTop: 16,
    borderRadius: 8,
    shadowColor: "lightgray",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    paddingHorizontal: 24,
  },
  buttonStyle: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    alignSelf: "center",
    backgroundColor: "#A9B5DFAA",
  },
  hiddenButtonContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#00000033",
    paddingHorizontal: 8,
    justifyContent: "center",
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
  },
});
