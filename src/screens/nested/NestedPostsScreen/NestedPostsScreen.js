import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "./../../../redux/auth/operations";

import PostsScreen from "../PostsScreen/PostsScreen";
import CommentsScreen from "../CommentsScreen/CommentsScreen";
import MapScreen from "../MapScreen/MapScreen";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import createStyles from "./NestedPostsScreenStyles";

const NestedScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { Navigator, Screen } = createStackNavigator();
  const navigation = useNavigation();
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const styles = createStyles(screenDimensions);

  useEffect(() => {
    const handleOrientationChange = ({ window }) => {
      setScreenDimensions(window);
    };
    Dimensions.addEventListener("change", handleOrientationChange);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
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
          headerStyle: styles.header,
          headerLeft: () => (
            <TouchableOpacity style={styles.goBackBtn} onPress={handleGoBack}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Карта",
          headerStyle: styles.header,
          headerLeft: () => (
            <TouchableOpacity style={styles.goBackBtn} onPress={handleGoBack}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  );
};

export default NestedScreen;
