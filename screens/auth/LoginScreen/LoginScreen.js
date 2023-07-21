import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import createStyles from "./LoginScreenStyles";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const styles = createStyles(screenDimensions);

  const { width, height } = screenDimensions;

  useEffect(() => {
    const handleOrientationChange = ({ window }) => {
      setScreenDimensions(window);
    };

    Dimensions.addEventListener("change", handleOrientationChange);

    return () => {
      Dimensions.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsShowKeyboard(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShowKeyboard(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    if (validateEmail() && validatePassword()) {
      keyboardHide();
      console.log(`Email: ${email}, password: ${password} `);
      setEmail("");
      setPassword("");
      navigation.navigate("Home");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email.");
      return false;
    }
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password.");
      return false;
    }
    if (password.trim().length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters long.");
      return false;
    }
    return true;
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../../assets/images/background-image.jpg")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : null}
        >
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                ...styles.form,
                width,
                paddingBottom: !isShowKeyboard && height > width ? 144 : 32,
              }}
            >
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                style={[
                  styles.input,
                  isEmailFocused ? styles.inputFocused : null,
                ]}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={(email) => setEmail(email)}
                onFocus={() => {
                  setIsEmailFocused(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setIsEmailFocused(false);
                  setIsShowKeyboard(false);
                }}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    isPasswordFocused ? styles.inputFocused : null,
                  ]}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={isPasswordHidden}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  onFocus={() => {
                    setIsPasswordFocused(true);
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => {
                    setIsPasswordFocused(false);
                    setIsShowKeyboard(false);
                  }}
                />
                <TouchableOpacity
                  style={styles.showPasswordBtn}
                  onPress={() =>
                    setIsPasswordHidden((prevHidden) => !prevHidden)
                  }
                >
                  <Text style={styles.showPassword}>
                    {isPasswordHidden ? "Показати" : "Сховати"}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.btnText}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={1}>
                <Text style={styles.registerText}>
                  Немає акаунту?{" "}
                  <Text
                    style={styles.underlinedText}
                    onPress={() => navigation.navigate("Registration")}
                  >
                    Зареєструватися
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
