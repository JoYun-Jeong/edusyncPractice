import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import HomeScreen from "./HomeScreen";
import ClassManagementScreen from "./ClassManagementScreen";
import StudentManagementScreen from "./StudentManagementScreen";
import MyPageScreen from "./MyPageScreen";
import Header from "../components/Header";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useState } from "react";

const renderScene = SceneMap({
  home: HomeScreen,
  class: ClassManagementScreen,
  student: StudentManagementScreen,
  mypage: MyPageScreen,
});

export default function MainTab() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "홈" },
    { key: "class", title: "수업관리" },
    { key: "student", title: "학생관리" },
    { key: "mypage", title: "마이페이지" },
  ]);
  return (
    <>
      <Header />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "#fff" }}
            labelStyle={{ fontSize: 14, fontWeight: "bold", color: "black" }}
            indicatorStyle={{ backgroundColor: "blue" }} // ✅ 선택된 탭 아래 강조선
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
