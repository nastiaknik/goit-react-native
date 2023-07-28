import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import Authorization from "./src/screens/auth/Auth";
import HomeScreen from "./src/screens/main/HomeScreen/HomeScreen";

export default function App() {
  const { Screen, Navigator } = createStackNavigator();

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Navigator>
          <Screen
            name="Authorization"
            component={Authorization}
            options={{ headerShown: false }}
          />
          <Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
