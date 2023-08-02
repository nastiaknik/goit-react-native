import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

import Authorization from "./auth/Auth";
import HomeScreen from "./main/HomeScreen/HomeScreen";

const MainNavigation = () => {
  const { Screen, Navigator } = createStackNavigator();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <NavigationContainer>
      <Navigator>
        {!isLoggedIn ? (
          <Screen
            name="Authorization"
            component={Authorization}
            options={{ headerShown: false }}
          />
        ) : (
          <Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
