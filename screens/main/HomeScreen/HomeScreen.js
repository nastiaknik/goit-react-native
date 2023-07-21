import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";

import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./HomeScreenStyles";

const HomeScreen = () => {
  const { Navigator, Screen } = createBottomTabNavigator();
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleGoBack = () => {
    navigation.navigate("Posts");
  };

  return (
    <Navigator>
      <Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerStyle: styles.header,
          headerTitleContainerStyle: styles.headerTitle,
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons
              name="grid"
              size={24}
              color={color}
              focused={focused}
            />
          ),
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FF6C00",
          headerRight: () => (
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <MaterialIcons
                name="logout"
                size={24}
                color="rgba(189, 189, 189, 1)"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerStyle: styles.header,
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
          tabBarShowLabel: false,
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
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} focused={focused} />
          ),
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FF6C00",
        }}
      />
    </Navigator>
  );
};

export default HomeScreen;
