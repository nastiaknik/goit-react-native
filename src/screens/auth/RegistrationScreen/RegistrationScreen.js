import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { getResponsiveImage } from "../../../utils/getResponsiveImage";
import {
  validateEmail,
  validateLogin,
  validatePassword,
} from "../../../utils/validation";
import createStyles from "./RegistrationScreenStyles";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const bgImage = getResponsiveImage();
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    const handleOrientationChange = ({ window }) => {
      setScreenDimensions(window);
    };
    Dimensions.addEventListener("change", handleOrientationChange);
  }, []);

  const handleSubmit = () => {
    if (
      validateLogin(login) &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      keyboardHide();
      setLogin("");
      setEmail("");
      setPassword("");
      navigation.navigate("Home", {
        userData: { login, email, photo: selectedImageUri },
      });
    }
  };

  const keyboardHide = () => {
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
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setSelectedImageUri(asset.uri);
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
                  <Ionicons
                    name="close-circle-outline"
                    size={25}
                    color="#E8E8E8"
                  />
                ) : (
                  <Ionicons
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

            <TouchableOpacity activeOpacity={1} style={styles.loginText}>
              <Text>
                Вже є акаунт?{" "}
                <Text
                  style={styles.underlinedText}
                  onPress={() => navigation.navigate("Login")}
                >
                  Увійти
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
