import { useState } from "react";
import AddIcon from "react-native-vector-icons/Ionicons";
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
import styles from "./RegistrationScreenStyles";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const onLoginChange = (login) => {
    setLogin(login);
  };
  const onEmailChange = (email) => {
    setEmail(email);
  };
  const onPasswordChange = (password) => {
    setPassword(password);
  };
  const handleSubmit = () => {
    keyboardHide();
    console.log(login, email, password);
  };
  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/images/background-image.jpg")}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                ...styles.form,
                width: Dimensions.get("window").width,
                paddingBottom: /* isShowKeyboard ? 5 : */ 45,
              }}
            >
              <View style={styles.avatar}>
                <TouchableOpacity style={styles.icon}>
                  <AddIcon
                    name="add-circle-outline"
                    size={25}
                    color="#FF6C00"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={[
                  styles.input,
                  isLoginFocused ? styles.inputFocused : null,
                ]}
                placeholder="Логін"
                placeholderTextColor="#BDBDBD"
                value={login}
                onChangeText={onLoginChange}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setIsLoginFocused(true);
                }}
                onBlur={() => {
                  setIsShowKeyboard(false);
                  setIsLoginFocused(false);
                }}
              />
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
                  setIsShowKeyboard(true);
                  setIsEmailFocused(true);
                }}
                onBlur={() => {
                  setIsShowKeyboard(false);
                  setIsEmailFocused(false);
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
                    setIsShowKeyboard(true);
                    setIsPasswordFocused(true);
                  }}
                  onBlur={() => {
                    setIsShowKeyboard(false);
                    setIsPasswordFocused(false);
                  }}
                />
                <TouchableOpacity
                  style={styles.showPasswordBtn}
                  onPress={() => {
                    setIsPasswordHidden((prevHidden) => !prevHidden);
                  }}
                >
                  <Text style={styles.showPassword}>
                    {isPasswordHidden ? "Показати" : "Сховати"}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Зареєструватися</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}} activeOpacity={0.9}>
                <Text style={styles.loginText}>
                  Вже є акаунт?{" "}
                  <Text style={styles.underlinedText}>Увійти</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
