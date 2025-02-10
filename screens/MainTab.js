import { NavigationContainer } from "@react-navigation/native";
import Header from "../components/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { enableScreens } from "react-native-screens";
import HomeScreen from "./HomeScreen";
import ClassManagementScreen from "./ClassManagementScreen";
import { useState } from "react";
import { Dimensions, Text } from "react-native";

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get('window').width;
const tabCount = 2;

enableScreens();

export default function MainTab() {
  const [homeWidth, setHomeWidth] = useState(0);
  const [classManagementWidth, setClassManagementWidth] = useState(0);

  const [isAddNewClassBtnPressed, setIsAddNewClassBtnPressed] = useState(false);
  const [stacks, setStacks] = useState([]);

  return (
    <>
      <Header />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => {
            const currentWidth = route.name === 'Home' ? homeWidth : classManagementWidth;
            const tabWidth = screenWidth / tabCount;
            const translateX = route.name === 'Home' ? (tabWidth - currentWidth) / 2 - 5 : (tabWidth + classManagementWidth);
            return {
                tabBarIndicatorStyle: {
                    backgroundColor: "black",
                    width: route.name === "Home" ? homeWidth + 10 : classManagementWidth + 10,
                    position: "absolute",
                    transform: [{translateX}]
                  }
            }
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "홈",
              tabBarLabel: ({ color }) => (
                <Text onLayout={(event) => setHomeWidth(event.nativeEvent.layout.width)}>
                    홈
                </Text>
              )
            }}
          />
          <Tab.Screen
            name="ClassManagement"
            options={{ title: "수업 관리",
              tabBarLabel: ({ color }) => (
                <Text onLayout={(event) => setClassManagementWidth(event.nativeEvent.layout.width)}>
                  수업 관리
                </Text>
              )
             }}
          >
            {() => <ClassManagementScreen addNewClassBtnPress={(stackName) => {
              setIsAddNewClassBtnPressed(true);
              setStacks((prevStacks) => [...prevStacks, stackName]);
            }}/>}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
