import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./RegistrationScreen/RegistrationScreen";
import LoginScreen from "./LoginScreen/LoginScreen";

const Authorization = () => {
  const { Screen, Navigator } = createStackNavigator();

  return (
    <Navigator initialRouteName="Login">
      <Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default Authorization;
