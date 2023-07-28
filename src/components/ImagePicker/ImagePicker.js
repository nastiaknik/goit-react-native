import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./ImagePickerStyles";

const ImagePickerComponent = ({ selectedImageUri, setSelectedImageUri }) => {
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
    <TouchableOpacity style={styles.icon} onPress={selectImage}>
      {selectedImageUri ? (
        <Ionicons name="close-circle-outline" size={25} color="#E8E8E8" />
      ) : (
        <Ionicons name="add-circle-outline" size={25} color="#FF6C00" />
      )}
    </TouchableOpacity>
  );
};

export default ImagePickerComponent;
