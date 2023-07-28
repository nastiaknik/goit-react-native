import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { getResponsiveImage } from "../../../utils/getResponsiveImage";
import { validateEmail, validatePassword } from "../../../utils/validation";
import createStyles from "./LoginScreenStyles";

const LoginScreen = () => {
  const navigation = useNavigation();
  const bgImage = getResponsiveImage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = screenDimensions;
  const styles = createStyles(screenDimensions);

  useEffect(() => {
    const handleOrientationChange = ({ window }) => {
      setScreenDimensions(window);
    };
    Dimensions.addEventListener("change", handleOrientationChange);
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
    if (validateEmail(email) && validatePassword(password)) {
      keyboardHide();
      setEmail("");
      setPassword("");
      navigation.navigate("Home", { userData: { email } });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground style={styles.bgImage} source={bgImage}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              ...styles.form,
              width,
              paddingBottom: !isShowKeyboard && height > width ? 144 : 44,
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
              keyboardType="email-address"
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
                onPress={() => setIsPasswordHidden((prevHidden) => !prevHidden)}
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

            <TouchableOpacity activeOpacity={1} style={styles.registerText}>
              <Text>
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
        </KeyboardAwareScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
