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
  return (
    <>
      <Header />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => {
            const currentWidth = route.name === 'Home' ? homeWidth : 50;
            const tabWidth = screenWidth / tabCount;
            const translateX = (tabWidth - currentWidth) / 2;
            return {
                tabBarIndicatorStyle: {
                    backgroundColor: "black",
                    width: route.name === "Home" ? homeWidth : 50,
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
            component={ClassManagementScreen}
            options={{ title: "수업 관리" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
