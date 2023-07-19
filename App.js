import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import PostsScreen from "./screens/PostsScreen/PostsScreen";
import CreatePostsScreen from "./screens/CreatePostsScreen/CreatePostsScreen";
import CommentsScreen from "./screens/CommentsScreen/CommentsScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import MapScreen from "./screens/MapScreen/MapScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

export default function App() {
  const { Screen, Navigator } = createStackNavigator();

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Navigator>
          <Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Screen
            name="Posts"
            component={PostsScreen}
            options={{ title: "Публікації" }}
          />
          <Screen
            name="CreatePosts"
            component={CreatePostsScreen}
            options={{ title: "Створити публікацію" }}
          />
          <Screen
            name="Comments"
            component={CommentsScreen}
            options={{ title: "Коментарі" }}
          />
          <Screen name="Profile" component={ProfileScreen} />
          <Screen name="Map" component={MapScreen} />
          <Screen name="Home" component={HomeScreen} />
        </Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
