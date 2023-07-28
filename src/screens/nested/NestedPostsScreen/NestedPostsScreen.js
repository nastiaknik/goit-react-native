import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import PostsScreen from "../PostsScreen/PostsScreen";
import CommentsScreen from "../CommentsScreen/CommentsScreen";
import MapScreen from "../MapScreen/MapScreen";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import styles from "./NestedPostsScreenStyles";

const NestedScreen = ({ route }) => {
  const { Navigator, Screen } = createStackNavigator();
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleGoBack = () => {
    navigation.navigate("Posts");
  };

  return (
    <Navigator initialRouteName="Posts">
      <Screen
        name="Posts"
        component={PostsScreen}
        initialParams={route.params}
        options={{
          title: "Публікації",
          headerStyle: styles.header,
          headerTitleContainerStyle: styles.headerTitle,
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerBackTitleVisible: false,
          headerBackAllowFontScaling: false,
          headerRight: () => (
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <MaterialIcons
                name="logout"
                size={24}
                color="rgba(189, 189, 189, 1)"
              />
            </TouchableOpacity>
          ),
          headerLeft: () => null,
        }}
      />
      <Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Коментарі",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity style={styles.goBackBtn} onPress={handleGoBack}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Карта",
          headerLeft: () => (
            <TouchableOpacity style={styles.goBackBtn} onPress={handleGoBack}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
        }}
      />
    </Navigator>
  );
};

export default NestedScreen;
