import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CameraComponent from "../../../components/Camera/Camera";
import LocationComponent from "../../../components/Location/Location";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors";
import { uploadDoc } from "../../../firebase/firebaseAPI";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./CreatePostsScreenStyles";

const CreatePostsScreen = () => {
  const { userId } = useSelector(selectUser);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(null);
  const [locationDescription, setLocationDescription] = useState("");
  const [camera, setCamera] = useState(null);
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = screenDimensions;
  const navigation = useNavigation();
  const post = {
    photo,
    title,
    location,
    locationDescription,
    userId,
    createdAt: new Date().toISOString(),
  };

  useEffect(() => {
    const handleOrientationChange = ({ window }) => {
      setScreenDimensions(window);
    };
    Dimensions.addEventListener("change", handleOrientationChange);
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);

    /* if (!location || !locationDescription) {
      await getCurrentLocation();
    } */
  };

  const removePhoto = async () => {
    setPhoto(null);
  };

  const handlePublish = async () => {
    Keyboard.dismiss();
    handleClear();
    await uploadDoc("posts", { ...post, userId });
    navigation.navigate("Posts");
  };

  const handleClear = () => {
    setPhoto(null);
    setTitle("");
    setLocationDescription("");
    setLocation(null);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        ...styles.container,
        flex: height > width ? 1 : 0,
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <View
        style={{
          paddingHorizontal: height > width ? 16 : 80,
        }}
      >
        <CameraComponent
          photo={photo}
          setCamera={setCamera}
          takePhoto={takePhoto}
          removePhoto={removePhoto}
          setPhoto={setPhoto}
        />

        <TextInput
          value={title}
          style={styles.title}
          placeholder="Назва..."
          placeholderTextColor="#BDBDBD"
          onChangeText={setTitle}
        />

        <LocationComponent
          setLocation={setLocation}
          locationDescription={locationDescription}
          setLocationDescription={setLocationDescription}
        />

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
