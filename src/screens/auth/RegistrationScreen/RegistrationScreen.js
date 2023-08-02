import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import { useDispatch } from "react-redux";
import { register } from "./../../../redux/auth/operations";
import { uploadPhoto } from "../../../firebase/firebaseAPI";
import ImagePickerComponent from "../../../components/ImagePicker/ImagePicker";
import { getResponsiveImage } from "../../../utils/getResponsiveImage";
import {
  validateEmail,
  validateLogin,
  validatePassword,
} from "../../../utils/validation";
import createStyles from "./RegistrationScreenStyles";

const RegistrationScreen = () => {
  const dispatch = useDispatch();
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

  const handleSubmit = async () => {
    if (
      validateLogin(login) &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      if (selectedImageUri) {
        const photoURI = await uploadPhoto(selectedImageUri, "avatars");
        dispatch(register({ email, password, login, photo: photoURI }));
        return;
      }
      dispatch(register({ email, password, login }));
      keyboardHide();
      setLogin("");
      setEmail("");
      setPassword("");
      setSelectedImageUri(null);
    }
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground style={styles.bgImage} source={bgImage}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
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
              <ImagePickerComponent
                selectedImageUri={selectedImageUri}
                setSelectedImageUri={setSelectedImageUri}
              />
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
