import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import {
  FontAwesome,
  AntDesign,
  SimpleLineIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { getResponsiveImage } from "../../../utils/getResponsiveImage";
import createStyles from "./ProfileScreenStyles";
import ImagePickerComponent from "../../../components/ImagePicker/ImagePicker";

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const bgImage = getResponsiveImage();
  const [posts, setPosts] = useState([]);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [username, setUsername] = useState("Username");
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const styles = createStyles(screenDimensions);

  useEffect(() => {
    const { post, userData } = route.params;
    post && setPosts((prevState) => [...prevState, post]);
    userData?.login && setUsername(userData.login);
    userData?.photo && setSelectedImageUri(userData.photo);
  }, [route.params]);

  useEffect(() => {
    const handleOrientationChange = ({ window: { width, height } }) => {
      setScreenDimensions({ width, height });
    };

    Dimensions.addEventListener("change", handleOrientationChange);
  }, []);

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleLocationDescr = (location) => {
    return location.length > 31 ? `${location.slice(0, 30)}...` : location;
  };

  return (
    <ImageBackground style={styles.bgImage} source={bgImage}>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.form}
          data={[{ key: "user_info" }, ...posts]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            if (item.key === "user_info") {
              return (
                <>
                  <View style={styles.avatarWrapper}>
                    <View style={styles.avatar}>
                      {selectedImageUri && (
                        <Image
                          source={{ uri: selectedImageUri }}
                          style={styles.image}
                        />
                      )}
                      <ImagePickerComponent
                        selectedImageUri={selectedImageUri}
                        setSelectedImageUri={setSelectedImageUri}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.logoutBtn}
                      onPress={handleLogout}
                    >
                      <MaterialIcons
                        name="logout"
                        size={24}
                        color="rgba(189, 189, 189, 1)"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.username}>{username}</Text>
                </>
              );
            } else {
              return (
                <View
                  style={
                    index === posts.length
                      ? { ...styles.post, ...styles.lastPost }
                      : styles.post
                  }
                >
                  <Image style={styles.photo} source={{ uri: item?.photo }} />
                  <Text style={styles.postTitle}>{item?.title}</Text>
                  <View style={styles.infoWrapper}>
                    <View style={styles.interactions}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() =>
                          navigation.navigate("Comments", { post: item })
                        }
                      >
                        <FontAwesome name="comment" size={18} color="#FF6C00" />
                        <Text style={styles.postComments}>0</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btn}>
                        <AntDesign name="like2" size={18} color="#FF6C00" />
                        <Text style={styles.postComments}>0</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() =>
                        navigation.navigate("Map", {
                          location: item.location,
                        })
                      }
                    >
                      <SimpleLineIcons
                        name="location-pin"
                        size={18}
                        color="#BDBDBD"
                      />
                      <Text style={styles.postLocation}>
                        {handleLocationDescr(item?.locationDescription)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
