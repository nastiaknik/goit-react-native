import { useEffect, useState } from "react";
import AddIcon from "react-native-vector-icons/Ionicons";
import CancelIcon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import createStyles from "./RegistrationScreenStyles";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = screenDimensions;
  const styles = createStyles(screenDimensions);

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

  useEffect(() => {
    const handleOrientationChange = ({ window }) => {
      setScreenDimensions(window);
    };

    Dimensions.addEventListener("change", handleOrientationChange);

    return () => {
      Dimensions.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  const handleSubmit = () => {
    if (validateLogin() && validateEmail() && validatePassword()) {
      Alert.alert("Success", "Registered successfully.");
      keyboardHide();
      console.log(`login: ${login}, email: ${email}, password: ${password} `);
      setLogin("");
      setEmail("");
      setPassword("");
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const selectImage = async () => {
    if (selectedImageUri) {
      setSelectedImageUri(null);
      return;
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImageUri(`data:image/jpeg;base64,${result.base64}`);
    }
  };

  const validateLogin = () => {
    if (!login.trim()) {
      Alert.alert("Error", "Please enter your login.");
      return false;
    }
    return true;
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
                width,
                paddingBottom: height > width ? 45 : 15,
              }}
            >
              <View style={styles.avatar}>
                {selectedImageUri && (
                  <Image
                    source={{ uri: selectedImageUri }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 16,
                      overflow: "hidden",
                    }}
                  />
                )}
                <TouchableOpacity style={styles.icon} onPress={selectImage}>
                  {selectedImageUri ? (
                    <CancelIcon
                      name="close-circle-outline"
                      size={25}
                      color="#E8E8E8"
                    />
                  ) : (
                    <AddIcon
                      name="add-circle-outline"
                      size={25}
                      color="#FF6C00"
                    />
                  )}
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
                onChangeText={(login) => setLogin(login)}
                onFocus={() => setIsLoginFocused(true)}
                onBlur={() => setIsLoginFocused(false)}
              />
              <TextInput
                style={[
                  styles.input,
                  isEmailFocused ? styles.inputFocused : null,
                ]}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={(email) => setEmail(email)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
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
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
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

              <TouchableOpacity
                style={styles.btn}
                onPress={handleSubmit}
                activeOpacity={0.9}
              >
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
