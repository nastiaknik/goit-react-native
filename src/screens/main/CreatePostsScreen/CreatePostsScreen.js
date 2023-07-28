import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Keyboard,
  Alert,
  Linking,
} from "react-native";
import {
  Feather,
  SimpleLineIcons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Constants from "expo-constants";
const { GOOGLE_MAPS_API_KEY } = Constants.manifest.extra;
import styles from "./CreatePostsScreenStyles";

const CreatePostsScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [locationPermission, setLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const post = {
    photo,
    title,
    location,
    locationDescription,
    createdAt: new Date().toISOString(),
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentLocation();
    };
    fetchData();
  }, []);

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

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          setLocationPermission(true);
          getCurrentLocation();
        } else {
          setLocationPermission(false);
          Alert.alert(
            "Location Access Required",
            "To use map feature, we need access to your location. Please grant location access in the app settings.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Open Settings",
                onPress: () => {
                  if (Platform.OS === "android") {
                    try {
                      Linking.openSettings();
                    } catch (error) {
                      Alert.alert("Error opening app settings:", error);
                    }
                  } else if (Platform.OS === "ios") {
                    try {
                      Linking.openURL("app-settings:");
                    } catch (error) {
                      console.warn("Error opening app settings:", error);
                    }
                  }
                },
              },
            ]
          );
        }
      } catch (error) {
        console.warn("Error while requesting location permission:", error);
      }
    };
    requestLocationPermission();
  }, [locationPermission]);

  const getCurrentLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      const { city, country } = await getLocationDescription(coords);
      setLocationDescription(`${city}, ${country}`);
    } catch (error) {
      return Alert.alert(
        "Location Access Required",
        "We need your permission to access your location. Please enable location services in your device settings to use the map feature."
      );
    }
  };

  const getLocationDescription = async ({ latitude, longitude }) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await axios.get(apiUrl);
      if (response.data.results.length > 0) {
        const address = response.data.results[0].address_components;
        let city = "";
        let country = "";
        address.forEach((component) => {
          if (
            component.types.some((type) =>
              [
                "locality",
                "administrative_area_level_3",
                "postal_town",
              ].includes(type)
            )
          ) {
            city = component.long_name;
          }
          if (component.types.includes("country")) {
            country = component.long_name;
          }
        });
        return { city, country };
      } else {
        return;
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      return;
    }
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);

    if (!location || !locationDescription) {
      await getCurrentLocation();
    }
  };

  const removePhoto = async () => {
    setPhoto(null);
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
      if (!location || !locationDescription) {
        await getCurrentLocation();
      }
    }
  };

  const handlePublish = () => {
    Keyboard.dismiss();
    handleClear();
    navigation.navigate("Posts", { post });
  };

  const handleClear = () => {
    setPhoto(null);
    setTitle("");
    setLocationDescription("");
    setLocation(null);
  };

  const handleLocationDescr = (location) => {
    return location.length > 39 ? `${location.slice(0, 38)}...` : location;
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <View>
        <View style={styles.cameraWrapper}>
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
            <Camera style={styles.camera} ref={setCamera} type={type}>
              <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
                <MaterialCommunityIcons
                  name="camera"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addPhoto} onPress={selectImage}>
                <MaterialIcons name="photo-library" size={24} color="white" />
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
            </Camera>
          )}
        </View>

        <Text style={styles.cameraText}>
          {photo ? "Редагувати фото" : "Завантажте фото"}
        </Text>

        <TextInput
          value={title}
          style={styles.title}
          placeholder="Назва..."
          placeholderTextColor="#BDBDBD"
          onChangeText={setTitle}
        />

        <View style={styles.locationWrapper}>
          <SimpleLineIcons name="location-pin" size={18} color="#E8E8E8" />
          <GooglePlacesAutocomplete
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            textInputProps={{
              value: locationDescription,
              onChangeText: (text) => setLocationDescription(text),
            }}
            onPress={(data, details = null) => {
              setLocationDescription(data.description);
              setLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: ["uk", "en"],
            }}
            fetchDetails={true}
            listViewDisplayed="auto"
            listUnderlayColor="transparent"
            renderDescription={(rowData) =>
              handleLocationDescr(rowData.description)
            }
            styles={{
              textInput: styles.location,
              listView: styles.list,
              row: {
                padding: 10,
                height: 44,
              },
              separator: {
                backgroundColor: "#E8E8E8",
              },
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            ...styles.publishBtn,
            backgroundColor: photo && title ? "#FF6C00" : "#F6F6F6",
          }}
          activeOpacity={0.7}
          onPress={handlePublish}
          disabled={!photo || !title ? true : false}
        >
          <Text
            style={{
              ...styles.publishText,
              color: photo && title ? "#ffffff" : "#BDBDBD",
            }}
          >
            Опублікувати
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btn}>
        <TouchableOpacity style={styles.deleteBtn} onPress={handleClear}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreatePostsScreen;
