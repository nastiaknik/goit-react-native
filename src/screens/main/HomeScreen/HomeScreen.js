import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";

import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import NestedPostsScreen from "../../nested/NestedPostsScreen/NestedPostsScreen";

import { AntDesign, SimpleLineIcons, Feather } from "@expo/vector-icons";
import createStyles from "./HomeScreenStyles";

const HomeScreen = ({ route }) => {
  const { Navigator, Screen } = createBottomTabNavigator();
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

  const handleGoBack = () => {
    navigation.navigate("Nested");
  };

  return (
    <Navigator
      sceneContainerStyle={styles.container}
      initialRouteName="Nested"
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6C00",
        tabBarStyle: { minHeight: 71 },
      })}
    >
      <Screen
        name="Nested"
        component={NestedPostsScreen}
        initialParams={route.params}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Comments" || routeName === "Map") {
              return { display: "none" };
            }
            return { minHeight: 71 };
          })(route),
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons
              name="grid"
              size={24}
              color={color}
              focused={focused}
            />
          ),
        })}
      />
      <Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerStyle: { ...styles.header },
          headerTitleContainerStyle: styles.headerTitle,
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.createPostTab}>
              <AntDesign
                name="plus"
                size={24}
                color="#ffffff"
                focused="false"
              />
            </View>
          ),
          tabBarVisible: false,
          tabBarStyle: { display: "none" },
          headerLeftLabelVisible: false,
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
        name="Profile"
        component={ProfileScreen}
        initialParams={route.params}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} focused={focused} />
          ),
        }}
      />
    </Navigator>
  );
};

export default HomeScreen;
