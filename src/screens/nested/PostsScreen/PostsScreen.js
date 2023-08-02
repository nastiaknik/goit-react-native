import { useState, useEffect, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors";
import { getAllCollections, getDocsCount } from "../../../firebase/firebaseAPI";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import styles from "./PostsScreenStyles";

const PostsScreen = () => {
  const navigation = useNavigation();
  const { email, username, photo } = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});
  const [currentPostId, setCurrentPostId] = useState(null);
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = screenDimensions;

  useFocusEffect(
    useCallback(() => {
      if (currentPostId) {
        getCommentsCount(currentPostId);
      }
    }, [currentPostId])
  );

  useEffect(() => {
    (async () => {
      await getAllCollections("posts", setPosts);
    })();
  }, []);

  const getCommentsCount = async (postId) => {
    try {
      const commentsCount = await getDocsCount(`posts/${postId}/comments`);
      setCommentsCount((prev) => ({
        ...prev,
        [postId]: commentsCount,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    const fetchCommentsCounts = async () => {
      try {
        const fetchCommentsCount = posts.map((post) =>
          getCommentsCount(post.id)
        );
        await Promise.all(fetchCommentsCount);
      } catch (error) {
        console.error("Error fetching comments counts:", error);
      }
    };

    fetchCommentsCounts();
  }, [posts]);

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
                    {photo && (
                      <Image
                        source={{ uri: photo }}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      />
                    )}
                  </View>
                  <View>
                    <Text style={styles.username}>
                      {username || "Username"}
                    </Text>
                    <Text style={styles.email}>
                      {email || "email@example.com"}
                    </Text>
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
                    onPress={() => {
                      setCurrentPostId(item.id);
                      navigation.navigate("Comments", { post: item });
                    }}
                  >
                    <FontAwesome name="comment-o" size={18} color="#BDBDBD" />
                    <Text style={styles.postComments}>
                      {commentsCount[item.id] || 0}
                    </Text>
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
