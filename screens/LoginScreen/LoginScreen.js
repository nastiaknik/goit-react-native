import { useState } from "react";
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
} from "react-native";
import styles from "./LoginScreenStyles";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const onEmailChange = (email) => {
    setEmail(email);
  };
  const onPasswordChange = (password) => {
    setPassword(password);
  };
  const handleSubmit = () => {
    keyboardHide();
    setEmail("");
    setPassword("");
    console.log(email, password);
  };
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/images/background-image.jpg")}
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
                width: Dimensions.get("window").width,
                paddingBottom: isShowKeyboard ? 32 : 144,
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
                onChangeText={onEmailChange}
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
                  onChangeText={onPasswordChange}
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

              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}} activeOpacity={0.9}>
                <Text style={styles.registerText}>
                  Немає акаунту?{" "}
                  <Text style={styles.underlinedText}>Зареєструватися</Text>
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
