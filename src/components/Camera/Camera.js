import { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import styles from "./CameraStyles";

const CameraComponent = ({
  photo,
  setPhoto,
  setCamera,
  takePhoto,
  removePhoto,
}) => {
  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

  useEffect(() => {
    if (!cameraPermission) {
      requestCameraPermission();
      return;
    }

    if (!cameraPermission?.granted) {
      Alert.alert(
        "Camera Access Required",
        "We need your permission to access your camera. Please enable camera access in your device settings to use this feature.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Open Settings",
            onPress: () => {
              if (Platform.OS === "ios") {
                try {
                  Linking.openURL("app-settings:");
                } catch (error) {
                  console.warn("Error opening app settings:", error);
                }
              } else if (Platform.OS === "android") {
                try {
                  Linking.openSettings();
                } catch (error) {
                  console.warn("Error opening app settings:", error);
                }
              }
            },
          },
        ]
      );
      return;
    }
  }, [cameraPermission]);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const selectImage = async () => {
    if (photo) {
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
      setPhoto(asset.uri);
      /* if (!location || !locationDescription) {
        await getCurrentLocation();
      } */
    }
  };

  return (
    <>
      <View style={styles.cameraWrapper}>
        <Camera style={styles.camera} type={type} ref={setCamera}>
          {photo ? (
            <ImageBackground style={styles.camera} source={{ uri: photo }}>
              <TouchableOpacity style={styles.cameraBtn} onPress={removePhoto}>
                <MaterialCommunityIcons
                  name="camera-off"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <>
              <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
                <MaterialCommunityIcons
                  name="camera"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addPhoto} onPress={selectImage}>
                <MaterialIcons name="photo-library" size={24} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.flipBtn}
                onPress={toggleCameraType}
              >
                <MaterialCommunityIcons
                  name="camera-flip"
                  size={24}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </>
          )}
        </Camera>
      </View>
      <Text style={styles.cameraText}>
        {photo ? "Редагувати фото" : "Завантажте фото"}
      </Text>
    </>
  );
};

export default CameraComponent;
