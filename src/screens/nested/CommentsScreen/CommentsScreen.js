import { useState, useEffect } from "react";
const { format } = require("date-fns");
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
  return format(date, "dd MMMM',' yyyy | HH:mm", {
    locale: require("date-fns/locale/uk"),
  });
}

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [comments, setComments] = useState([
    {
      username: "duckness",
      comment: "nice",
      createdAt: new Date("2023-07-25T12:34:56"),
    },
    {
      username: "nugget",
      comment: "<3",
      createdAt: new Date("2023-07-25T15:12:34"),
    },
    {
      username: "qwerty",
      comment: "😍",
      createdAt: new Date(),
    },
  ]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { photo } = route?.params?.post;
  const username = "nugget";
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = screenDimensions;

  useEffect(() => {
    const handleOrientationChange = ({ window }) => {
      setScreenDimensions(window);
    };
    Dimensions.addEventListener("change", handleOrientationChange);
  }, []);

  const onSubmitComment = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setComments([...comments, { username, comment, createdAt }]);
    setComment("");
    setCreatedAt(new Date());
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
        data={[{ uri: photo }, ...comments]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <View
                style={{
                  paddingTop: 32,
                }}
              >
                <Image source={{ uri: photo }} style={styles.photo} />
              </View>
            );
          } else {
            return (
              <View
                style={{
                  ...styles.commentList,
                  flexDirection:
                    item.username !== username ? "row-reverse" : "row",
                }}
              >
                <View
                  style={{
                    ...styles.commentCont,
                    marginRight: item.username === username ? 20 : 0,
                    marginLeft: item.username !== username ? 20 : 0,
                  }}
                >
                  <Text
                    style={{
                      ...username,
                      textAlign: item.username !== username ? "left" : "right",
                    }}
                  >
                    {item.username}
                  </Text>
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <Text
                    style={{
                      ...styles.date,
                      textAlign: item.username !== username ? "left" : "right",
                    }}
                  >
                    {formatDate(new Date(item.createdAt || new Date()))}
                  </Text>
                </View>
                <View style={styles.avatar} />
              </View>
            );
          }
        }}
      />

      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          value={comment}
          placeholder="Коментувати..."
          onChangeText={setComment}
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
