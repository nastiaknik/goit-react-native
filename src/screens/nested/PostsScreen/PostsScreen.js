import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import styles from "./PostsScreenStyles";

const PostsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({
    username: "Username",
    email: "email@example.com",
    photo: null,
  });
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = screenDimensions;

  useEffect(() => {
    const handleOrientationChange = ({ window: { width, height } }) => {
      setScreenDimensions({ width, height });
    };

    Dimensions.addEventListener("change", handleOrientationChange);
  }, []);

  const handleLocationDescr = (location) => {
    return location.length > 30 ? `${location.slice(0, 29)}...` : location;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      style={{
        ...styles.container,
        paddingHorizontal: height > width ? 16 : 80,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[{ key: "user_info" }, ...posts]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    {userData?.photo && (
                      <Image
                        source={{ uri: userData.photo }}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      />
                    )}
                  </View>
                  <View>
                    <Text style={styles.username}>{userData.username}</Text>
                    <Text style={styles.email}>{userData.email}</Text>
                  </View>
                </View>
              </>
            );
          } else {
            return (
              <View style={styles.post}>
                <Image
                  style={{ width: "100%", height: 240, borderRadius: 8 }}
                  source={{ uri: item.photo }}
                />
                <Text style={styles.postTitle}>{item.title}</Text>
                <View style={styles.infoWrapper}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                      navigation.navigate("Comments", { post: item })
                    }
                  >
                    <FontAwesome name="comment-o" size={24} color="#BDBDBD" />
                    <Text style={styles.postComments}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                      navigation.navigate("Map", { location: item.location })
                    }
                  >
                    <SimpleLineIcons
                      name="location-pin"
                      size={18}
                      color="#BDBDBD"
                    />
                    <Text style={styles.postLocation}>
                      {handleLocationDescr(item.locationDescription)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default PostsScreen;
