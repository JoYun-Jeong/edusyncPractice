import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import { useFonts } from "expo-font";
import LoginScreen from "./screens/LoginScreen";
import MainTab from "./screens/MainTab";
import Header from "./components/Header";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    RobotoItalic: require("./assets/fonts/RobotoItalic.ttf"),
    Roboto: require("./assets/fonts/Roboto.ttf"),
  });

  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? (
    <MainTab />
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" options={{ headerShown: false }}>
          {(props) => <SplashScreen {...props} loaded={loaded} />}
        </Stack.Screen>
        <Stack.Screen
          name="LoginScreen"
          component={() => (
            <LoginScreen
              onPress={() => {
                setIsLogin(true);
              }}
            />
          )}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
