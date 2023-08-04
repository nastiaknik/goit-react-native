import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { updatePhoto } from "../../redux/auth/operations";
import { uploadPhoto } from "../../firebase/firebaseAPI";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./ImagePickerStyles";

const ImagePickerComponent = ({ selectedImageUri, setSelectedImageUri }) => {
  const { userId } = useSelector(selectUser);
  const dispatch = useDispatch();

  const selectImage = async () => {
    if (selectedImageUri) {
      setSelectedImageUri(null);
      dispatch(updatePhoto({ userId, photo: null }));
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
      const photoURI = await uploadPhoto(asset.uri, "avatars");
      dispatch(updatePhoto({ userId, photo: photoURI }));
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
