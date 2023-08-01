import { useState, useEffect } from "react";
const { format } = require("date-fns");
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors";
import {
  uploadDoc,
  getAllCollections,
} from "../../../firebase/firebaseAPI";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  FlatList,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./CommentsScreenStyles";

function formatDate(date) {
  const parsedDate = new Date(date);
  return format(parsedDate,   
"dd MMMM',' yyyy | HH:mm", {
    locale: require("date-fns/locale/uk"),
  });
}

const CommentsScreen = ({ route }) => {
  const { userId, photo, username } = useSelector(selectUser);
  const { post } = route?.params;
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = screenDimensions;

  useEffect(() => {
    (async () => {
      await getAllCollections(`posts/${post.id}/comments`, setComments);
    })();
  }, []);

  useEffect(() => {
    const handleOrientationChange = ({ window }) => {
      setScreenDimensions(window);
    };
    Dimensions.addEventListener("change", handleOrientationChange);
  }, []);

  const onSubmitComment = async () => {
    const newComment = {
      userId,
      avatar: photo,
      username: username || "Username",
      message,
      createdAt: new Date().toISOString(),
    };
      const updatedComments = [...comments, newComment];
  updatedComments.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  setComments(updatedComments);
    setMessage("");
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    await uploadDoc(`posts/${post.id}/comments`, newComment);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 77 : 0}
      style={{
        ...styles.container,
        paddingHorizontal: height > width ? 16 : 80,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[{ uri: post.photo }, ...comments]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <View
                style={{
                  paddingTop: 32,
                }}
              >
                <Image source={{ uri: post.photo }} style={styles.photo} />
              </View>
            );
          } else {
            return (
              <View
                style={{
                  ...styles.commentList,
                  flexDirection: item.userId !== userId ? "row-reverse" : "row",
                }}
              >
                <View
                  style={{
                    ...styles.commentCont,
                    marginRight: item.userId === userId ? 20 : 0,
                    marginLeft: item.userId !== userId ? 20 : 0,
                  }}
                >
                  <Text
                    style={{
                      ...styles.username,
                      textAlign: item.userId !== userId ? "left" : "right",
                    }}
                  >
                    {item.username}
                  </Text>
                  <Text style={styles.commentText}>{item.message}</Text>
                  <Text
                    style={{
                      ...styles.date,
                      textAlign: item.userId !== userId ? "left" : "right",
                    }}
                  >
                    {formatDate(new Date(item.createdAt || new Date()))}
                  </Text>
                </View>
                <View style={styles.avatar}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                </View>
              </View>
            );
          }
        }}
      />

      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          value={message}
          placeholder="Коментувати..."
          onChangeText={setMessage}
          onFocus={() => setIsShowKeyboard(true)}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={onSubmitComment}>
          <AntDesign name="arrowup" size={14} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;
