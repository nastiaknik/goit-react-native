import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AddIcon from "react-native-vector-icons/Ionicons";
import CancelIcon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import Logout from "@expo/vector-icons/MaterialIcons";
import createStyles from "./ProfileScreenStyles";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const { width } = screenDimensions;

  useEffect(() => {
    const handleOrientationChange = ({ window: { width, height } }) => {
      setScreenDimensions({ width, height });
    };

    Dimensions.addEventListener("change", handleOrientationChange);

    return () => {
      Dimensions.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  const styles = createStyles(screenDimensions);

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

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../../../assets/images/background-image.jpg")}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <View
          style={{
            ...styles.form,
            width,
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
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

            <TouchableOpacity
              style={{
                position: "absolute",
                top: 22,
                right: 16,
              }}
              onPress={handleLogout}
            >
              <Logout name="logout" size={24} color="rgba(189, 189, 189, 1)" />
            </TouchableOpacity>
          </View>

          <Text style={styles.username}>Username</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileScreen;
